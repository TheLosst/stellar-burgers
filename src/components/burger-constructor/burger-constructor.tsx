import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { TRootReducer } from 'src/services/types';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const pickedIngridientsBunTop = useSelector(
    (store: TRootReducer) => store.burgerApi.pickedIngridients.bunTop
  );
  const pickedIngridientsMain = useSelector(
    (store: TRootReducer) => store.burgerApi.pickedIngridients.main
  );

  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (pickedIngridientsBunTop ? pickedIngridientsBunTop.price * 2 : 0) +
      pickedIngridientsMain.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        bun: pickedIngridientsBunTop,
        ingredients: pickedIngridientsMain
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
