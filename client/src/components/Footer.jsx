import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm.jsx';

const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-display text-2xl font-semibold text-dark">
          <span className="rounded-full bg-primary/10 p-2 text-primary">NS</span>
          Nash Sajt
        </div>
        <p className="mt-4 max-w-md text-sm text-slate-600">
          We craft bespoke, SEO-optimized websites backed by a powerful admin dashboard so you can manage your brand, services,
          and digital sales without technical hurdles.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-dark">Company</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>
            <Link to="/about" className="transition hover:text-primary">
              About us
            </Link>
          </li>
          <li>
            <Link to="/services" className="transition hover:text-primary">
              Services
            </Link>
          </li>
          <li>
            <Link to="/careers" className="transition hover:text-primary">
              Careers
            </Link>
          </li>
          <li>
            <Link to="/blog" className="transition hover:text-primary">
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-dark">Stay in the loop</h3>
        <p className="mt-4 text-sm text-slate-600">
          Subscribe to insights on growth-driven design, SEO best practices, and launch checklists.
        </p>
        <NewsletterForm variant="compact" />
      </div>
    </div>
    <div className="border-t border-slate-200 bg-slate-50 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 md:flex-row">
        <span>© {new Date().getFullYear()} Nash Sajt. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="transition hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition hover:text-primary">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
