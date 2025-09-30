import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../utils/user-slice';
import { clearConstructor } from '../../utils/burger-slice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(clearConstructor());
      navigate('/');
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
