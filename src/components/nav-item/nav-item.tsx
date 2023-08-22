import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';
import { NameSpace } from '../../const';

function Navigation(): JSX.Element {
  const { isAuth, isUnknown, isNoAuth } = useAuthorizationStatus();

  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state[NameSpace.User].email);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {isUnknown && (
            <Link
              to="/login"
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          )}

          {isNoAuth && (
            <Link
              to="/login"
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          )}

          {isAuth && (
            <Link
              to="/favorites"
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{email}</span>
              <span className="header__favorite-count">3</span>
            </Link>
          )}
        </li>
        {isAuth && (
          <li className="header__nav-item">
            <Link className="header__nav-link" to="#">
              <span onClick={handleLogout} className="header__signout">
                Sign out
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
