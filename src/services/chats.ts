import ChatApi from '../api/chat.ts';
import { apiHasError } from '../utils/apiHasError.ts';

const chatApi = new ChatApi();

const getChats = async () => {
  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  return responseChat;
};

const createChat = async (title: string) => {
  const response = await chatApi.create({ title });
  if (apiHasError(response)) {
    throw Error(response.reason);
  }

  const responseChat = await chatApi.getChats();
  if (apiHasError(responseChat)) {
    throw Error(responseChat.reason);
  }

  const chats = await getChats();
  window.store.set({ chats });
};

const getToken = async (id: number) => {
  const response = await chatApi.getToken({ id });
  if (apiHasError(response)) {
    throw new Error(response.reason);
  }
  return response;
};

const addUserToChat = async (chatId: number, userId: number) => {
  const response = await chatApi.addUsersToChat({ chatId: chatId, users: [userId] });
  if (apiHasError(response)) {
    throw new Error(response.reason);
  }
};
const removeUserFromChat = async (chatId: number, userId: number) => {
  const response = await chatApi.removeUsersFromChat({ chatId: chatId, users: [userId] });
  if (apiHasError(response)) {
    throw new Error(response.reason);
  }
};
const getUsersFromChat = async (chatId: number) => {
  const response = await chatApi.getUsersChat(chatId);
  if (apiHasError(response)) {
    throw new Error(response.reason);
  }
  return response;
};

export { createChat, getChats, getToken, addUserToChat, removeUserFromChat, getUsersFromChat };
