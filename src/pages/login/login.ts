import Block from '../../utils/Block.ts';
import * as validators from '../../utils/validators.ts';
import { ErrorLine, InputField } from '../../components';
import router from '../../Router/Router.ts';
import { signin } from '../../services/auth.ts';

type Ref = {
  login: InputField;
  password: InputField;
  error: ErrorLine;
};

interface ILoginPageProps {
  validate: {
    login: (value: string) => string | boolean;
    password: (value: string) => string | boolean;
  };
  onLogin: (event: KeyboardEvent | MouseEvent) => void;
  onRegistration: (event: KeyboardEvent | MouseEvent) => void;
  events?: Record<string, never>;
  error: string | null;
}

export class LoginPage extends Block<ILoginPageProps, Ref> {
  static componentName = 'LoginPage';

  constructor() {
    super({
      error: null,
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

        signin({
          login,
          password,
        }).catch((error) => this.refs.error.setProps({ error }));
      },
      onRegistration: (event: Event) => {
        event.preventDefault();
        router.go('/sign-up');
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
                  {{{ ErrorLine error=error ref="error" type="dialog" }}}
                  <div style="margin-top: auto">
                    {{{ Button label="Авторизоваться" type="primary" page="messenger" onClick=onLogin }}}
                    {{{ Button label="Нет аккаунта?" type="link" page="registration" onClick=onRegistration }}}
                  </div>

                {{/Form}}
            </div>
        `;
  }
}
