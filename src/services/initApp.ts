import { getUser } from './auth';
import { getChats } from './chats.ts';
import router from '../Router/Router.ts';
import {
  ChangePasswordPage,
  EditProfilePage,
  InternalErrorPage,
  LoginPage,
  MessengerPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
} from '../pages';
import Block from '../utils/Block.ts';
import { TChat, TUser } from '../type.ts';

const initApp = async () => {
  try {
    const me = await getUser();
    const chats: TChat[] = await getChats();
    window.store.set({ user: me, chats });
    setInterval(initChatPage, 10000);
  } catch (error) {
    console.log(error);
  }

  router
    .use('/', LoginPage as unknown as typeof Block)
    .use('/sign-in', LoginPage as unknown as typeof Block)
    .use('/sign-up', RegistrationPage as unknown as typeof Block)
    .use('/messenger', MessengerPage as unknown as typeof Block, { isPrivate: true })
    .use('/pageNotFound', NotFoundPage as unknown as typeof Block)
    .use('/internalError', InternalErrorPage as unknown as typeof Block)
    .use('/settings', ProfilePage as unknown as typeof Block, { isPrivate: true })
    .use('/changePassword', ChangePasswordPage as unknown as typeof Block, { isPrivate: true })
    .use('/editProfile', EditProfilePage as unknown as typeof Block, { isPrivate: true })
    .registerAuthorizationChecker(() => !!window.store.getState().user)
    .start();
};
const initChatPage = async () => {
  const chats: TChat[] = await getChats();
  window.store.set({ chats });
};

const initProfilePage = async () => {
  const user: TUser = await getUser();
  window.store.set({ user });
};

export { initApp, initChatPage, initProfilePage };
