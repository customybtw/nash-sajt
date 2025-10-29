# Nash Sajt Platform

A full-stack website solution for individuals and small businesses featuring a modern React frontend and a Node.js/Express API backed by MySQL. The platform delivers editable sections (pages, gallery, pricing, blog, careers), an e-commerce module with order management, newsletter capabilities, and SEO-friendly public pages.

## Features

### Frontend
- React + Vite single-page application with TailwindCSS styling.
- Responsive design optimized for mobile, tablet and desktop breakpoints.
- SEO-aware routing with dynamic meta updates.
- Pages for Home, About, Gallery, Pricing, Services, Blog, Careers, Contact, Terms and Privacy.
- Contact and newsletter subscription forms powered by the API.
- Dynamic sections sourced from the backend: gallery, pricing plans, blog posts, careers, e-commerce products.

### Backend
- Express API with modular routing and validation.
- MySQL schema for users, pages, gallery images, pricing plans, services, contact messages, newsletter subscribers, campaigns, products, orders, careers, blog posts, domain hosting records, integrations and custom features.
- JWT authentication with role-based middleware (admin, editor, viewer).
- REST endpoints for content management, e-commerce, communications, careers and blog resources.
- Nodemailer integration for forwarding contact form submissions.
- Newsletter subscription management and campaign storage.

## Getting started

### Prerequisites
- Node.js 18+
- npm
- MySQL 8+

### Backend setup
```bash
cd backend
cp .env.example .env
# Update DB credentials, mail settings and secrets in .env

# Install dependencies
npm install

# Create database schema
mysql -u <user> -p -h <host> <db_name> < db/schema.sql

# Start the development server
npm run dev
```
The API defaults to `http://localhost:5000`. Public endpoints live under `/api`, e.g. `GET /api/content/pages`.

### Frontend setup
```bash
cd frontend
cp .env.example .env
# Adjust VITE_API_URL if your backend runs on a different host

npm install
npm run dev
```
The React app runs on `http://localhost:5173` and expects the API at `VITE_API_URL`.

## Admin panel workflow
- Register an admin user via `POST /api/auth/register` or directly insert credentials in the `users` table.
- Authenticate through `POST /api/auth/login` to receive a JWT token.
- Include `Authorization: Bearer <token>` header when calling protected endpoints.
- Manage pages, gallery items, pricing plans, blog posts, careers, products, orders, and newsletter campaigns via the respective `/api/content`, `/api/ecommerce`, `/api/blog`, `/api/careers` and `/api/communications` routes.

## E-commerce & payments
The backend exposes product and order endpoints with placeholders for payment gateway integration. Store Stripe and PayPal credentials in `.env` to integrate payment processing in future iterations.

## Analytics & SEO
- Configure `GOOGLE_ANALYTICS_ID` in the backend `.env` for analytics tracking.
- Frontend includes SEO-conscious headings, meta descriptions, alt attributes and structured content blocks.

## Security considerations
- Use HTTPS in production and store secrets securely.
- Restrict database/network access to trusted hosts.
- Rotate JWT secrets periodically and enforce strong admin passwords.

## Folder structure
```
backend/
  src/
    config/      # environment + database configuration
    controllers/ # REST controllers
    middleware/  # authentication & error handling
    routes/      # API route definitions
    services/    # business logic & database calls
    validators/  # express-validator rules
frontend/
  src/
    components/  # UI building blocks
    layouts/     # shared layout wrappers
    pages/       # routed views
    hooks/       # React Query hooks
    data/        # static highlight content
```

## Scripts
- `npm run dev` (frontend) – start Vite dev server.
- `npm run build` (frontend) – production build.
- `npm run dev` (backend) – nodemon-powered API server.
- `npm run start` (backend) – run API without file watching.

## License
MIT
