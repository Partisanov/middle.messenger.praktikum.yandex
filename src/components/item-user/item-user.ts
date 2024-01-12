import Block from '../../utils/Block.ts';

export interface IItemUserProps {
  active: boolean;
  avatar?: string;
  name: string;
  message: string;
  date: string;
  newMessage?: string;
}

export class ItemUser extends Block<IItemUserProps> {
  constructor(props: IItemUserProps) {
    super(props);
  }

  protected render(): string {
    const { active, avatar, name, message, date, newMessage } = this.props;
    return `
      <li class="user-item ${active ? 'active' : ''}">
      <div class="user-item__wrap">
        {{{Avatar img='${avatar}' size=47}}}
        <div class="user-item__content">
      {{{UserName name="${name}" }}}
      <p class="user-item__text">${message}</p>
    </div>
    <div class="user-item__info">
      <span class="user-item__date">${date}</span>
      {{#if newMessage}}
      <div class="user-item__new-message">${newMessage}</div>
      {{/if}}
    </div>
  </div>
</li>
    `;
  }
}
