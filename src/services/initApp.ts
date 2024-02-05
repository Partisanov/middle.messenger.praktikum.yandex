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
  router
    .use('/', LoginPage as unknown as typeof Block)
    .use('/sign-in', LoginPage as unknown as typeof Block)
    .use('/sign-up', RegistrationPage as unknown as typeof Block)
    .use('/messenger', MessengerPage as unknown as typeof Block)
    .use('/pageNotFound', NotFoundPage as unknown as typeof Block)
    .use('/internalError', InternalErrorPage as unknown as typeof Block)
    .use('/settings', ProfilePage as unknown as typeof Block)
    .use('/changePassword', ChangePasswordPage as unknown as typeof Block)
    .use('/editProfile', EditProfilePage as unknown as typeof Block)
    .start();

  let me = null;
  try {
    me = await getUser();
  } catch (error) {
    router.go('/sign-in');
    return;
  }

  const chats: TChat[] = await getChats();
  window.store.set({ user: me, chats });
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
