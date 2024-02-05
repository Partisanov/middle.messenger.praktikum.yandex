import Block from '../../utils/Block.ts';
import * as validators from '../../utils/validators.ts';
import { Avatar } from '../avatar';
import { InputField } from '../input-field';
import { connect } from '../../utils/connect.ts';
import { TChat, TMessage } from '../../type.ts';

interface IChatProps {
  idActiveChat: number | null;
  activeChatTitle: string;
  messages: TMessage[] | [];
  chats: TChat[];
  validate: {
    message: (value: string) => string | boolean;
  };
  onSend: (event: KeyboardEvent | MouseEvent) => void;
  sendMessage: (message: string) => void;
  openDialogAddUser: () => void;
  openDialogRemoveUser: () => void;
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
        this.props.sendMessage(message);
        this.refs.message.setProps({ value: '' });
      },
    });
  }

  protected render(): string {
    const { idActiveChat } = this.props;
    if (idActiveChat === null) {
      return `<div class="chat chat-empty"><div class="chat__empty">Выберите чат чтобы отправить сообщение</div></div>`;
    }
    return `
      <div class="chat">
        <div class="chat__header">
          <div class="chat__user">
            {{{Avatar img="" size=34}}}
            {{{UserName name=activeChatTitle}}}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px">
          {{{Button type="add-user" onClick=openDialogAddUser }}}
          {{{Button type="remove-user" onClick=openDialogRemoveUser }}}
          {{{Button type="user"}}}
          </div>
        </div>
        <div class="chat__content">
          {{{MessagesList messagesData=messages}}}
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

export const withStoreChat = connect((state) => ({
  idActiveChat: state.idActiveChat,
  activeChatTitle: state.activeChatTitle,
  messages: state.messages,
  chats: state.chats,
}))(Chat);
