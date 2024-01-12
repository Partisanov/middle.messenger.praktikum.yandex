import Block from '../../utils/Block.ts';
import { Avatar, InputField } from '../../components';
import { navigate } from '../../utils/navigate.ts';

export interface IProfilePageProps {
  img?: string;
  display_name: string;
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  onEditProfile?: (event: KeyboardEvent | MouseEvent) => void;
  onChangePassword?: (event: KeyboardEvent | MouseEvent) => void;
  onLogOut?: (event: KeyboardEvent | MouseEvent) => void;
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

export class ProfilePage extends Block<IProfilePageProps, Ref> {
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

      onEditProfile: (e) => {
        e.preventDefault();
        navigate('editProfile');
      },
      onChangePassword: (e) => {
        e.preventDefault();
        navigate('changePassword');
      },
      onLogOut: (e) => {
        e.preventDefault();
        navigate('login');
      },
    });
  }

  protected render(): string {
    const { img, display_name, email, login, first_name, second_name, phone } = this.props;
    return `
      <div class="container">
        {{#> ProfileLayout}}
          <div class="profile__avatar-wrap">
            <button class="profile__change-avatar-btn">Поменять аватар</button>
            {{{Avatar img="${img}" size=130 }}}
          </div>
            <div class="profile__title-wrap">
              <h3 class="profile__title">${display_name}</h3>
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
                  disabled="true"
                  ref="email"
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
                  disabled="true"
                  ref="login"
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
                  disabled="true"
                  ref="first_name"
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
                  disabled="true"
                  ref="second_name"
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
                  disabled="true"
                  ref="display_name"
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
                  disabled="true"
                  ref="phone"
                }}}
              </li>
            </ul>
            <ul class="profile__list">
      <li class="profile__item_btn">
        {{{Button type="link" label="Изменить данные" page="editProfile" onClick=onEditProfile }}}
      </li>
      <li class="profile__item_btn">
        {{{Button type="link" label="Изменить пароль" page="changePassword" onClick=onChangePassword }}}
      </li>
      <li class="profile__item_btn">{{{Button type="link-danger" label="Выйти" page="login" onClick=onLogOut }}}</li>
    </ul>
        {{/ProfileLayout}}
      </div>
    `;
  }
}
