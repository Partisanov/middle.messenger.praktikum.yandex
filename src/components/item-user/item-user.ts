import Block from '../../utils/Block.ts';
import { connect } from '../../utils/connect.ts';
import { formatDateTime } from '../../helpers/dataFormater.ts';

interface Props {
  id: number;
  idActiveChat: number;
  avatar?: string;
  title: string;
  last_message: string;
  date: string;
  unread_count?: string;
  user_id: number;
  onSelectChat: (id: number, title: string) => void;
  events?: {
    click?: (event: MouseEvent) => void;
  };
}

export class ItemUser extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => props.onSelectChat(props.id, props.title),
      },
    });
  }

  protected render(): string {
    const myId = window.store.getState().user?.id;
    const { idActiveChat, id, avatar, title, last_message, date, unread_count, user_id } = this.props;
    return `
      <li class="user-item ${id === idActiveChat ? 'active' : ''}">
      <div class="user-item__wrap">
        {{{Avatar img='${avatar ? avatar : ''}' size=47}}}
        <div class="user-item__content">
      {{{UserName name="${title}" }}}
      <p class="user-item__text">${user_id === myId ? 'Вы: ' : ''}${last_message ? last_message : ''}</p>
    </div>
    <div class="user-item__info">
      <span class="user-item__date">${date ? formatDateTime(date) : ''}</span>
      {{#if unread_count}}
      <div class="user-item__new-message">${unread_count}</div>
      {{/if}}
    </div>
  </div>
</li>
    `;
  }
}

export const withStoreItemUser = connect((state) => ({ idActiveChat: state.idActiveChat }))(ItemUser);
