import Block from '../../utils/Block.ts';
import { ErrorLine, InputField } from '../../components';
import * as validators from '../../utils/validators.ts';
import { TUser } from '../../type.ts';
import { initProfilePage } from '../../services/initApp.ts';
import { connect } from '../../utils/connect.ts';
import { TChangePasswordRequestData } from '../../api/type.ts';
import { changeUserPassword } from '../../services/user.ts';
import router from '../../Router/Router.ts';
import constants from '../../constants.ts';

interface IChangePasswordPageProps {
  user: TUser;
  validate: {
    password: (value: string) => string | boolean;
  };
  onSubmit: (event: KeyboardEvent | MouseEvent) => void;
  onBack: () => void;
}

type Ref = {
  oldPassword: InputField;
  newPassword: InputField;
  newPassword2: InputField;
  errorLine: ErrorLine;
};

class ChangePasswordPage extends Block<IChangePasswordPageProps, Ref> {
  constructor(props: IChangePasswordPageProps) {
    super({
      ...props,
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
        const newPasswordData: TChangePasswordRequestData = {
          oldPassword: this.refs.oldPassword.value()!,
          newPassword: this.refs.newPassword.value()!,
        };
        changeUserPassword(newPasswordData).catch((error) => this.refs.errorLine.setProps({ error }));
      },
      onBack: () => {
        router.go('/settings');
      },
    });
    initProfilePage();
  }

  protected render(): string {
    const { avatar } = this.props.user || {};
    return `
      <section class="profile">
        <div class="profile__btn-back">
          {{{Button type="arrow-left" onClick=onBack }}}
        </div>
        <div class="profile__content">
          <form class="profile__form" id="password-form">
            <div class="profile__avatar-wrap" style="margin-bottom: 97px">
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
              {{{ ErrorLine error=error ref="errorLine"  type="dialog" }}}
              <ul class="profile__list">
              <li class="profile__item_btn" style="display: flex; justify-content: center">
                {{{Button type="primary" label="Сохранить" onClick=onSubmit}}}
              </li>
            </ul>
          </form>
        </div>
</section>
    `;
  }
}

export default connect(({ user }) => ({ user }))(ChangePasswordPage);
