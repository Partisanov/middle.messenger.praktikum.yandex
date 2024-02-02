import Block from '../../utils/Block.ts';
import { TChat } from '../../type.ts';

export interface IListUsersProps {
  chats: TChat[];
}

export class ListUsers extends Block<IListUsersProps> {
  static name = 'ListUsers';

  protected render(): string {
    return `
      <div>
        <ul>
          {{#each chats}}
            {{{ ItemUser
              title=this.title
              avatar=this.avatar
              active=this.active
              last_message=this.last_message
              date=this.date
              unread_count=this.unread_count
             }}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}
