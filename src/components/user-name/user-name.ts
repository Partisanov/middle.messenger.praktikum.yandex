import Block from '../../utils/Block.ts';

interface IUserNameProps {
  name: string;
}

export class UserName extends Block<IUserNameProps> {
  constructor(props: IUserNameProps) {
    super(props);
  }

  protected render(): string {
    const { name } = this.props;
    return `<h3 class="user-name">${name}</h3>`;
  }
}
