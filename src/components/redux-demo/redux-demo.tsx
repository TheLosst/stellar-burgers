import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { useSelector } from '../../services/store';

// Импорт всех thunk функций
import { fetchIngredients } from '../../utils/burger-slice';
import { getFeeds } from '../../utils/feed-slice';
import { getUserOrders } from '../../utils/orders-slice';
import { getUser } from '../../utils/user-slice';

// Импорт селекторов
import {
  selectIngredients,
  selectIngredientsStatus,
  selectFeedOrders,
  selectFeedStatus,
  selectUserOrders,
  selectOrdersStatus,
  selectIsAuthenticated,
  selectUser
} from '../../utils/selectors';

/**
 * Демонстрационный компонент для проверки работы Redux store
 * Показывает загрузку данных из всех слайсов
 */
export const ReduxDemo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Селекторы для ингредиентов
  const ingredients = useSelector(selectIngredients);
  const ingredientsStatus = useSelector(selectIngredientsStatus);

  // Селекторы для ленты заказов
  const feedOrders = useSelector(selectFeedOrders);
  const feedStatus = useSelector(selectFeedStatus);

  // Селекторы для заказов пользователя
  const userOrders = useSelector(selectUserOrders);
  const ordersStatus = useSelector(selectOrdersStatus);

  // Селекторы для пользователя
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Загружаем ингредиенты
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients());
    }

    // Загружаем ленту заказов
    dispatch(getFeeds());

    // Пытаемся получить данные пользователя
    dispatch(getUser());

    // Если пользователь авторизован, загружаем его заказы
    if (isAuthenticated) {
      dispatch(getUserOrders());
    }
  }, [dispatch, ingredientsStatus, isAuthenticated]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Redux Store Demo - Stellar Burgers</h1>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        {/* Секция ингредиентов */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px'
          }}
        >
          <h2>🍔 Ингредиенты</h2>
          <p>
            <strong>Статус:</strong> {ingredientsStatus}
          </p>
          <p>
            <strong>Булки:</strong> {ingredients.buns.length}
          </p>
          <p>
            <strong>Начинки:</strong> {ingredients.mains.length}
          </p>
          <p>
            <strong>Соусы:</strong> {ingredients.sauces.length}
          </p>

          {ingredientsStatus === 'loading' && (
            <p>⏳ Загружаем ингредиенты...</p>
          )}
          {ingredientsStatus === 'succeeded' && (
            <div>
              <p>✅ Ингредиенты загружены успешно!</p>
              <details>
                <summary>Первые 3 булки:</summary>
                <ul>
                  {ingredients.buns.slice(0, 3).map((bun) => (
                    <li key={bun._id}>
                      {bun.name} - {bun.price}₽
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          )}
          {ingredientsStatus === 'failed' && (
            <p>❌ Ошибка загрузки ингредиентов</p>
          )}
        </div>

        {/* Секция ленты заказов */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px'
          }}
        >
          <h2>📋 Лента заказов</h2>
          <p>
            <strong>Статус:</strong> {feedStatus}
          </p>
          <p>
            <strong>Заказов в ленте:</strong> {feedOrders.length}
          </p>

          {feedStatus === 'loading' && <p>⏳ Загружаем ленту заказов...</p>}
          {feedStatus === 'succeeded' && (
            <div>
              <p>✅ Лента заказов загружена!</p>
              <details>
                <summary>Последние 3 заказа:</summary>
                <ul>
                  {feedOrders.slice(0, 3).map((order) => (
                    <li key={order._id}>
                      #{order.number} - {order.name}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          )}
          {feedStatus === 'failed' && <p>❌ Ошибка загрузки ленты</p>}
        </div>

        {/* Секция пользователя */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px'
          }}
        >
          <h2>👤 Пользователь</h2>
          <p>
            <strong>Авторизован:</strong> {isAuthenticated ? '✅ Да' : '❌ Нет'}
          </p>
          {isAuthenticated ? (
            <div>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Имя:</strong> {user.name}
              </p>
            </div>
          ) : (
            <p>Пользователь не авторизован</p>
          )}
        </div>

        {/* Секция заказов пользователя */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '8px'
          }}
        >
          <h2>🛍️ Заказы пользователя</h2>
          <p>
            <strong>Статус:</strong> {ordersStatus}
          </p>
          <p>
            <strong>Заказов:</strong> {userOrders.length}
          </p>

          {!isAuthenticated && <p>🔒 Необходима авторизация</p>}
          {isAuthenticated && ordersStatus === 'loading' && (
            <p>⏳ Загружаем заказы...</p>
          )}
          {isAuthenticated && ordersStatus === 'succeeded' && (
            <div>
              <p>✅ Заказы пользователя загружены!</p>
              {userOrders.length > 0 ? (
                <details>
                  <summary>Заказы:</summary>
                  <ul>
                    {userOrders.slice(0, 3).map((order) => (
                      <li key={order._id}>
                        #{order.number} - {order.name}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <p>Заказов пока нет</p>
              )}
            </div>
          )}
          {isAuthenticated && ordersStatus === 'failed' && (
            <p>❌ Ошибка загрузки заказов</p>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px'
        }}
      >
        <h3>🎯 Статус Redux Store</h3>
        <p>
          ✅ <strong>RootReducer:</strong> Настроен и работает
        </p>
        <p>
          ✅ <strong>Thunk функции:</strong> Созданы для всех API методов
        </p>
        <p>
          ✅ <strong>Селекторы:</strong> Настроены для всех слайсов
        </p>
        <p>
          ✅ <strong>Loading states:</strong> Реализованы во всех слайсах
        </p>
        <p>
          ✅ <strong>Error handling:</strong> Добавлена обработка ошибок
        </p>

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>
            <strong>Функциональность:</strong>
          </p>
          <ul>
            <li>Загрузка ингредиентов из API</li>
            <li>Получение ленты заказов</li>
            <li>Аутентификация пользователя</li>
            <li>Загрузка заказов пользователя</li>
            <li>Создание новых заказов</li>
            <li>Получение деталей заказа</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
