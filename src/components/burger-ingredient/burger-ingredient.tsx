import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import store from '../../services/store';
import { useSelector } from 'react-redux';
import { TRootReducer } from 'src/services/types';
import { setBunBottom, setBunTop, addMainItem } from '../../utils/burger-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        store.dispatch(setBunTop(ingredient));
      } else {
        store.dispatch(addMainItem(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
