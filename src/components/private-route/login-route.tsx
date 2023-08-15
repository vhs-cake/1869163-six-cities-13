import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';

type LoginRouteProps = {
  children: JSX.Element;
};

function LoginRoute({ children }: LoginRouteProps): JSX.Element {
  const { isAuth } = useAuthorizationStatus();

  return isAuth ? <Navigate to={AppRoute.Root} /> : children;
}

export default LoginRoute;
