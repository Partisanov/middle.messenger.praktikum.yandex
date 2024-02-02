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

export type TLoginRequestData = {
  login: string;
  password: string;
};
