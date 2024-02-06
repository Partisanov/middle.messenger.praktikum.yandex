import Block from '../../utils/Block.ts';
import { TMessage } from '../../type.ts';
import { getFormatTime } from '../../helpers/dataFormater.ts';

export class Message extends Block<TMessage> {
  constructor(props: TMessage) {
    super(props);
  }

  protected render(): string {
    const { user_id, content, type, time } = this.props;
    const formatTime = getFormatTime(time);
    return `
      <li class="message ${this.isOwnUser(user_id) ? 'message-own' : ''} message-${type}">
        ${this.isTextMessage(type) ? `<p class="message__text">${content}</p>` : ''}
        ${
          this.isImageMessage(type) ? `<img src="${content}" alt="загруженное изображение" class="message__img" />` : ''
        }
        <div class="message__time">${formatTime}</div>
      </li>
    `;
  }

  private isOwnUser(userId: number): boolean {
    return userId === window.store.getState().user?.id;
  }

  private isTextMessage(type: string): boolean {
    return type === 'message';
  }

  private isImageMessage(type: string): boolean {
    return type === 'image';
  }
}
