import Block from '../../utils/Block.ts';
import { IItemUserProps } from '../item-user/item-user.ts';
import { navigate } from '../../utils/navigate.ts';

export interface IMenuProps {
  users: IItemUserProps[];
  onProfile: (event: KeyboardEvent | MouseEvent) => void;
}

export class Menu extends Block<IMenuProps> {
  static name = 'Menu';

  constructor(props: IMenuProps) {
    super({
      ...props,
      onProfile: (event) => {
        event.preventDefault();
        navigate('profile');
      },
    });
  }

  protected render(): string {
    return `
      <div class="menu">
        {{{Button label="Профиль" type="link-menu" page="profile" onClick=onProfile}}}
        {{{SearchField label="Поиск"}}}
        {{{ListUsers users=users}}}
      </div>
    `;
  }
}
