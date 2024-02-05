import { HTTPTransport } from '../utils/HTTPTransport.ts';
import { APIError, TChangePasswordRequestData, TSearchUser, TUserRequestData } from './type.ts';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async updateProfile(data: TUserRequestData): Promise<void | APIError> {
    return userApi.put('/profile', { data });
  }

  async updatePassword(data: TChangePasswordRequestData): Promise<void | APIError> {
    return userApi.put('/password', { data });
  }

  async changeAvatar(data: FormData) {
    return userApi.put('/profile/avatar', { data });
  }

  async searchUser(data: TSearchUser) {
    return userApi.post('/search', { data });
  }
}
