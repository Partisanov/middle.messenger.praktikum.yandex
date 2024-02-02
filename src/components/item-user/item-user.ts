import Block from '../../utils/Block.ts';

interface Props {
  active: boolean;
  avatar?: string;
  title: string;
  last_message: string;
  date: string;
  unread_count?: string;
}

export class ItemUser extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    const { active, avatar, title, last_message, date, unread_count } = this.props;
    return `
      <li class="user-item ${active ? 'active' : ''}">
      <div class="user-item__wrap">
        {{{Avatar img='${avatar ? avatar : ''}' size=47}}}
        <div class="user-item__content">
      {{{UserName name="${title}" }}}
      <p class="user-item__text">${last_message ? last_message : ''}</p>
    </div>
    <div class="user-item__info">
      <span class="user-item__date">${date ? date : ''}</span>
      {{#if unread_count}}
      <div class="user-item__new-message">${unread_count}</div>
      {{/if}}
    </div>
  </div>
</li>
    `;
  }
}
