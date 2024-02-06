import { searchUser } from '../../services/user.ts';
import Block from '../../utils/Block.ts';

interface ISearchProps {
  label: string;
  events?: {
    input?: (event: Event) => void;
  };
}

export class SearchField extends Block<ISearchProps> {
  private timeout: NodeJS.Timeout | null = null;

  constructor(props: ISearchProps) {
    super({
      ...props,
      events: {
        input: (event) => {
          const inputValue = (event.target as HTMLInputElement).value;
          if (this.timeout) {
            clearTimeout(this.timeout);
          }

          this.timeout = setTimeout(async () => {
            if (inputValue !== '') {
              const searchUserResult = await searchUser({ login: inputValue });
              this.updateDatalist(searchUserResult);
              this.timeout = null;
            }
          }, 2000);
        },
      },
    });
  }

  protected render(): string {
    const { label } = this.props;
    return `
      <div class="search">
        <input class="search__input" type="text" name="search" id="search" placeholder="" list="search-list"/>
        <label class="search__label" for="search">${label}</label>
        <div class="search__icon"></div>
        <datalist id="search-list"></datalist>
      </div>`;
  }

  private updateDatalist(data: any) {
    const datalist = document.getElementById('search-list');
    if (datalist) {
      datalist.innerHTML = '';
      data.forEach((result: any) => {
        const option = document.createElement('option');
        option.value = `${result.login} id: ${result.id} ФИ: ${result.second_name} ${result.first_name}`;
        datalist.appendChild(option);
      });
    }
  }
}
