import { HTTPTransport } from '../utils/HTTPTransport.ts';
import { TUser } from '../type.ts';

const userApi = new HTTPTransport('/user');

export default class UserApi {
  async changeProfile(data: TUser) {
    return userApi.put('/profile', { data });
  }
}
