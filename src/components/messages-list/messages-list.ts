import Block from '../../utils/Block.ts';
import { TMessage } from '../../type.ts';

interface IMessagesListProps {
  messagesData: TMessage[];
}

export class MessagesList extends Block<IMessagesListProps> {
  static name = 'MessagesList';

  constructor(props: IMessagesListProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="messages">
      <ul class="messages__list">
        {{#each messagesData}}
             {{{Message
                user_id=this.user_id
                content=this.content
                type=this.type
                time=this.time
             }}}
        {{/each}}
        </ul>
      </div>
    `;
  }
}
