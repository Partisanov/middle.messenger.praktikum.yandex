import Handlebars from "handlebars";

export { default as ListUsers } from "./list-users.hbs?raw";

Handlebars.registerHelper("users", () => {
  return [
    {
      name: "Андрей",
      avatar: "",
      message: "текст последнего сообщения",
      date: "10:49",
    },
    {
      name: "Киноклуб",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVXEv56F4dZMtTtYhwcngN_RFh1ZG4GxueN4gA4s3BA&s",
      message: "текст последнего сообщения",
      date: "12:00",
      active: true,
    },
    {
      name: "Илья",
      avatar:
        "https://opis-cdn.tinkoffjournal.ru/ip/gfbOp5Ri1xeqEVOjE8tbyc8s0sHkaPMbcQQ6UjM7coI/h:600/w:600/aHR0cHM6Ly9vcGlz/LWNkbi50aW5rb2Zm/am91cm5hbC5ydS9z/b2NpYWwvcHJvZmls/ZS9lY2Q3YThhMy4x/NGVpbDRpXzFwa3Qx/bl81NjR4NTY0LnBu/Zw",
      message: "текст последнего сообщения",
      date: "Пт",
      newMessage: "4",
    },
  ];
});
