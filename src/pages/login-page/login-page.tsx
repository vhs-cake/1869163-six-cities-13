import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { processErrorHandle } from '../../services/process-error-handle';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (passwordRef.current) {
      const password = passwordRef.current.value;
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (loginRef.current !== null) {
        if (!hasLetter || !hasNumber) {
          setPasswordError(
            'Password must contain at least 1 letter and 1 number'
          );
          processErrorHandle(passwordError);
          return;
        }

        setPasswordError('');
        dispatch(
          loginAction({
            login: loginRef.current.value,
            password: passwordRef.current.value,
          })
        );
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={false}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={false}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
