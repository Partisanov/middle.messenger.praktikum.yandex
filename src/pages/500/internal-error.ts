import Block from '../../utils/Block.ts';
import { IErrorProps } from '../../components/error/error.ts';

export class InternalErrorPage extends Block<IErrorProps> {
  static name = 'InternalErrorPage';

  protected render(): string {
    return '{{{ Error errorNumber="500" errorMessage="Мы уже фиксим"  }}}';
  }
}
