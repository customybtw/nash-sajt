import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

const socials = [
  { icon: <FiFacebook />, href: 'https://facebook.com' },
  { icon: <FiInstagram />, href: 'https://instagram.com' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com' },
  { icon: <FiMail />, href: 'mailto:hello@example.com' }
];

const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950 py-12 text-sm text-slate-400">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-4">
        <div className="font-display text-2xl text-slate-100">Nash Sajt Studio</div>
        <p className="max-w-sm">
          We craft performant, secure, and SEO-driven digital experiences for individuals and growing businesses.
        </p>
        <div className="flex items-center gap-3 text-lg text-slate-100">
          {socials.map((item, index) => (
            <a key={index} href={item.href} className="rounded-full border border-white/10 p-2 transition hover:border-accent hover:text-accent">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-semibold text-slate-200">Company</div>
          <ul className="space-y-2">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-semibold text-slate-200">Support</div>
          <ul className="space-y-2">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="mailto:hello@example.com">Help Center</a></li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="font-semibold text-slate-200">Legal</div>
          <ul className="space-y-2">
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 max-w-7xl px-4 text-xs text-slate-500">
      © {new Date().getFullYear()} Nash Sajt Studio. Built with love in Europe.
    </div>
  </footer>
);

export default Footer;
