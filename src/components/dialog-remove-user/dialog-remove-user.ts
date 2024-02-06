import Block from '../../utils/Block.ts';
import { ErrorLine } from '../error-line';
import { InputField } from '../input-field';
import { connect } from '../../utils/connect.ts';

interface Props {
  isOpenDialogRemoveUser: boolean;
  onRemoveUser: () => void;
  onClose: () => void;
  error: string;
}

type Ref = {
  login: InputField;
  error: ErrorLine;
};

export class DialogRemoveUser extends Block<Props, Ref> {
  constructor(props: Props) {
    super({ ...props });
  }

  public getLogin() {
    return this.refs.login.value();
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  protected render(): string {
    return `
      {{#Dialog open=isOpenDialogRemoveUser}}
        <form method="dialog" class="form-dialog">
          {{{ Title text="Удалить пользователя"}}}
          {{{ InputField
            label="Логин"
            id="login"
            name="login"
            type="text"
            mode="float"
            ref="login"
            validate=validate.login
          }}}
          {{{ ErrorLine error=error ref="error" type="dialog" }}}
          <div style="margin-top: auto">
            {{{ Button label="Удалить" type="primary" onClick=onRemoveUser }}}
            {{{ Button label="Отменить" type="link"  onClick=onClose }}}
          </div>
        </form>
      {{/Dialog}}
    `;
  }
}

export const withStoreDialogRemoveUser = connect((state) => ({ isOpenDialogRemoveUser: state.isOpenDialogRemoveUser }))(
  DialogRemoveUser,
);
