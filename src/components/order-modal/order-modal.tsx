import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { resetOrderDetails } from '../../utils/orders-slice';

export const OrderModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetOrderDetails()); // Очищаем данные заказа

    // Если есть background, возвращаемся на него, иначе на -1
    const background = location.state?.background;
    if (background) {
      navigate(background.pathname);
    } else {
      navigate(-1);
    }
  };

  return (
    <Modal title='Информация о заказе' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};
