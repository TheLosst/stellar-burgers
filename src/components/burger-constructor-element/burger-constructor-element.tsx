import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import store from '../../services/store';
import {
  moveUpMainItem,
  moveDownMainItem,
  removeMainItem
} from '../../utils/burger-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const handleMoveDown = () => {
      store.dispatch(moveDownMainItem(ingredient));
    };

    const handleMoveUp = () => {
      store.dispatch(moveUpMainItem(ingredient));
    };

    const handleClose = () => {
      store.dispatch(removeMainItem(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
