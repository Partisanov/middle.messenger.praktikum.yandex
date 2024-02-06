import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus.ts';

export type RefType = {
  [key: string]: Element | Block<object>;
};

export interface BlockClass<P extends object, R extends RefType> {
  componentName?: string;

  new (props: P): Block<P, R>;
}

export interface BlockConstructable<Props extends object, R extends RefType> {
  EVENTS: typeof Block.EVENTS;

  new (props: Props): Block<Props, R>;
}

type CompileChildren<P extends object, R extends RefType> = {
  component: BlockConstructable<P, R>;
  embed: (fragment: DocumentFragment) => void;
};

type IContextExtra<P extends object, R extends RefType> = {
  __refs: RefType;
  __children?: CompileChildren<P, R>[];
};

type EventTypes<P> = {
  [Block.EVENTS.INIT]: [void];
  [Block.EVENTS.FLOW_CDM]: [void];
  [Block.EVENTS.FLOW_CDU]: [P, P];
  [Block.EVENTS.FLOW_CWU]: [void];
  [Block.EVENTS.FLOW_RENDER]: [void];
};

class Block<Props extends object, Refs extends RefType = RefType> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  protected props: Props;
  protected refs: Refs = {} as Refs;
  private children: Block<object>[] = [];
  private eventBus: () => EventBus;

  constructor(props: Props = {} as Props) {
    const eventBus = new EventBus();

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _element: HTMLElement | null = null;

  get element() {
    return this._element;
  }

  _addEvents(): void {
    const { events = {} } = this.props as Props & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(): void {
    const { events = {} } = this.props as Props & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus<EventTypes<Props>>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _componentWillUnmount() {
    this._removeEvents();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getContent() {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as keyof Props];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };

        target[prop as keyof Props] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'flex';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  protected init() {}

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps || newProps) {
      return true;
    }
    return true;
  }

  protected render(): string {
    return '';
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: string, context: Props) {
    const contextAndStubs: IContextExtra<Props, RefType> = { ...context, __refs: this.refs };

    /* код не нужен так как используется функция registr component
    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });
*/
    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    // Object.values(this.children).forEach((child) => {
    //   const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
    //   stub?.replaceWith(child.getContent()!);
    // });

    return temp.content;
  }
}

export default Block;
