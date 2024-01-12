import Block from '../../utils/Block.ts';

export interface IMessageProps {
  userId: string;
  message: {
    type: string;
    content: string;
    time: string;
  };
}

export class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): string {
    const { userId, message } = this.props;

    return `
      <li class="message ${this.isOwnUser(userId) ? 'message-own' : ''} message-${message.type}">
        ${this.isTextMessage(message.type) ? `<p class="message__text">${message.content}</p>` : ''}
        ${
          this.isImageMessage(message.type)
            ? `<img src="${message.content}" alt="загруженное изображение" class="message__img" />`
            : ''
        }
        <div class="message__time">${message.time}</div>
      </li>
    `;
  }

  private isOwnUser(userId: string): boolean {
    return userId === 'ownUser'; // Ваша логика проверки
  }

  private isTextMessage(type: string): boolean {
    return type === 'text'; // Ваша логика проверки
  }

  private isImageMessage(type: string): boolean {
    return type === 'image'; // Ваша логика проверки
  }
}
