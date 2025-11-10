import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect, useState } from 'react';

export const ConstructorPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isIngredientsLoading = useSelector(
    (store) => store.burgerApi.ingredientsStatus
  );

  useEffect(() => {
    if (isLoading && isIngredientsLoading === 'succeeded') {
      setIsLoading(false);
    }
  }, [isIngredientsLoading, isLoading]);
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
