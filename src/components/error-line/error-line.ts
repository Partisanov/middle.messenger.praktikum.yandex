import Block from '../../utils/Block.ts';

interface IErrorLineProps {
  error?: string;
}

export class ErrorLine extends Block<IErrorLineProps> {
  constructor(props: IErrorLineProps) {
    super(props);
  }

  protected render(): string {
    const { error } = this.props;
    return `
    <div class="input__validate">${error ? error : ''}</div>
    `;
  }
}
