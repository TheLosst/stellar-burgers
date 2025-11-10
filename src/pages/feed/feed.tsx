import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../utils/feed-slice';
import {
  selectFeedOrders,
  selectFeedStatus,
  selectFeedError
} from '../../utils/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const status = useSelector(selectFeedStatus);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'failed') {
    return <div>Ошибка загрузки ленты заказов: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
