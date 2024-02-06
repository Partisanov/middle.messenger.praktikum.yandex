import UserApi from '../api/user.ts';
import { TChangePasswordRequestData, TSearchUser, TUserRequestData } from '../api/type.ts';
import { apiHasError } from '../utils/apiHasError.ts';
import { getUser } from './auth.ts';

const userApi = new UserApi();

const changeUserInfo = async (data: TUserRequestData) => {
  const response = await userApi.updateProfile(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
  alert('Данные успешно обновлены');
};

const changeUserPassword = async (data: TChangePasswordRequestData) => {
  const response = await userApi.updatePassword(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  alert('Пароль успешно изменен');
};
const changeAvatar = async (data: FormData) => {
  const response = userApi.changeAvatar(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  const me = await getUser();
  window.store.set({ user: me });
};
const searchUser = async (data: TSearchUser) => {
  const response = userApi.searchUser(data);
  if (apiHasError(response)) {
    throw Error(response.reason);
  }
  return response;
};
export { changeUserInfo, changeUserPassword, changeAvatar, searchUser };
