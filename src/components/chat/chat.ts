import Block from '../../utils/Block.ts';
import * as validators from '../../utils/validators.ts';
import { Avatar } from '../avatar';
import { InputField } from '../input-field';

interface IChatProps {
  validate: {
    message: (value: string) => string | boolean;
  };
  onSend: (event: KeyboardEvent | MouseEvent) => void;
}

type Ref = {
  message: InputField;
  avatar: Avatar;
};

export class Chat extends Block<IChatProps, Ref> {
  constructor(props: IChatProps) {
    super({
      ...props,
      validate: {
        message: validators.message,
      },
      onSend: (event) => {
        event.preventDefault();
        const message = this.refs.message.value();
        if (!message) {
          return;
        }
        console.log(message);
        this.refs.message.setProps({ value: '' });
      },
    });
  }

  protected render(): string {
    return `
      <div class="chat">
        <div class="chat__header">
          <div class="chat__user">
            {{{Avatar img="https://encrypted-tbn0.gstatic.com/images?q=tbn:
            ANd9GcTqVXEv56F4dZMtTtYhwcngN_RFh1ZG4GxueN4gA4s3BA&s" size=34}}}
            {{{UserName name="Киноклуб"}}}
          </div>
          {{{Button type="user"}}}
        </div>
        <div class="chat__content">
          {{{MessagesList messagesData=messagesData}}}
        </div>
        <div class="chat__footer">
          {{{Button type="add"}}}
          {{{InputField
            id="message"
            name="message"
            type="text"
            mode="message"
            ref="message"
            validate=validate.message
            placeholder="Сообщение"
          }}}
          {{{Button type="arrow-right" onClick=onSend}}}
        </div>
    </div>
    `;
  }
}
