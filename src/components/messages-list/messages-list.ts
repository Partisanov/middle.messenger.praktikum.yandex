import Block from '../../utils/Block.ts';
import { IMessageProps } from '../message-item/message-item.ts';

interface IMessagesListProps {
  messagesData: IMessagesItemProps[];
}

export interface IMessagesItemProps {
  date: string;
  messages: IMessageProps[];
}

export class MessagesList extends Block<IMessagesListProps> {
  static name = 'MessagesList';

  constructor(props: IMessagesListProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="messages">
        {{#each messagesData}}
          {{{MessageDate  date=this.date}}}
          <ul class="messages__list">
            {{#each messages}}
              {{{Message
                userId=this.userId
                message=this.message
              }}}
            {{/each}}
          </ul>
        {{/each}}
      </div>
    `;
  }
}
