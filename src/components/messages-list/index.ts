import Handlebars from "handlebars";

export { default as MessagesList } from "./messages-list.hbs?raw";

Handlebars.registerHelper("messagesData", () => {
  return [
    {
      date: "19 июня",
      messages: [
        {
          userId: "otherUser",
          message: {
            type: "text",
            content: "Привет, как дела?",
            time: "10:00",
          },
        },
        {
          userId: "ownUser",
          message: {
            type: "text",
            content: "Привет! Все хорошо, спасибо.",
            time: "10:05",
          },
        },
      ],
    },
    {
      date: "20 июня",
      messages: [
        {
          userId: "otherUser",
          message: {
            type: "image",
            content:
              "https://masterpiecer-images.s3.yandex.net/1c49a4af70dc11eeb260363fac71b015:upscaled",
            time: "15:30",
          },
        },
        {
          userId: "ownUser",
          message: {
            type: "text",
            content: "День был продуктивным. Как у тебя?",
            time: "16:00",
          },
        },
      ],
    },
    {
      date: "21 июня",
      messages: [
        {
          userId: "otherUser",
          message: {
            type: "text",
            content:
              "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            time: "16:00",
          },
        },
        {
          userId: "otherUser",
          message: {
            type: "image",
            content:
              "https://i0.wp.com/kosmofoto.com/wp-content/uploads/2020/06/85048051_1_x.jpg?resize=696%2C464&ssl=1",
            time: "15:30",
          },
        },
      ],
    },
    {
      date: "22 июня",
      messages: [
        {
          userId: "ownUser",
          message: {
            type: "text",
            content: "Круто!",
            time: "12:00",
          },
        },
        {
          userId: "ownUser",
          message: {
            type: "image",
            content:
              "https://www.clubhasselblad.com/files/ch/hasselblad-nasa/nasa-hasselblad-electric-camera-02.jpg",
            time: "12:05",
          },
        },
      ],
    },
  ];
});
