# Full-Stack Support Ticketing System

A full-stack web application for managing support tickets efficiently. Built with *Next.js, **Neon PostgreSQL, and **Prisma, and includes **error tracking and logging with Sentry* for reliability.

---

##  Features
- Create, update, and track support tickets
- User authentication and authorization
- Real-time error tracking with *Sentry*
- Database powered by *Neon PostgreSQL*
- ORM using *Prisma* for type-safe queries

---

##  Tech Stack
- *Frontend:* Next.js (React)
- *Backend:* Node.js, Next.js API Routes
- *Database:* Neon PostgreSQL
- *ORM:* Prisma
- *Error Tracking:* Sentry

---

##  Project Structure
/app  -> Next.js pages & components/
prisma -> Prisma schema and migrations

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Full-Stack-Support-Ticketing-System.git
cd Full-Stack-Support-Ticketing-System

Install Dependencies

npm install

Set Up Environment Variables

Create a .env file in root directory:
DATABASE_URL="your-neon-postgresql-url"
NEXTAUTH_SECRET="your-secret"
SENTRY_DSN="your-sentry-dsn"

Run Prisma Migrations

npx prisma generate
npx prisma migrate dev

Start Development Server

npm run dev

Visit http://localhost:3000

Deployment
Deploy easily on Vercel or any Node hosting platform

Credits

This project was inspired by an open-source tutorial. Additional modifications and customizations have been implemented.
