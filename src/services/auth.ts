import AuthApi from '../api/auth';
import { apiHasError } from '../utils/apiHasError';
import router from '../Router/Router.ts';
import { TUser } from '../type.ts';
import { APIError, TCreateUser, TLoginRequestData } from '../api/type.ts';

const authApi = new AuthApi();

const getUser = async (): Promise<TUser> => {
  const responseUser: TUser | APIError = await authApi.me();
  if (apiHasError(responseUser)) {
    throw Error(responseUser.reason);
  }

  return responseUser;
};

const signin = async (data: TLoginRequestData) => {
  const response = await authApi.login(data);
  if (apiHasError(response)) {
    if (response.reason === 'User already in system') {
      router.go('/messenger');
    }
    throw Error(response.reason);
  }

  const me = await getUser();

  window.store.set({ user: me });
  router.go('/messenger');
};

const signup = async (data: TCreateUser) => {
  const response = await authApi.create(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
  router.go('/messenger');
};

const logout = async () => {
  await authApi.logout();
  window.store.set({ user: null, chats: [] });
  window.location.reload();
  router.go('/');
};

export { signin, signup, logout, getUser };
