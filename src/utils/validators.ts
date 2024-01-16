const validate = (value: string, regex: RegExp, errorMessage: string): string | false => {
  if (value.length === 0) {
    return 'Поле обязательно к заполнению';
  }
  if (!regex.test(value)) {
    return errorMessage;
  }
  return false;
};
export const login = (value: string) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
  return validate(
    value,
    regex,
    'Логин от 3 до 20 символов, латиница, может содержать цифры, ' +
      'без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  );
};

export const password = (value: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,40}$/;
  return validate(value, regex, 'Пароль должен содержать как минимум одну заглавную букву и одну цифру');
};

export const email = (value: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validate(value, regex, 'Недопустимый формат email');
};

export const name = (value: string) => {
  const regex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
  return validate(value, regex, 'Недопустимый формат');
};

export const phone = (value: string) => {
  const regex = /^\+?\d{10,15}$/;
  return validate(value, regex, 'Неверный формат телефонного номер');
};

export const message = (value: string) => {
  if (value.length === 0) {
    return 'Сообщение не должно быть пустым';
  }
  return false;
};
