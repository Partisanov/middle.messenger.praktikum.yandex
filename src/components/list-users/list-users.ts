import Block from '../../utils/Block.ts';
import { IItemUserProps } from '../item-user/item-user.ts';

export interface IListUsersProps {
  users: IItemUserProps[];
}

export class ListUsers extends Block<IListUsersProps> {
  static name = 'ListUsers';

  protected render(): string {
    return `
      <div>
        <ul>
          {{#each users}}
            {{{ ItemUser 
              name=this.name
              avatar=this.avatar 
              active=this.active
              message=this.message
              date=this.date
              newMessage=this.newMessage
             }}}
          {{/each}}
        </ul>
      </div>
    `;
  }
}
