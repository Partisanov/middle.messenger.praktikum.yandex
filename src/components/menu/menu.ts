import Block from '../../utils/Block.ts';
import router from '../../Router/Router.ts';
import { TChat, TMessage } from '../../type.ts';
import { connect } from './../../utils/connect.ts';

export interface IMenuProps {
  chats: TChat[];
  messages: TMessage[];
  onProfile: (event: KeyboardEvent | MouseEvent) => void;
  openCreateChatDialog: () => void;
  onSelectChat: (id: number) => void;
}

export class Menu extends Block<IMenuProps> {
  static name = 'Menu';

  constructor(props: IMenuProps) {
    super({
      ...props,
      onProfile: (event) => {
        event.preventDefault();
        router.go('/settings');
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
        {{{ListUsers chats=chats onSelectChat=onSelectChat}}}
      </div>
    `;
  }
}

export const withStoreMenu = connect((state) => ({ chats: state.chats, messages: state.messages }))(Menu);
