import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://linkedin.com', icon: <FaLinkedinIn />, label: 'LinkedIn' },
  { href: 'mailto:hello@nash-sajt.com', icon: <FaEnvelope />, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
        <div>
          <p className="font-display text-xl text-primary">Nash Sajt</p>
          <p className="mt-3 text-sm text-muted">
            Crafting professional, high-performing websites that help individuals and small businesses grow online.
          </p>
        </div>
        <div>
          <p className="font-semibold text-primary">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-primary">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-primary">Stay in touch</p>
          <p className="mt-3 text-sm text-muted">Subscribe for insights and growth tips.</p>
          <form
            className="mt-4 flex gap-2"
            action="https://formsubmit.co/hello@nash-sajt.com"
            method="POST"
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-secondary focus:outline-none"
              required
            />
            <button type="submit" className="btn-primary">
              Join
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-secondary transition hover:bg-secondary hover:text-white"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-muted">
        © {new Date().getFullYear()} Nash Sajt. All rights reserved.
      </div>
    </footer>
  );
}
