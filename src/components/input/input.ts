import Block from '../../utils/Block.ts';

interface IInputProps {
  type: string;
  name: string;
  id: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string | '';
  onBlur?: (event: FocusEvent) => void;
  events?: {
    blur?: (event: FocusEvent) => void;
  };
}

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render(): string {
    const { type, name, id, disabled, value, placeholder } = this.props;
    return `
      <input
        class="input__field"
        type="${type}"
        name="${name}"
        id="${id}"
        placeholder="${placeholder ? placeholder : ''}"
        autocomplete="false"
        ${disabled ? 'disabled' : ''}
        value="${value ? value : ''}"
      />`;
  }
}
