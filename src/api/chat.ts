import { HTTPTransport } from '../utils/HTTPTransport.ts';
import { APIError, TCreateChat } from './type.ts';
import { TChat } from '../type.ts';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(data: TCreateChat): Promise<void | APIError> {
    return chatApi.post<void>('/', { data });
  }

  async getChats(): Promise<TChat[] | APIError> {
    return chatApi.get<TChat[]>('');
  }
}
