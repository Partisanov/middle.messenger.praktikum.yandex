import Block from '../../utils/Block.ts';
import { ErrorLine } from '../error-line';

import { connect } from '../../utils/connect.ts';
import { InputFileAvatar } from '../input-file-avatar';

interface Props {
  isOpenDialogChangeAvatar: boolean;
  onSave: () => void;
  onClose: () => void;
  error: string;
}

type Ref = {
  error: ErrorLine;
  inputFile: InputFileAvatar;
};

export class DialogChangeAvatar extends Block<Props, Ref> {
  constructor(props: Props) {
    super({ ...props });
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  public reset() {
    this.refs.inputFile.reset();
  }

  public getFile() {
    return this.refs.inputFile.getFile();
  }

  protected render(): string {
    return `
      {{#Dialog open=isOpenDialogChangeAvatar}}
        <form method="dialog" class="form-dialog">
          {{{ Title text="Загрузите файл"}}}
          {{{ InputFileAvatar
            id="avatar"
            label=""
            name="avatar" 
            ref="inputFile"
            accept=".jpeg, .jpg, .png, .gif, .webp"
          }}}
          {{{ ErrorLine error=error ref="error" type="dialog" }}}
          <div style="margin-top: auto">
            {{{ Button label="Поменять" type="primary" onClick=onSave }}}
            {{{ Button label="Отменить" type="link"  onClick=onClose }}}
          </div>
        </form>
      {{/Dialog}}
    `;
  }
}

export const withStoreDialogChangeAvatar = connect((state) => ({
  isOpenDialogChangeAvatar: state.isOpenDialogChangeAvatar,
}))(DialogChangeAvatar);
