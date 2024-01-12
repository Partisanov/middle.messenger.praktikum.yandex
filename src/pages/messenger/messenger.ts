import Block from '../../utils/Block.ts';
import { IItemUserProps } from '../../components/item-user/item-user.ts';
import { IMessagesItemProps } from '../../components/messages-list/messages-list.ts';

interface IMessengerPageProps {
  users: IItemUserProps[];
  messagesData: IMessagesItemProps[];
}

export class MessengerPage extends Block<IMessengerPageProps> {
  constructor() {
    super({
      users: [
        {
          active: false,
          name: 'Андрей',
          avatar: 'https://as1.ftcdn.net/v2/jpg/05/56/02/28/500_F_556022830_DMTczgmgxUzS05DmA6uBOcbJiWLGodat.jpg',
          message: 'текст последнего сообщения',
          date: '10:49',
        },
        {
          name: 'Киноклуб',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVXEv56F4dZMtTtYhwcngN_RFh1ZG4GxueN4gA4s3BA&s',
          message: 'текст последнего сообщения',
          date: '12:00',
          active: true,
        },
        {
          active: false,
          name: 'Илья',
          avatar: '',
          message: 'текст последнего сообщения',
          date: 'Пт',
          newMessage: '4',
        },
      ],
      messagesData: [
        {
          date: '19 июня',
          messages: [
            {
              userId: 'otherUser',
              message: {
                type: 'text',
                content: 'Привет, как дела?',
                time: '10:00',
              },
            },
            {
              userId: 'ownUser',
              message: {
                type: 'text',
                content: 'Привет! Все хорошо, спасибо.',
                time: '10:05',
              },
            },
          ],
        },
        {
          date: '20 июня',
          messages: [
            {
              userId: 'otherUser',
              message: {
                type: 'image',
                content: 'https://masterpiecer-images.s3.yandex.net/1c49a4af70dc11eeb260363fac71b015:upscaled',
                time: '15:30',
              },
            },
            {
              userId: 'ownUser',
              message: {
                type: 'text',
                content: 'День был продуктивным. Как у тебя?',
                time: '16:00',
              },
            },
          ],
        },
        {
          date: '21 июня',
          messages: [
            {
              userId: 'otherUser',
              message: {
                type: 'text',
                content:
                  'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент' +
                  ' попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем ' +
                  'что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще ' +
                  'находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.' +
                  ' Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так ' +
                  'никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на ' +
                  'аукционе за 45000 евро.',
                time: '16:00',
              },
            },
            {
              userId: 'otherUser',
              message: {
                type: 'image',
                content:
                  'https://i0.wp.com/kosmofoto.com/wp-content/uploads/2020/06/85048051_1_x.jpg?resize=696%2C464&ssl=1',
                time: '15:30',
              },
            },
          ],
        },
        {
          date: '22 июня',
          messages: [
            {
              userId: 'ownUser',
              message: {
                type: 'text',
                content: 'Круто!',
                time: '12:00',
              },
            },
            {
              userId: 'ownUser',
              message: {
                type: 'image',
                content:
                  'https://www.clubhasselblad.com/files/ch/hasselblad-nasa/nasa-hasselblad-electric-camera-02.jpg',
                time: '12:05',
              },
            },
          ],
        },
      ],
    });
  }

  protected render(): string {
    return `
      <div class="container">
        {{{Menu users=users}}}
        {{{Chat messagesData=messagesData}}}
      </div>
    `;
  }
}
