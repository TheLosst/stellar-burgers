import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../utils/orders-slice';
import { AppDispatch } from '../../services/store';
import { selectUserOrders } from '../../utils/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
