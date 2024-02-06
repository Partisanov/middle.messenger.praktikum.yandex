import Block from '../../utils/Block.ts';
import { TChat } from '../../type.ts';

export interface IListUsersProps {
  chats: TChat[];
  onSelectChat: (id: number) => void;
}

export class ListUsers extends Block<IListUsersProps> {
  static name = 'ListUsers';

  protected render(): string {
    return `
      <div>
        <ul>
          {{#each chats}}
            {{{ ItemUser
              id=this.id
              user_id=this.last_message.id
              title=this.title
              avatar=this.avatar
              active=this.active
              last_message=this.last_message.content
              date=this.last_message.time
              unread_count=this.unread_count
              onSelectChat=../onSelectChat
             }}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}
