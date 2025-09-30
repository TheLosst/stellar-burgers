import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRootReducer } from 'src/services/types';
import { createOrder, resetNewOrder } from '../../utils/orders-slice';
import { clearConstructor } from '../../utils/burger-slice';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const pickedIngridientsBunTop = useSelector(
    (store: TRootReducer) => store.burgerApi.pickedIngridients.bunTop
  );
  const pickedIngridientsMain = useSelector(
    (store: TRootReducer) => store.burgerApi.pickedIngridients.main
  );

  const user = useSelector((store: TRootReducer) => store.user);
  const orderState = useSelector(
    (store: TRootReducer) => store.orders.newOrder
  );

  const constructorItems = {
    bun: pickedIngridientsBunTop || null,
    ingredients: pickedIngridientsMain
  };

  const orderRequest = orderState.status === 'loading';
  const orderModalData = orderState.order;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    // Проверяем авторизацию
    if (!user.state.isAuthenticated) {
      navigate('/login');
      return;
    }

    // Собираем ID ингредиентов для заказа
    const ingredients = [];
    if (constructorItems.bun) {
      ingredients.push(constructorItems.bun._id);
    }
    constructorItems.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient._id);
    });
    if (constructorItems.bun) {
      ingredients.push(constructorItems.bun._id);
    }

    dispatch(createOrder(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(resetNewOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (pickedIngridientsBunTop ? pickedIngridientsBunTop.price * 2 : 0) +
      pickedIngridientsMain.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [pickedIngridientsBunTop, pickedIngridientsMain]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
