import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <div className="section-container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-xl font-semibold text-slate-900">Nash Studio</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-brand-600 ${isActive ? 'text-brand-700' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/pricing" className="btn-secondary">
            Plans
          </Link>
          <Link to="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full p-2 text-slate-600 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="section-container flex flex-col py-4 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition hover:bg-slate-100 ${
                    isActive ? 'text-brand-600' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary mt-4 w-full justify-center" onClick={() => setIsOpen(false)}>
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
