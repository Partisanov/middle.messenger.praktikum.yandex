import Block from '../../utils/Block.ts';

interface IMessageDateProps {
  date: string;
}

export class MessageDate extends Block<IMessageDateProps> {
  constructor(props: IMessageDateProps) {
    super(props);
  }

  protected render(): string {
    const { date } = this.props;
    return `
      <div class="message-date">
       <span class="message-date__text">${date}</span>
      </div>`;
  }
}
