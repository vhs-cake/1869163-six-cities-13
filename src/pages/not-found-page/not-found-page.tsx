import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <Fragment>
      <Helmet>
        <title>ERROR 404</title>
      </Helmet>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </Fragment>
  );
}

export default NotFoundPage;
