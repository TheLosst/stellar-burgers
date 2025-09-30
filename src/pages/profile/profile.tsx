import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logoutUser } from '../../utils/user-slice';
import { AppDispatch } from '../../services/store';
import { TRootReducer } from '../../services/types';

export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: TRootReducer) => state.user);

  const [formValue, setFormValue] = useState({
    name: user.name || '',
    email: user.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isFormChanged) return;

    const updatedData: { name?: string; email?: string; password?: string } =
      {};
    if (formValue.name !== user.name) updatedData.name = formValue.name;
    if (formValue.email !== user.email) updatedData.email = formValue.email;
    if (formValue.password) updatedData.password = formValue.password;

    dispatch(updateUser(updatedData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
