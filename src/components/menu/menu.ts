import Block from '../../utils/Block.ts';
import router from '../../Router/Router.ts';
import { TChat } from '../../type.ts';

export interface IMenuProps {
  chats: TChat[];
  onProfile: (event: KeyboardEvent | MouseEvent) => void;
  openCreateChatDialog: () => void;
}

export class Menu extends Block<IMenuProps> {
  static name = 'Menu';

  constructor(props: IMenuProps) {
    super({
      ...props,
      onProfile: (event) => {
        event.preventDefault();
        router.go('/profile');
      },
    });
  }

  protected render(): string {
    return `
      <div class="menu">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 10px 0 20px">
        {{{Button type="add-chat" onClick=openCreateChatDialog}}}
        {{{Button label="Профиль" type="link-menu" page="profile" onClick=onProfile}}}
      </div>
        {{{SearchField label="Поиск"}}}
        {{{ListUsers chats=chats}}}
      </div>
    `;
  }
}
