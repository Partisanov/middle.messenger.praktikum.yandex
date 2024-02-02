import Block from '../../utils/Block.ts';
import { ErrorLine } from '../error-line';
import { InputField } from '../input-field';
import { connect } from '../../utils/connect.ts';

interface Props {
  isOpenDialogCreateChat: boolean;
  onSave: () => void;
  onClose: () => void;
  error: string;
}

type Ref = {
  chatName: InputField;
  error: ErrorLine;
};

export class DialogCreateChat extends Block<Props, Ref> {
  constructor(props: Props) {
    super({ ...props });
  }

  public getChatName() {
    return this.refs.chatName.value();
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  protected render(): string {
    return `
      {{#Dialog open=isOpenDialogCreateChat}}
        <form method="dialog" class="form-dialog">
          {{{ Title text="Добавить пользователя"}}}
          {{{ InputField
            label="Логин"
            id="login"
            name="chatName"
            type="text"
            mode="float"
            ref="chatName"
            validate=validate.login
          }}}
          <div style="position: relative">{{{ ErrorLine error=error ref="error"}}}</div>
          <div style="margin-top: auto">
            {{{ Button label="Создать" type="primary" onClick=onSave }}}
            {{{ Button label="Отменить" type="link"  onClick=onClose }}}
          </div>
        </form>
      {{/Dialog}}
    `;
  }
}

export const withStoreDialogCreateChat = connect((state) => ({ isOpenDialogCreateChat: state.isOpenDialogCreateChat }))(
  DialogCreateChat,
);
