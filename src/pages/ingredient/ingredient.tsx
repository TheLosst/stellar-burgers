import { FC } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IngredientDetails } from '@components';

export const IngredientPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to='/' replace />;
  }

  return (
    <div>
      <h1>Детали ингредиента</h1>
      <IngredientDetails id={id} />
    </div>
  );
};
