import { HTTPTransport } from '../utils/HTTPTransport.ts';
import { APIError, TCreateChat, TUsers } from './type.ts';
import { TChat } from '../type.ts';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async create(data: TCreateChat): Promise<void | APIError> {
    return chatApi.post<void>('/', { data });
  }

  async getChats(): Promise<TChat[] | APIError> {
    return chatApi.get<TChat[]>('');
  }

  async getToken(data: { id: number }): Promise<string> {
    const response = await chatApi.post<{ token: string }>(`/token/${data.id}`);

    return response.token;
  }

  async addUsersToChat(data: TUsers) {
    return chatApi.put('/users', { data });
  }

  async removeUsersFromChat(data: TUsers) {
    return chatApi.delete('/users', { data });
  }

  async getUsersChat(chatId: number) {
    return chatApi.get(`/${chatId}/users`);
  }
}
