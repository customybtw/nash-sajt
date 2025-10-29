import { Link } from 'react-router-dom';
import NewsletterForm from './NewsletterForm.jsx';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="section-container grid gap-8 py-12 md:grid-cols-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900">Nash Studio</h3>
        <p className="mt-3 text-sm text-slate-600">
          Bespoke websites, ecommerce experiences, and marketing systems that help founders and
          small teams grow with confidence.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Explore</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            <Link to="/pricing" className="transition hover:text-brand-600">
              Pricing Plans
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="transition hover:text-brand-600">
              Portfolio & Gallery
            </Link>
          </li>
          <li>
            <Link to="/careers" className="transition hover:text-brand-600">
              Careers
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Support</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            <Link to="/terms" className="transition hover:text-brand-600">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="transition hover:text-brand-600">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/contact" className="transition hover:text-brand-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Stay in the loop</h4>
        <p className="mt-3 text-sm text-slate-600">
          Receive growth tips, UI inspiration, and launch announcements directly in your inbox.
        </p>
        <NewsletterForm compact />
      </div>
    </div>
    <div className="border-t border-slate-200 py-6">
      <div className="section-container flex flex-col justify-between text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Nash Studio. All rights reserved.</span>
        <span>Crafted with strategy, performance, and SEO best practices.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
