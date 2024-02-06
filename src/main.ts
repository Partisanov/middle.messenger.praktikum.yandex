import Handlebars from 'handlebars';
import * as Layouts from './layouts';
import * as Components from './components';
import { registerComponent } from './utils/registerComponents.ts';
import { Store } from './Store/Store.ts';
import { initApp } from './services/initApp.ts';
import { TAppState } from './type.ts';

Handlebars.registerPartial('Form', Layouts.Form);

registerComponent('Title', Components.Title);
registerComponent('InputField', Components.InputField);
registerComponent('Input', Components.Input);
registerComponent('InputFile', Components.InputFile);
registerComponent('ErrorLine', Components.ErrorLine);
registerComponent('Button', Components.Button);
registerComponent('Avatar', Components.Avatar);
registerComponent('UserName', Components.UserName);
registerComponent('Error', Components.Error);
registerComponent('ItemUser', Components.ItemUser);
registerComponent('ListUsers', Components.ListUsers);
registerComponent('Menu', Components.Menu);
registerComponent('MessageDate', Components.MessageDate);
registerComponent('Message', Components.Message);
registerComponent('MessagesList', Components.MessagesList);
registerComponent('Chat', Components.Chat);
registerComponent('SearchField', Components.SearchField);
registerComponent('Dialog', Components.Dialog);
registerComponent('DialogCreateChat', Components.DialogCreateChat);
registerComponent('DialogChangeAvatar', Components.DialogChangeAvatar);
registerComponent('InputFileAvatar', Components.InputFileAvatar);
registerComponent('DialogAddUser', Components.DialogAddUser);
registerComponent('DialogRemoveUser', Components.DialogRemoveUser);
declare global {
  interface Window {
    store: Store<TAppState>;
  }
}

const initState: TAppState = {
  error: null,
  user: null,
  isOpenDialogCreateChat: false,
  isOpenDialogChangeAvatar: false,
  isOpenDialogAddUser: false,
  isOpenDialogRemoveUser: false,
  chats: [],
  idActiveChat: null,
  activeChatTitle: null,
  messages: [],
  token: null,
};
window.store = new Store<TAppState>(initState);

document.addEventListener('DOMContentLoaded', () => initApp());
