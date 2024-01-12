import Block from '../../utils/Block.ts';
import { IProfilePageProps } from '../profile/profile.ts';
import * as validators from '../../utils/validators.ts';
import { Avatar, InputField } from '../../components';
import { navigate } from '../../utils/navigate.ts';

interface IEditProfilePageProps extends IProfilePageProps {
  validate: {
    login: (value: string) => string | boolean;
    email: (value: string) => string | boolean;
    name: (value: string) => string | boolean;
    phone: (value: string) => string | boolean;
  };
  onSubmit: (event: KeyboardEvent | MouseEvent) => void;
}

type Ref = {
  avatar: Avatar;
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  display_name: InputField;
  phone: InputField;
};

export class EditProfilePage extends Block<IEditProfilePageProps, Ref> {
  constructor() {
    super({
      img:
        'https://aabookshop.net/wp-content/plugins/' +
        'wp-e-commerce/wpsc-components/theme-engine-v1/templates/wpsc-images/noimage.png',
      display_name: 'Иван',
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      first_name: 'Иван',
      second_name: 'Иванов',
      phone: '+7(909)9673030',
      validate: {
        login: validators.login,
        email: validators.email,
        name: validators.name,
        phone: validators.phone,
      },
      onSubmit: (e) => {
        e.preventDefault();
        const email = this.refs.email.value();
        const login = this.refs.login.value();
        const display_name = this.refs.display_name.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        if (!email || !login || !display_name || !first_name || !second_name || !phone) {
          return;
        }
        console.log({
          email,
          login,
          display_name,
          first_name,
          second_name,
          phone,
        });
        navigate('profile');
      },
    });
  }

  protected render(): string {
    const { img, display_name, email, login, first_name, second_name, phone } = this.props;
    return `
        <div class="container">
        {{#> ProfileLayout}} 
          <div class="profile__avatar-wrap" style="margin-bottom: 97px">
            <button class="profile__change-avatar-btn">Поменять аватар</button>
            {{{Avatar img="${img}" size=130 }}}
          </div>
          <ul class="profile__list">
              <li class="profile__item">
                {{{InputField
                  label="Почта"
                  id="email"
                  name="email"
                  type="text"
                  mode="fix" 
                  value='${email}'
                  ref="email"
                  validate=validate.email 
                }}}
              </li>
              <li class="profile__item">
                {{{InputField
                  label="Логин"
                  id="login"
                  name="login"
                  type="text"
                  mode="fix" 
                  value='${login}'
                  ref="login"
                  validate=validate.login 
                }}}
              </li>
              <li class="profile__item">
                {{{InputField
                  label="Имя"
                  id="first_name"
                  name="first_name"
                  type="text"
                  mode="fix" 
                  value='${first_name}'
                  ref="first_name"
                  validate=validate.name
                }}}
              </li>
              <li class="profile__item">
                {{{InputField
                  label="Фамилия"
                  id="second_name"
                  name="second_name"
                  type="text"
                  mode="fix" 
                  value='${second_name}'
                  ref="second_name"
                  validate=validate.name
                }}}
              </li>
              <li class="profile__item">
                {{{InputField
                  label="Имя в чате"
                  id="display_name"
                  name="display_name"
                  type="text"
                  mode="fix" 
                  value='${display_name}'
                  ref="display_name"
                  validate=validate.name
                }}}
              </li>
              <li class="profile__item">
                {{{InputField
                  label="Телефон"
                  id="phone"
                  name="phone"
                  type="text"
                  mode="fix" 
                  value='${phone}'
                  ref="phone"
                  validate=validate.phone
                }}}
              </li>
            </ul>
          <ul class="profile__list">
              <li class="profile__item_btn" style="display: flex; justify-content: center">
                {{{Button type="primary" label="Сохранить" onClick=onSubmit }}}
              </li>
            </ul>
        {{/ProfileLayout}}
      </div>
    `;
  }
}
