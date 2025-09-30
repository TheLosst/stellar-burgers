import { FC, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { AppDispatch } from '../../services/store';
import { getOrderByNumber } from '../../utils/orders-slice';
import {
  selectOrderDetails,
  selectOrderDetailsStatus,
  selectOrderDetailsError,
  selectIngredientList
} from '../../utils/selectors';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  // Получаем номер заказа из pathname
  const number = useMemo(() => {
    const match = location.pathname.match(/\/(?:feed|profile\/orders)\/(\d+)$/);
    return match ? match[1] : null;
  }, [location.pathname]);

  const orderDetails = useSelector(selectOrderDetails);
  const orderData = orderDetails?.order;
  const orderStatus = useSelector(selectOrderDetailsStatus);
  const orderError = useSelector(selectOrderDetailsError);
  const ingredients: TIngredient[] = useSelector(selectIngredientList);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(parseInt(number)));
    }
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const order = orderData;
    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item) => acc + item.price * item.count,
      0
    );

    const result = {
      ...order,
      ingredientsInfo,
      date,
      total
    };

    return result;
  }, [orderData, ingredients]);
  if (orderStatus === 'loading') {
    return <Preloader />;
  }

  if (orderStatus === 'failed') {
    return <div>Ошибка загрузки заказа: {orderError}</div>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
