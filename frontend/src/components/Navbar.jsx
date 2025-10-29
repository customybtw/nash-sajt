import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white font-display text-xl">
            N
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg text-primary">Nash Sajt</p>
            <p className="text-sm text-muted">Modern web experiences</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-secondary ${isActive ? 'text-secondary' : 'text-muted'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/pricing" className="btn-primary text-sm">
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden rounded-full border border-slate-200 p-2 text-slate-600"
          onClick={toggle}
          aria-label="Toggle navigation"
        >
          {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-full px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-secondary/10 text-secondary' : 'text-muted'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/pricing" className="btn-primary text-center" onClick={close}>
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
