import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Link, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to='/' className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ml-2 mr-10 ${
                location.pathname === '/' ? '' : 'text_color_inactive'
              }`}
            >
              Конструктор
            </p>
          </Link>
          <Link to='/feed' className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === '/feed' ? '' : 'text_color_inactive'
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <Link
            to={user?.state?.isAuthenticated ? '/profile' : '/login'}
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}
          >
            <ProfileIcon
              type={
                location.pathname.startsWith('/profile')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname.startsWith('/profile')
                  ? ''
                  : 'text_color_inactive'
              }`}
            >
              {user?.name || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
