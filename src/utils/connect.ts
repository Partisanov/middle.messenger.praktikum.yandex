import { TAppState } from '../type.ts';
import Block, { RefType } from './Block.ts';
import { isEqual } from '../helpers/isEqual.ts';
import { StoreEvents } from '../Store/Store.ts';

export function connect(mapStateToProps: (state: TAppState) => Partial<TAppState>) {
  return function <P extends object, R extends RefType>(Component: typeof Block<P, R>) {
    return class extends Component {
      private readonly onChangeStoreCallback: () => void;

      constructor(props: P) {
        const store = window.store;
        // сохраняем начальное состояние
        let state: Partial<TAppState> = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
