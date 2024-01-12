import Block from '../../utils/Block.ts';
import { IErrorProps } from '../../components/error/error.ts';

export class ErrorPage extends Block<IErrorProps> {
  constructor(props: IErrorProps) {
    super(props);
  }

  protected render(): string {
    const { errorNumber, errorMessage } = this.props;
    return `
      <div class="container">
        {{{ Error errorNumber=${errorNumber} errorMessage=${errorMessage} }}}
      </div>
    `;
  }
}
