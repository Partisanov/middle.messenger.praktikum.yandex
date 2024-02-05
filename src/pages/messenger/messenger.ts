import Block from '../../utils/Block.ts';
import { connect } from '../../utils/connect.ts';

import { addUserToChat, createChat, getToken, getUsersFromChat, removeUserFromChat } from '../../services/chats.ts';
import { initChatPage } from '../../services/initApp.ts';
import { TChat, TUser } from '../../type.ts';
import { DialogCreateChat } from '../../components/dialog-create-chat';
import MessageService from '../../utils/WS.ts';
import { DialogAddUser } from '../../components/dialog-add-user';
import { DialogRemoveUser } from '../../components/dialog-remove-user';
import { searchUser } from '../../services/user.ts';

interface IMessengerPageProps {
  openDialog: () => void;
  closeDialog: () => void;
  onSave: (e: Event) => void;
  onSelectChat: (id: number, title: string) => void;
  sendMessage: (message: string) => void;
  openDialogAddUser: () => void;
  closeDialogAddUser: () => void;
  onAddUser: (e: Event) => void;
  openDialogRemoveUser: () => void;
  closeDialogRemoveUser: () => void;
  onRemoveUser: (e: Event) => void;
  chats: TChat[];
  user: TUser;
}

type Refs = {
  createChat: DialogCreateChat;
  addUser: DialogAddUser;
  removeUser: DialogRemoveUser;
};

export class MessengerPage extends Block<IMessengerPageProps, Refs> {
  private socket: MessageService | null = null;

  constructor(props: IMessengerPageProps) {
    super({
      ...props,
      openDialog: () => window.store.set({ isOpenDialogCreateChat: true }),
      closeDialog: () => window.store.set({ isOpenDialogCreateChat: false }),
      onSave: (e) => {
        e.preventDefault();
        const chatTitle = this.refs.createChat.getChatName();
        if (!chatTitle) {
          this.refs.createChat.setError('Название переписки не может быть пустым');
          return;
        }
        createChat(chatTitle)
          .then(() => window.store.set({ isOpenDialogCreateChat: false }))
          .catch((error) => this.refs.createChat.setError(error));
      },

      openDialogAddUser: () => window.store.set({ isOpenDialogAddUser: true }),
      closeDialogAddUser: () => window.store.set({ isOpenDialogAddUser: false }),
      onAddUser: async (e: Event) => {
        e.preventDefault();
        const chatId = window.store.getState().idActiveChat!;
        const userLogin = this.refs.addUser.getLogin();
        if (!userLogin) {
          this.refs.addUser.setError('Введите Логин пользователя');
        } else {
          const searchUserResult = await searchUser({ login: userLogin });
          if (Array.isArray(searchUserResult) && searchUserResult.length > 0) {
            if (searchUserResult.length !== 1) {
              this.refs.addUser.setError('Введите точный логин');
            }
            this.refs.addUser.setError('');
            const userId = searchUserResult[0].id;
            const usersInChat = await getUsersFromChat(chatId);
            if (Array.isArray(usersInChat) && usersInChat.some((user) => user.id === userId)) {
              this.refs.addUser.setError('Пользователь уже добавлен в этот чат');
              return;
            }
            addUserToChat(chatId, userId)
              .then(() => {
                alert(`Пользователь ${userLogin} успешно добавлен в чат`);
                window.store.set({ isOpenDialogAddUser: false });
              })
              .catch((error) => this.refs.addUser.setError(error));
          }
        }
      },
      openDialogRemoveUser: () => window.store.set({ isOpenDialogRemoveUser: true }),
      closeDialogRemoveUser: () => window.store.set({ isOpenDialogRemoveUser: false }),
      onRemoveUser: async (e: Event) => {
        e.preventDefault();
        const chatId = window.store.getState().idActiveChat!;
        const userLogin = this.refs.removeUser.getLogin();
        if (!userLogin) {
          this.refs.removeUser.setError('Введите Логин пользователя');
        } else {
          const searchUserResult = await searchUser({ login: userLogin });
          if (Array.isArray(searchUserResult) && searchUserResult.length > 0) {
            if (searchUserResult.length !== 1) {
              this.refs.removeUser.setError('Введите точный логин');
            }
            this.refs.removeUser.setError('');
            const userId = searchUserResult[0].id;
            const usersInChat = await getUsersFromChat(chatId);
            if (Array.isArray(usersInChat) && !usersInChat.some((user) => user.id === userId)) {
              this.refs.removeUser.setError('Такого пользователя в чате нет');
              return;
            }
            removeUserFromChat(chatId, userId)
              .then(() => {
                alert(`Пользователь ${userLogin} успешно удален из чата`);
                window.store.set({ isOpenDialogRemoveUser: false });
              })

              .catch((error) => this.refs.removeUser.setError(error));
          }
        }
      },

      onSelectChat: async (id: number, title: string) => {
        window.store.set({ idActiveChat: id });
        window.store.set({ activeChatTitle: title });
        if (this.socket) {
          this.socket.disconnect();
        }

        this.socket = new MessageService();
        const userId = this.props.user.id;
        const chatId = id;
        const token = await getToken(chatId);
        await this.socket.connect({ userId: userId, chatId: chatId, token: token });
      },
      sendMessage: (message: string) => {
        if (this.socket) {
          this.socket.sendMessage(message);
        }
      },
    });
    this.socket = null;
    initChatPage();
  }

  protected render(): string {
    return `
      <div class="container">
        {{{Menu chats=chats openCreateChatDialog=openDialog onSelectChat=onSelectChat}}}
        {{{Chat
          sendMessage=sendMessage
          openDialogAddUser=openDialogAddUser
          openDialogRemoveUser=openDialogRemoveUser
        }}}
        {{{ DialogCreateChat onSave=onSave onClose=closeDialog ref="createChat"}}}
        {{{DialogAddUser onAddUser=onAddUser onClose=closeDialogAddUser ref="addUser"}}}
        {{{DialogRemoveUser onRemoveUser=onRemoveUser onClose=closeDialogRemoveUser ref="removeUser"}}}
      </div>
    `;
  }
}

export default connect(({ idActiveChat, chats, user, messages }) => ({
  chats,
  user,
  idActiveChat,
  messages,
}))(MessengerPage);
