import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../utils/user-slice';
import { useDispatch, useSelector } from '../../services/store';
import { TRootReducer } from '../../services/types';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { state: userState } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Перенаправляем на страницу, с которой пришел пользователь, или на главную
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch(() => {
        // Ошибка обрабатывается в Redux
      });
  };

  return (
    <LoginUI
      errorText={userState.loginError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
