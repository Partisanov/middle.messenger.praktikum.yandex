import Block from '../../utils/Block.ts';
import { InputField } from '../../components';
import * as validators from '../../utils/validators.ts';
import { navigate } from '../../utils/navigate.ts';

interface IChangePasswordPageProps {
  img?: string;
  validate: {
    password: (value: string) => string | boolean;
  };
  onSubmit: (event: KeyboardEvent | MouseEvent) => void;
}

type Ref = {
  oldPassword: InputField;
  newPassword: InputField;
  newPassword2: InputField;
};

export class ChangePasswordPage extends Block<IChangePasswordPageProps, Ref> {
  constructor() {
    super({
      validate: {
        password: validators.password,
      },
      onSubmit: (event) => {
        event.preventDefault();
        const oldPassword = this.refs.oldPassword.value();
        const newPassword = this.refs.newPassword.value();
        const newPassword2 = this.refs.newPassword2.value();
        if (newPassword !== newPassword2) {
          this.refs.newPassword.setProps({ value: newPassword, invalid: true });
          this.refs.newPassword2.setProps({ value: newPassword2, invalid: true });
          // @ts-expect-error: set error manually
          this.refs.newPassword2.refs.errorLine.setProps({ error: 'Пароли не совпадают' });
          return;
        } else {
          this.refs.newPassword.setProps({ value: newPassword, invalid: false });
          this.refs.newPassword2.setProps({ value: newPassword2, invalid: false });
        }
        if (!oldPassword) {
          return;
        }
        console.log({
          oldPassword,
          newPassword,
        });
        navigate('profile');
      },
      img:
        'https://aabookshop.net/wp-content/plugins/wp-e-commerce/wpsc-components/' +
        'theme-engine-v1/templates/wpsc-images/noimage.png',
    });
  }

  protected render(): string {
    const { img } = this.props;
    return `
      <div class="container">
        {{#>ProfileLayout}}
          <div class="profile__avatar-wrap" style="margin-bottom: 97px">
            <button class="profile__change-avatar-btn">Поменять аватар</button>
            {{{ Avatar img="${img}" size=130 }}}
          </div>
          <ul class="profile__list">
            <li class="profile__item">
              {{{InputField
                label="Старый пароль"
                id="oldPassword"
                name="oldPassword"
                type="password"
                mode="fix"
                ref="oldPassword"
                validate=validate.password
              }}}
            </li>
            <li class="profile__item">
              {{{InputField
                label="Новый пароль"
                id="newPassword"
                name="newPassword"
                type="password"
                mode="fix"
                ref="newPassword"
                validate=validate.password
              }}}
            </li>
            <li class="profile__item">
              {{{InputField
                label="Повторите новый пароль"
                id="newPassword2"
                name="newPassword"
                type="password"
                mode="fix"
                ref="newPassword2"
                validate=validate.password
              }}}
            </li>
          </ul>
          <ul class="profile__list">
            <li class="profile__item_btn" style="display: flex; justify-content: center">
              {{{Button type="primary" label="Сохранить" onClick=onSubmit}}}
            </li>
          </ul>
        {{/ProfileLayout}}
      </div>
    `;
  }
}
