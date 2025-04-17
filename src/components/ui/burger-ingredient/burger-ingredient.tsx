import React, { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        {isOpen && (
          <Modal
            title='Детали ингредиента'
            onClose={() => {
              setIsOpen(false);
            }}
            children={<IngredientDetails id={_id} />}
          />
        )}
        <li className={styles.container}>
          {/* <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        > */}
          {count && <Counter count={count} />}
          <img
            className={styles.img}
            src={image}
            alt='картинка ингредиента.'
            onClick={() => setIsOpen(true)}
          />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
          {/* </Link> */}
          <AddButton
            text='Добавить'
            onClick={handleAdd}
            extraClass={`${styles.addButton} mt-8`}
          />
        </li>
      </>
    );
  }
);
