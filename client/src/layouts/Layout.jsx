import PropTypes from 'prop-types';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Layout = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-slate-50">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
