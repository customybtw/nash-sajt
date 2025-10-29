import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function PageWrapper({ children, title, description }) {
  document.title = title ? `${title} • Nash Sajt` : 'Nash Sajt';
  if (description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }
  return <MainLayout>{children}</MainLayout>;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageWrapper title="Professional websites for small businesses" description="SEO optimized websites with admin panel">
            <Home />
          </PageWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <PageWrapper title="About Nash Sajt" description="Learn more about our studio and approach">
            <About />
          </PageWrapper>
        }
      />
      <Route
        path="/gallery"
        element={
          <PageWrapper title="Portfolio" description="Browse recent projects and creative work">
            <Gallery />
          </PageWrapper>
        }
      />
      <Route
        path="/pricing"
        element={
          <PageWrapper title="Pricing" description="Compare subscription plans for your website">
            <Pricing />
          </PageWrapper>
        }
      />
      <Route
        path="/services"
        element={
          <PageWrapper title="Services" description="Development, marketing and design services for ambitious brands">
            <Services />
          </PageWrapper>
        }
      />
      <Route
        path="/blog"
        element={
          <PageWrapper title="Blog" description="SEO and marketing insights from Nash Sajt">
            <Blog />
          </PageWrapper>
        }
      />
      <Route
        path="/careers"
        element={
          <PageWrapper title="Careers" description="Join the Nash Sajt collective">
            <Careers />
          </PageWrapper>
        }
      />
      <Route
        path="/contact"
        element={
          <PageWrapper title="Contact" description="Request a project or support">
            <Contact />
          </PageWrapper>
        }
      />
      <Route
        path="/terms"
        element={
          <PageWrapper title="Terms and conditions">
            <Terms />
          </PageWrapper>
        }
      />
      <Route
        path="/privacy"
        element={
          <PageWrapper title="Privacy policy">
            <Privacy />
          </PageWrapper>
        }
      />
    </Routes>
  );
}
