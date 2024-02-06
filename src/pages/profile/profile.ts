import Block from '../../utils/Block.ts';
import { Avatar, InputField } from '../../components';
import router from '../../Router/Router.ts';
import { connect } from '../../utils/connect.ts';
import { logout } from '../../services/auth.ts';
import { TUser } from '../../type.ts';
import { initProfilePage } from '../../services/initApp.ts';
import constants from '../../constants.ts';

export interface IProfilePageProps {
  user: TUser;
  onEditProfile?: (event: KeyboardEvent | MouseEvent) => void;
  onChangePassword?: (event: KeyboardEvent | MouseEvent) => void;
  onLogOut?: (event: KeyboardEvent | MouseEvent) => void;
  onBack: () => void;
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

class ProfilePage extends Block<IProfilePageProps, Ref> {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
      onEditProfile: (e) => {
        e.preventDefault();
        router.go('/editProfile');
      },
      onChangePassword: (e) => {
        e.preventDefault();
        router.go('/changePassword');
      },
      onLogOut: (e) => {
        e.preventDefault();
        logout();
        router.go('/sign-in');
      },
      onBack: () => {
        router.go('/messenger');
      },
    });
    initProfilePage();
  }

  protected render(): string {
    const { avatar, display_name, email, login, first_name, second_name, phone } = this.props.user || {};
    return `
      <section class="profile">
      <div class="profile__btn-back">
        {{{Button type="arrow-left" onClick=onBack }}}
    </div>
    <div class="profile__content">
      <form class="profile__form">
          <div class="profile__avatar-wrap">
            {{{Avatar img="${
              avatar
                ? `
${constants.RESOURCE}${avatar}`
                : ''
            }" size=130 }}}
          </div>
            <div class="profile__title-wrap">
              <h3 class="profile__title">${display_name ? display_name : ''}</h3>
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
                  value='${display_name ? display_name : ''}'
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
        </form>
    </div>
</section>
    `;
  }
}

export default connect(({ user }) => ({ user }))(ProfilePage);
