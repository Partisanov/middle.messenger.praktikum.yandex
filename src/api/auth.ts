import { HTTPTransport } from '../utils/HTTPTransport.ts';
import { TUser } from '../type.ts';
import { APIError, TCreateUser, TLoginRequestData, TSignUpResponse } from './type.ts';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: TCreateUser): Promise<TSignUpResponse> {
    return authApi.post<TSignUpResponse>('/signup', { data });
  }

  async login(data: TLoginRequestData): Promise<void | APIError> {
    return authApi.post('/signin', { data });
  }

  async me(): Promise<TUser | APIError> {
    return authApi.get('/user');
  }

  async logout(): Promise<void | APIError> {
    return authApi.post('/logout');
  }
}
