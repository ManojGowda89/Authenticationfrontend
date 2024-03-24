
import {Link} from 'react-router-dom';
export default function PageNotFound() {
  return (
    <div className="container text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable,</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
