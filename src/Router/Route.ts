import Block, { RefType } from '../utils/Block.ts';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

interface BlockConstructable<Props extends object, R extends RefType> {
  new (props: Props): Block<Props, R>;
}

export function render<P extends object, R extends RefType>(query: string, block: Block<P, R>) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`по селектору ${query} root не найден`);
  }

  root.append(block.getContent()!);

  return root;
}

export class Route {
  private _pathname: string;
  private readonly _blockClass: BlockConstructable<object, RefType>;
  private _block: Block<object, RefType> | null;
  private _props: any;

  constructor(pathname: string, view: typeof Block, props: object) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
