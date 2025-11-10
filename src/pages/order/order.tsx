import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfo } from '@components';

export const OrderPage: FC = () => {
  const { number } = useParams<{ number: string }>();

  return (
    <div style={{ marginTop: '120px' }}>
      <OrderInfo />
    </div>
  );
};
