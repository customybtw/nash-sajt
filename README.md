# Nash Sajt – Full-stack marketing website platform

This project delivers a modern, SEO-focused marketing website with an accompanying admin panel and e-commerce capabilities backed by MySQL. It targets freelancers and small businesses that require a professional presence, subscription-based pricing options, newsletter tooling, and extensible content management.

## Monorepo structure

| Path | Description |
| --- | --- |
| `backend/` | Node.js (Express) API with MySQL via Sequelize. Provides content management, pricing controls, gallery uploads, e-commerce endpoints, newsletter automation, job listings, and blog management. |
| `frontend/` | React + Vite single-page application with a public marketing site and authenticated admin dashboard. Tailwind CSS powers the modern, responsive UI. |

## Key capabilities

- **Responsive marketing site** with hero, services, pricing tiers, gallery, testimonials, blog previews, and conversion-focused CTAs.
- **SEO-ready architecture** including meta tags, alt text support, structured content sections, and integration hooks for Google Analytics/Search Console.
- **Dynamic admin panel** for updating sections, pricing plans, gallery entries, products, orders, newsletters, job listings, blog posts, and global settings (domain/analytics).
- **E-commerce features** such as product catalogs, order tracking, and Stripe/PayPal-ready payment metadata.
- **Newsletter & CRM tooling** to capture leads, send campaigns, and monitor incoming contact messages.
- **Careers workflow** with job listings, application intake, and CV upload support.
- **Security & scalability** via JWT authentication, role-based access, HTTPS-ready configuration, and modular architecture for future expansion.

## Getting started

### Backend API

1. Copy the sample environment variables and update them for your infrastructure:

   ```bash
   cd backend
   cp .env.example .env
   ```

   Configure `MYSQL_*`, `JWT_SECRET`, SMTP credentials, and default admin login.

2. Install dependencies and run the development server:

   ```bash
   npm install
   npm run dev
   ```

   The API listens on `http://localhost:4000` by default.

3. The first boot seeds a default admin user (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) and pricing plans. Use these credentials to sign into the admin panel.

### Frontend application

1. Copy environment variables and update the API base URL if necessary:

   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Install dependencies and start the Vite dev server:

   ```bash
   npm install
   npm run dev
   ```

   Access the site at `http://localhost:5173`. Navigate to `/admin` for the dashboard (login with the seeded admin credentials).

## Deployment considerations

- Serve the `frontend` build output (`npm run build`) via a static host or CDN. Configure the backend API URL through `VITE_API_BASE_URL`.
- Deploy the Express API on a secure Node.js environment. Provision a MySQL database, update environment variables, and enable HTTPS termination.
- Configure SMTP credentials for transactional email (contact form confirmations, newsletter campaigns).
- Enable a production-ready reverse proxy (NGINX/Caddy) to serve the frontend, proxy API calls, and manage SSL certificates.
- Integrate a payment provider (Stripe or PayPal) by extending the `ecommerceController` to create checkout sessions and webhooks.
- Add monitoring via your preferred APM/observability stack and keep dependencies up to date with `npm audit`.

## Scripts

- `backend/npm run dev` – Express server with Nodemon reloading.
- `backend/npm start` – Production server bootstrap.
- `frontend/npm run dev` – Vite development server with HMR.
- `frontend/npm run build` – Production build output in `frontend/dist`.
- `frontend/npm run preview` – Preview the built site locally.

## Further enhancements

- Configure file storage (e.g., AWS S3) for gallery uploads in production.
- Integrate Stripe Checkout or PayPal SDK for live e-commerce payments.
- Extend analytics settings to support Google Tag Manager and Facebook Pixel.
- Automate backups and logging for database and file uploads.
- Add unit/integration tests for mission-critical controllers and React components.

