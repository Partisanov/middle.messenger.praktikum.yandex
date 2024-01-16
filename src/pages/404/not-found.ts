import Block from '../../utils/Block.ts';
import { IErrorProps } from '../../components/error/error.ts';

export class NotFoundPage extends Block<IErrorProps> {
  static name = 'NotFoundPage';

  protected render(): string {
    return '{{{ Error errorNumber="404" errorMessage="Не туда попали" }}}';
  }
}
