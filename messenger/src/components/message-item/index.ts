import Handlebars from "handlebars";

export { default as Message } from "./message-item.hbs?raw";
Handlebars.registerHelper("isOwnUser", function (userId) {
  return userId === "ownUser";
});

Handlebars.registerHelper("isTextMessage", function (messageType) {
  return messageType === "text";
});

Handlebars.registerHelper("isImageMessage", function (messageType) {
  return messageType === "image";
});
