export type APIError = {
  reason: string;
};

export type TSignUpResponse = {
  id: number;
};

type TUser = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type TCreateUser = Omit<TUser, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type TCreateChat = {
  title: string;
};
type TId = number;
export type TUsers = {
  chatId: TId;
  users: TId[];
};

export type TLoginRequestData = {
  login: string;
  password: string;
};
export type TUserRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
export type TChangePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type TAvatar = FormData;

export type TSearchUser = {
  login: string;
};
