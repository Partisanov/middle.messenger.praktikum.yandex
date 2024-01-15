import { IItemUserProps } from '../components/item-user/item-user.ts';

export const users: IItemUserProps[] = [
  {
    active: false,
    name: 'Андрей',
    avatar: 'https://as1.ftcdn.net/v2/jpg/05/56/02/28/500_F_556022830_DMTczgmgxUzS05DmA6uBOcbJiWLGodat.jpg',
    message: 'текст последнего сообщения',
    date: '10:49',
  },
  {
    name: 'Киноклуб',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVXEv56F4dZMtTtYhwcngN_RFh1ZG4GxueN4gA4s3BA&s',
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
];
