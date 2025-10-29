import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage }) => (
  <section className="relative overflow-hidden">
    {backgroundImage && (
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
    )}
    <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-20 sm:py-24 lg:py-32">
      <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">
        Full-stack digital studio
      </span>
      <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-slate-300">{subtitle}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={ctaPrimary?.href || '/contact'}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-accent/80"
        >
          {ctaPrimary?.label || 'Book a discovery call'}
        </Link>
        <Link
          to={ctaSecondary?.href || '/pricing'}
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-200 transition hover:border-accent hover:text-accent"
        >
          {ctaSecondary?.label || 'Explore pricing'}
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
