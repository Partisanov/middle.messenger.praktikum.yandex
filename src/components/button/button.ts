import Block from '../../utils/Block.ts';

interface IButtonProps {
  type: string;
  page?: string;
  label?: string;
  onClick: () => void;
  events?: { [key: string]: () => void };
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render(): string {
    const { type, label, page } = this.props;
    return `<button class="button button__${type}" ${page ? `page="${page}"` : ''}">
              ${label ? label : ''}
            </button>`;
  }
}
