import { useAppSelector } from '.';
import { AuthorizationStatus, NameSpace } from '../const';

function useAuthorizationStatus() {
  const authorizationStatus = useAppSelector(
    (state) => state[NameSpace.User].authorizationStatus
  );

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const isUnknown = authorizationStatus === AuthorizationStatus.Unknown;

  const isNoAuth = authorizationStatus === AuthorizationStatus.NoAuth;

  return { isAuth, isUnknown, isNoAuth };
}

export { useAuthorizationStatus };
