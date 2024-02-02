import Block from '../../utils/Block.ts';
import { connect } from '../../utils/connect.ts';

import { createChat } from '../../services/messenger.ts';
import { initChatPage } from '../../services/initApp.ts';
import { TChat } from '../../type.ts';
import { DialogCreateChat } from '../../components/dialog-create-chat';

interface IMessengerPageProps {
  openDialog: () => void;
  closeDialog: () => void;
  onSave: () => void;
  chats: TChat[];
}

type Refs = {
  createChat: DialogCreateChat;
};

export class MessengerPage extends Block<IMessengerPageProps, Refs> {
  constructor(props: IMessengerPageProps) {
    super({
      ...props,
      openDialog: () => window.store.set({ isOpenDialogCreateChat: true }),
      closeDialog: () => window.store.set({ isOpenDialogCreateChat: false }),
      onSave: () => {
        const chatTitle = this.refs.createChat.getChatName();
        if (!chatTitle) {
          this.refs.createChat.setError('Название переписки не может быть пустым');
          return;
        }
        createChat(chatTitle)
          .then(() => window.store.set({ isOpenDialogCreateChat: false }))
          .catch((error) => this.refs.createChat.setError(error));
      },
    });
    initChatPage();
  }

  protected render(): string {
    return `
      <div class="container">
        {{{Menu chats=chats openCreateChatDialog=openDialog }}}
        {{{Chat messagesData=messagesData}}}
        {{{ DialogCreateChat onSave=onSave onClose=closeDialog ref="createChat"}}}
      </div>
    `;
  }
}

export default connect(({ chats, user }) => ({ chats, user }))(MessengerPage);
