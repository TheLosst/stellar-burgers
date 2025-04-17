import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootReducer } from 'src/services/types';
import { TIngredient } from '@utils-types';

interface IngredientDetailsProps {
  id: string;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({ id }) => {
  /** TODO: взять переменную из стора */

  const [ingredientData, setIngredientData] = useState<
    TIngredient | undefined
  >();
  const ingredientList = useSelector(
    (store: TRootReducer) => store.burgerApi.ingredientList
  );
  useEffect(() => {
    if (ingredientList?.length) {
      setIngredientData(ingredientList.find((ele) => ele._id === id));
    }
  }, [id, ingredientList]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
