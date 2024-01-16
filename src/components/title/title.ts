import Block from '../../utils/Block.ts';

interface ITitleProps {
  text?: string;
}

export class Title extends Block<ITitleProps> {
  constructor(props: ITitleProps) {
    super(props);
  }

  protected render(): string {
    const { text } = this.props;
    return `<h2 class="title">${text ? text : ''}</h2>`;
  }
}
