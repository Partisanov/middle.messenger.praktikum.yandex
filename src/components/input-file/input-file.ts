import Block from '../../utils/Block.ts';

interface IInputProps {
  name: string;
  id: string;
  disabled?: boolean;
  accept: string | '';
}

type Ref = {
  input: HTMLElement;
};

export class InputFile extends Block<IInputProps, Ref> {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    const { name, id, disabled, accept } = this.props;
    return `
      <input
        class="input-file"
        type="file"
        name="${name}"
        id="${id}"
        ${disabled ? 'disabled' : ''}
        accept="${accept ? accept : ''}"
        ref="input"
      />`;
  }
}
