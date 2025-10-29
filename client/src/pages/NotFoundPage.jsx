import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => (
  <div className="bg-white">
    <Helmet>
      <title>Page not found | Nash Studio</title>
    </Helmet>
    <section className="section-container py-32 text-center">
      <h1 className="font-display text-6xl font-bold text-slate-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">
        We couldn’t find the page you were looking for. Explore the site using the navigation above.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Return home
      </Link>
    </section>
  </div>
);

export default NotFoundPage;
