# Nash Sajt Platform

A full-stack starter for delivering professional, SEO-optimized websites with an intuitive admin panel backed by MySQL. The
platform includes a React/Tailwind marketing site, Express API, MySQL data models (via Sequelize), and tooling for managing
pages, pricing, gallery assets, e-commerce products, newsletters, and more.

## Features

### Frontend
- Modern React (Vite) single-page application with Tailwind styling and animation via Framer Motion.
- SEO-ready structure powered by `react-helmet-async`, semantic routes, and optimized metadata.
- Dynamic sections for About, Pricing, Portfolio, Careers, and Blog fed by the API.
- Newsletter capture, contact form, and CTA components wired to backend endpoints.
- Responsive design system suitable for individuals and small businesses.

### Backend
- Node.js + Express API with structured routing, validation, and error handling.
- Sequelize models for content management, pricing plans, portfolio, blog, careers, products, orders, domains, analytics, and
  subscriptions.
- JWT authentication, role-based access checks, and utilities for future admin interfaces.
- Contact form email notifications (via Nodemailer) and newsletter subscription endpoints.
- Seed script that provisions default admin account, starter content, and pricing tiers.

### Admin & Operations
- Endpoints to manage page sections, gallery assets, pricing plans, products, orders, domains/hosting, analytics integrations,
  newsletter lists, and customer subscriptions.
- Career application handling, job listings, and blog publishing flows.
- Payment placeholders for Stripe and PayPal integrations.

## Getting Started

### Requirements
- Node.js 18+
- MySQL 8+

### Backend setup
```bash
cd server
cp .env.example .env
# Update database credentials and mail provider settings
npm install
npm run seed  # syncs database & seeds starter content
npm run dev   # start Express API on http://localhost:5000
```

### Frontend setup
```bash
cd client
npm install
npm run dev  # starts Vite dev server on http://localhost:5173
```

Create a `.env` in `client` if you want to point to a remote API:
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure
```
client/    # React marketing site
server/    # Express API + Sequelize models
```

## Scripts
- `npm run dev` (server) – start API with nodemon.
- `npm run seed` (server) – sync database schema and seed starter data.
- `npm run dev` (client) – start Vite dev server.
- `npm run build` (client) – production build output in `client/dist`.

## Security & SEO Considerations
- Helmet, CORS, compression, and JWT auth scaffolding included.
- SEO metadata, clean URLs, alt tags, and structured content ready for search engines.
- HTTPS, role-based access, and audit-ready logging recommended for production deployment.

## Licensing
MIT License.
