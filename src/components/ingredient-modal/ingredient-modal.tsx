import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, IngredientDetails } from '@components';

export const IngredientModal: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleClose = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  if (!id) {
    navigate('/');
    return null;
  }

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetails id={id} />
    </Modal>
  );
};
