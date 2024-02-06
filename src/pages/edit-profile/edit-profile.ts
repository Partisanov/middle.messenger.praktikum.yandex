import * as validators from '../../utils/validators.ts';
import { Avatar, ErrorLine, InputField } from '../../components';
import Block from '../../utils/Block.ts';
import { IProfilePageProps } from '../profile/profile.ts';
import { initProfilePage } from '../../services/initApp.ts';
import { TAvatar, TUserRequestData } from '../../api/type.ts';
import { changeAvatar, changeUserInfo } from '../../services/user.ts';
import { connect } from '../../utils/connect.ts';
import router from '../../Router/Router.ts';
import { DialogChangeAvatar } from '../../components/dialog-change-avatar';
import constants from '../../constants.ts';

interface IEditProfilePageProps extends IProfilePageProps {
  validate: {
    login: (value: string) => string | boolean;
    email: (value: string) => string | boolean;
    name: (value: string) => string | boolean;
    phone: (value: string) => string | boolean;
  };
  onSubmit: (event: KeyboardEvent | MouseEvent) => void;
  onBack: () => void;
  closeDialog: () => void;
  onSave: (e: Event) => void;
  avatarFile: TAvatar;
}

type Ref = {
  avatar: Avatar;
  email: InputField;
  login: InputField;
  first_name: InputField;
  second_name: InputField;
  display_name: InputField;
  phone: InputField;
  errorLine: ErrorLine;
  changeAvatar: DialogChangeAvatar;
};

class EditProfilePage extends Block<IEditProfilePageProps, Ref> {
  constructor(props: IEditProfilePageProps) {
    super({
      ...props,
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
        const newUserData: TUserRequestData = {
          email: this.refs.email.value()!,
          login: this.refs.login.value()!,
          display_name: this.refs.display_name.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          phone: this.refs.phone.value()!,
        };
        changeUserInfo(newUserData).catch((error) => this.refs.errorLine.setProps({ error }));
      },
      onBack: () => {
        router.go('/settings');
      },
      closeDialog: () => {
        this.refs.changeAvatar.reset();
        window.store.set({ isOpenDialogChangeAvatar: false });
      },
      onSave: (e) => {
        e.preventDefault();
        const avatarFile = this.refs.changeAvatar.getFile();
        if (!avatarFile) {
          this.refs.changeAvatar.setError('Нужно выбрать файл');
          return;
        }
        const avatarData: TAvatar = new FormData();
        avatarData.append('avatar', avatarFile);
        changeAvatar(avatarData)
          .then(() => {
            initProfilePage();
            window.store.set({ isOpenDialogChangeAvatar: false });
          })
          .catch((error) => this.refs.changeAvatar.setError(error));
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
              <div class="profile__avatar-wrap" style="margin-bottom: 97px">
                <button
                  type="button"
                  class="profile__change-avatar-btn"
                  onclick="window.store.set({ isOpenDialogChangeAvatar: true })"
                >Поменять аватар</button>
                  {{{Avatar img="${
                    avatar
                      ? `
${constants.RESOURCE}${avatar}`
                      : ''
                  }" size=130 }}}
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
                  value='${display_name ? display_name : ''}'
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
              {{{ ErrorLine error=error ref="errorLine"}}}
              <ul class="profile__list">
              <li class="profile__item_btn" style="display: flex; justify-content: center">
                {{{Button type="primary" label="Сохранить" onClick=onSubmit }}}
              </li>
            </ul>
            </form>
            {{{DialogChangeAvatar onSave=onSave onClose=closeDialog ref="changeAvatar"}}}
          </div>
        </section>
    `;
  }
}

export default connect(({ user }) => ({ user }))(EditProfilePage);
