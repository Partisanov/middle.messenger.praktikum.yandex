import Block from '../../utils/Block.ts';

interface ISearchProps {
  label: string;
}

export class SearchField extends Block<ISearchProps> {
  constructor(props: ISearchProps) {
    super(props);
  }

  protected render(): string {
    const { label } = this.props;
    return `
      <div class="search">
        <input class="search__input" type="text" name="search" id="search" placeholder="" />
        <label class="search__label" for="search">${label}</label>
        <div class="search__icon"></div>
      </div>`;
  }
}
