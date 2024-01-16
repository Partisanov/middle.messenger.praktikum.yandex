import Block from '../../utils/Block.ts';
import { navigate } from '../../utils/navigate.ts';
import * as validators from '../../utils/validators.ts';
import { InputField } from '../../components';

type Ref = {
  login: InputField;
  password: InputField;
};

interface ILoginPageProps {
  validate: {
    login: (value: string) => string | boolean;
    password: (value: string) => string | boolean;
  };
  onLogin: (event: KeyboardEvent | MouseEvent) => void;
  onRegistration: (event: KeyboardEvent | MouseEvent) => void;
}

export class LoginPage extends Block<ILoginPageProps, Ref> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password,
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        if (!login || !password) {
          return;
        }

        console.log({
          login,
          password,
        });
        navigate('messenger');
      },
      onRegistration: (event: Event) => {
        event.preventDefault();
        navigate('registration');
      },
    });
  }

  protected render(): string {
    return `
            <div class="container">
                {{#> Form type="auth"}}
                  {{{ Title text="Вход"}}}
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
                    label="Пароль" 
                    id="password" 
                    name="password" 
                    type="password" 
                    mode="float" 
                    ref="password" 
                    validate=validate.password
                  }}}
                  <div style="margin-top: auto">
                    {{{ Button label="Авторизоваться" type="primary" page="messenger" onClick=onLogin }}}
                    {{{ Button label="Нет аккаунта?" type="link" page="registration" onClick=onRegistration }}}
                  </div>
                {{/Form}}
            </div>
        `;
  }
}
