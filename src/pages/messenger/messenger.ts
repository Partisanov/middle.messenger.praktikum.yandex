import Block from '../../utils/Block.ts';
import { IItemUserProps } from '../../components/item-user/item-user.ts';
import { IMessagesItemProps } from '../../components/messages-list/messages-list.ts';
import { users } from '../../mock_data/users.ts';
import { messagesData } from '../../mock_data/messagesData.ts';

interface IMessengerPageProps {
  users: IItemUserProps[];
  messagesData: IMessagesItemProps[];
}

export class MessengerPage extends Block<IMessengerPageProps> {
  constructor() {
    super({
      users,
      messagesData,
    });
  }

  protected render(): string {
    return `
      <div class="container">
        {{{Menu users=users}}}
        {{{Chat messagesData=messagesData}}}
      </div>
    `;
  }
}
