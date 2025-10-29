# Nash Studio Website Platform

A full-stack web platform tailored for individuals and small businesses who need a professional,
SEO-optimized website managed through a MySQL-powered admin panel. The solution features a modern
React frontend, an Express backend, subscription-based pricing plans, ecommerce capabilities, contact
& newsletter management, career listings, and legal pages.

## Features

### Frontend
- **Responsive React interface** built with Vite, Tailwind CSS, and React Router.
- **SEO ready** with configurable meta tags, structured data sections, Google Analytics setting, and
  `react-helmet-async` integration.
- **Dynamic content** including hero sections, pricing tables, gallery, blog, and careers pages pulled
  from the API.
- **Contact & newsletter forms** connected to backend endpoints.
- **Admin dashboard** for quickly editing hero copy, site-wide SEO metadata, and pricing plans using a
  JWT token from the backend.

### Backend
- **Express + Sequelize + MySQL** stack with models for users, roles, settings, page sections, pricing
  plans, gallery images, products, orders, job listings, blog posts, portfolio items, domain records,
  newsletter subscribers, and contact messages.
- **Authentication & authorization** using JWTs, bcrypt, and role-based permission checks.
- **Content management endpoints** for pages, portfolio items, pricing, domains, newsletters, blog,
  jobs, gallery, ecommerce, and contact form submissions.
- **Email + newsletter** integrations via Nodemailer and bulk send helper.
- **Stripe & PayPal placeholders** for ecommerce payment intent creation (requires live credentials).
- **Seed script** that provisions default admin user, pricing plans, sample hero content, job listing,
  portfolio item, and site settings.

## Project Structure

```
client/   # React frontend
server/   # Express backend
```

## Prerequisites
- Node.js 18+
- MySQL 8 (or compatible server)

## Environment Setup

1. **Backend**
   ```bash
   cd server
   cp .env.example .env
   # update database credentials, JWT secret, email + payment keys
   npm install
   npm run seed   # create tables and bootstrap data
   npm run dev    # start the API on http://localhost:5000
   ```

2. **Frontend**
   ```bash
   cd client
   npm install
   npm run dev    # starts Vite on http://localhost:5173
   ```

## Key API Endpoints
- `POST /api/auth/login` – obtain JWT for admin dashboard.
- `GET /api/content/pages/:page` – fetch page sections (home, about, etc.).
- `PUT /api/content/pages/:id` – update a section (requires token with `content:write`).
- `GET /api/pricing` / `PUT /api/pricing` – manage subscription plans.
- `GET /api/gallery` / `POST /api/gallery` – manage gallery images with SEO metadata.
- `POST /api/contact` – submit contact messages (email notification + database log).
- `POST /api/newsletter` – capture newsletter subscribers.
- `POST /api/commerce/orders` – create ecommerce orders (Stripe intent when configured).

See `server/src/routes` for the full list of available endpoints and required permissions.

## Seeding and Credentials
- Default admin user: `admin@example.com` / `ChangeMe123!`
- After seeding, log in via `POST /api/auth/login` to retrieve a JWT for the admin dashboard.

## Development Notes
- File uploads (gallery) store images in the local `server/uploads` directory.
- Payment providers are initialized but require valid API keys to run live.
- Newsletter sending leverages Nodemailer; configure SMTP credentials in `.env`.
- All models sync automatically on startup (via Sequelize `sync({ alter: true })`).

## Testing & Linting
- Backend linting: `cd server && npm run lint`
- Frontend linting: `cd client && npm run lint`
- Adjust or extend scripts as needed for additional testing frameworks.

## Deployment Considerations
- Replace development secrets with production-ready values.
- Configure MySQL database, SMTP service, Stripe/PayPal keys, and Google Analytics ID.
- Serve the built frontend (`npm run build` in `client`) from a CDN or via the backend’s static file
  hosting.
- Use HTTPS, environment-specific `.env` files, and database backups.

## License
Released under the MIT License.
