import Block from '../../utils/Block.ts';

interface IAvatarProps {
  size: number;
  img?: string;
}

export class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
  }

  protected render(): string {
    const { img, size } = this.props;
    return `
      <div class="avatar" style="height:${size}px">
        ${img ? `<img src="${img}" alt="аватар пользователя" />` : ''}
      </div>
    `;
  }
}
