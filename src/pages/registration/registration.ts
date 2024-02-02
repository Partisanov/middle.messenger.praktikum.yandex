import Block from '../../utils/Block.ts';
import * as validators from '../../utils/validators.ts';
import { ErrorLine, InputField } from '../../components';
import { signup } from '../../services/auth.ts';

import router from '../../Router/Router.ts';
import { TCreateUser } from '../../api/type.ts';

type Ref = {
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  phone: InputField;
  password: InputField;
  password2: InputField;
  error: ErrorLine;
};

interface IRegistrationPageProps {
  validate: {
    email: (value: string) => string | boolean;
    login: (value: string) => string | boolean;
    password: (value: string) => string | boolean;
    name: (value: string) => string | boolean;
    phone: (value: string) => string | boolean;
  };
  onLogin: (event: KeyboardEvent | MouseEvent) => void;
  onRegistration: (event: KeyboardEvent | MouseEvent) => void;
  error: string | null;
}

export class RegistrationPage extends Block<IRegistrationPageProps, Ref> {
  constructor() {
    super({
      error: null,
      validate: {
        login: validators.login,
        password: validators.password,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
      },
      onLogin: (event) => {
        event.preventDefault();
        router.go('/sign-in');
      },
      onRegistration: (event) => {
        event.preventDefault();
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const password = this.refs.password.value();
        const password2 = this.refs.password2.value();
        if (password !== password2) {
          this.refs.password.setProps({ value: password, invalid: true });
          this.refs.password2.setProps({ value: password2, invalid: true });
          // @ts-expect-error: set error manually
          this.refs.password2.refs.errorLine.setProps({ error: 'Пароли не совпадают' });
          return;
        } else {
          this.refs.password.setProps({ value: password, invalid: false });
          this.refs.password2.setProps({ value: password2, invalid: false });
        }
        if (!email || !login || !first_name || !second_name || !phone) {
          return;
        }
        const newUser: TCreateUser = {
          login: this.refs.login.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          email: this.refs.email.value()!,
          phone: this.refs.phone.value()!,
          password: this.refs.password.value()!,
        };
        signup(newUser).catch((error) => this.refs.error.setProps({ error }));
      },
    });
  }

  protected render(): string {
    return `
            <div class="container">
                {{#> Form type="auth"}}
                  {{{ Title text="Регистрация"}}}
                  {{{ InputField
                    label="Почта"
                    id="email"
                    name="email"
                    type="email"
                    mode="float"
                    ref="email"
                    validate=validate.email
                   }}}
                  {{{ InputField
                    label="Логин"
                    id="login"
                    name="login"
                    type="text"
                    mode="float"
                    ref="login"
                    validate=validate.login
                  }}}
                  {{{ InputField
                    label="Имя"
                    id="first_name"
                    name="first_name"
                    type="text"
                    mode="float"
                    ref="first_name"
                    validate=validate.name
                  }}}
                  {{{ InputField
                    label="Фамилия"
                    id="second_name"
                    name="second_name"
                    type="text"
                    mode="float"
                    ref="second_name"
                    validate=validate.name
                  }}}
                  {{{ InputField
                    label="Телефон"
                    id="phone"
                    name="phone"
                    type="text"
                    mode="float"
                    ref="phone"
                    validate=validate.phone
                  }}}
                  {{{ InputField
                    label="Пароль"
                    id="password"
                    name="password"
                    type="password"
                    mode="float"
                    ref="password"
                    validate=validate.password
                  }}}
                  {{{ InputField
                    label="Пароль (ещё раз)"
                    id="password2"
                    name="password"
                    type="password"
                    mode="float"
                    ref="password2"
                    validate=validate.password
                  }}}
                  <div style="position: relative">{{{ ErrorLine error=error ref="error"}}}</div>
                  <div style="margin-top: 47px">
                    {{{ Button label="Зарегистрироваться" type="primary" page="list" onClick=onRegistration }}}
                    {{{ Button label="Войти" type="link" page="login" onClick=onLogin }}}
                  </div>
                {{/Form}}
            </div>
        `;
  }
}
