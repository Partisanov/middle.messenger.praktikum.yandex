export type TAppState = {
  error: string | null;
  user: TUser | null;
  isOpenDialogCreateChat: boolean;
  chats: TChat[];
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
