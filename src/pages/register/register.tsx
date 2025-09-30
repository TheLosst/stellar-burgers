import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../utils/user-slice';
import { AppDispatch } from '../../services/store';
import { TRootReducer } from '../../services/types';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { state: userState } = useSelector((state: TRootReducer) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!userName || !email || !password) return;

    dispatch(registerUser({ email, name: userName, password }))
      .unwrap()
      .then(() => {
        // После успешной регистрации перенаправляем на главную страницу
        navigate('/', { replace: true });
      })
      .catch(() => {
        // Ошибка обрабатывается в Redux
      });
  };

  return (
    <RegisterUI
      errorText={userState.registerError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
