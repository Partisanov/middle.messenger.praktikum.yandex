export type TAppState = {
  error: string | null;
  user: TUser | null;
  isOpenDialogCreateChat: boolean;
  isOpenDialogChangeAvatar: boolean;
  isOpenDialogAddUser: boolean;
  isOpenDialogRemoveUser: boolean;
  chats: TChat[];
  idActiveChat: number | null;
  activeChatTitle: string | null;
  messages: TMessage[] | [];
  token: string | null;
};
export type TMessage = {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type TUser = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string | null;
  phone: string;
  email: string;
};

type TLastMessage = {
  user: TUser;
  time: string;
  content: string;
};

export type TChat = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  unread_count: number;
  last_message: TLastMessage | null;
};
