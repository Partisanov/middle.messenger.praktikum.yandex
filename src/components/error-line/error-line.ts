import Block from '../../utils/Block.ts';

interface IErrorLineProps {
  error?: string;
  type?: string;
}

export class ErrorLine extends Block<IErrorLineProps> {
  constructor(props: IErrorLineProps) {
    super(props);
  }

  protected render(): string {
    const { error, type } = this.props;
    return `
    <div class="input__validate ${type ? `input__validate-${type}` : ''}">${error ? error : ''}</div>
    `;
  }
}
