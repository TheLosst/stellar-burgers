import { AppDispatch, useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect, useState } from 'react';
import { TRootReducer } from '../../services/types';
import { fetchIngredients } from '../../utils/burger-slice';

export const ConstructorPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isIngredientsLoading = useSelector(
    (store: TRootReducer) => store.burgerApi.ingredientsStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  useEffect(() => {
    if (isLoading && isIngredientsLoading === 'succeeded') {
      setIsLoading(false);
    }
  }, [isIngredientsLoading]);
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
