import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="rounded-full bg-accent px-2 py-1 text-sm text-slate-950">Nash</span>
          <span>Sajt Studio</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium uppercase tracking-wide md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-accent ${isActive ? 'text-accent' : 'text-slate-300'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="rounded-full border border-accent px-4 py-2 text-accent transition hover:bg-accent hover:text-slate-950"
            href="#pricing"
          >
            Plans
          </a>
        </nav>
        <button
          onClick={() => setOpen((state) => !state)}
          className="rounded-full border border-white/10 p-2 text-xl text-slate-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-4 text-sm font-medium uppercase tracking-wide">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition hover:bg-white/10 ${isActive ? 'text-accent' : 'text-slate-300'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2 text-accent transition hover:bg-accent hover:text-slate-950"
            >
              Plans
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
