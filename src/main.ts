import Handlebars from "handlebars";
import * as Layouts from "./layouts";
import * as Components from "./components";
import { navigate } from "./utils/navigate.ts";
import { registerComponent } from "./utils/registerComponents.ts";

// Object.entries(Components).forEach(([name, component]) => {
//   if (['Input', 'Button'].includes(name)) {
//     registerComponent(name, component);
//     return;
//   }
//   Handlebars.registerPartial(name, component);
// });

Handlebars.registerPartial('Form', Layouts.Form);
Handlebars.registerPartial('PopupLayout', Layouts.PopupLayout);
Handlebars.registerPartial('ProfileLayout', Layouts.ProfileLayout);

registerComponent('Title', Components.Title);
registerComponent('InputField', Components.InputField);
registerComponent('Input', Components.Input);
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

document.addEventListener('DOMContentLoaded', () => navigate('login'));
