import Block from '../../utils/Block.ts';
import { Input } from '../input';
import { ErrorLine } from '../error-line';

interface IInputFieldProps {
  label?: string;
  placeholder?: string;
  id: string;
  name: string;
  type: string;
  mode?: string;
  invalid?: boolean;
  disabled?: boolean;
  value?: string;
  validate?: (value: string) => string | undefined;
  onBlur: () => void;
}

type Ref = {
  input: Input;
  errorLine: ErrorLine;
};

export class InputField extends Block<IInputFieldProps, Ref> {
  constructor(props: IInputFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value(): string | null {
    if (!this.validate()) {
      return null;
    }
    return (this.refs.input.element as HTMLInputElement).value;
  }

  protected render(): string {
    const { label, placeholder, id, name, type, mode, invalid, value, disabled } = this.props;
    return `
            <div class="input ${mode ? `input-${mode}` : ''} ${invalid ? 'invalid' : ''}">
              {{{Input
                  ref="input"
                  onBlur=onBlur
                  type="${type}"
                  id="${id}"
                  value="${value ? value : ''}"
                  disabled=${disabled}
                  placeholder="${placeholder ? placeholder : ''}"
              }}}
              <label class="input__label" for="${name}">${label ? label : ''}</label>
              {{{ ErrorLine error=error ref="errorLine"}}}
            </div>
        `;
  }

  private validate(): boolean | string {
    const value = (this.refs.input.element as HTMLInputElement).value;
    const error = this.props.validate?.(value);
    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }
    this.refs.errorLine.setProps({ error: undefined });
    return true;
  }
}
