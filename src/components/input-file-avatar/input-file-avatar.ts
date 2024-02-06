import Block from '../../utils/Block.ts';

import { ErrorLine } from '../error-line';
import { InputFile } from '../input-file';

interface Props {
  label?: string;
  id: string;
  name: string;
  disabled?: boolean;
  accept?: string;
}

type Ref = {
  inputFile: InputFile;
  errorLine: ErrorLine;
  labelElement: HTMLElement;
};

export class InputFileAvatar extends Block<Props, Ref> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public getFile() {
    const inputFile = this.refs.inputFile.element as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      return inputFile.files[0];
    } else {
      return null;
    }
  }

  public reset() {
    const inputFile = this.refs.inputFile.element as HTMLInputElement;
    const labelElement = this.refs.labelElement;

    if (labelElement) {
      labelElement.innerText = `${this.props.label}`;
      labelElement.classList.remove('file-name');
    }

    if (inputFile) {
      inputFile.files = null;
    }
  }

  protected render(): string {
    const { label, id, name, disabled, accept } = this.props;
    return `
            <div>
              {{{InputFile
                  ref="inputFile"
                  id="${id}"
                  disabled=${disabled}
                  accept="${accept ? accept : ''}"
                  name="${name}"
              }}}
              <label class="input-file__label" for="${id}" ref="labelElement">${label ? label : ''}</label>
              {{{ ErrorLine error=error ref="errorLine"}}}
            </div>
        `;
  }
}
