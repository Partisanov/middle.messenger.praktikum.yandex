import Block from '../../utils/Block.ts';
import router from '../../Router/Router.ts';

export interface IErrorProps {
  errorNumber: string;
  errorMessage: string;
  onBack: (event: KeyboardEvent | MouseEvent) => void;
}

export class Error extends Block<IErrorProps> {
  constructor(props: IErrorProps) {
    super({
      ...props,
      onBack: (event) => {
        event.preventDefault();
        router.go('/messenger');
      },
    });
  }

  protected render(): string {
    const { errorNumber, errorMessage } = this.props;
    return `
      <div class="error">
        <h2 class="error__title">${errorNumber}</h2>
        <span class="error__message">${errorMessage}</span>
        {{{ Button label="Назад к чатам" type="link" page="messenger" onClick=onBack }}}
      </div>
    `;
  }
}
