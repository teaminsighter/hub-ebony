# CommercialDXB - Dubai Property Investment Platform

A comprehensive platform for Dubai commercial property investment consultations and lead management.

## Features

- **Landing Page** with property investment information
- **Calendar Booking System** for consultations
- **Admin Dashboard** with comprehensive analytics
- **Lead Tracking** with UTM parameters and click ID support
- **Real-time Analytics** and reporting
- **WhatsApp & Email Integration**

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Analytics**: Custom data layer with comprehensive tracking

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/teaminsighter/hub-ebony.git
   cd hub-ebony
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Deployment on Vercel

### Environment Variables Required:

```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secure-secret-key
ADMIN_EMAIL=admin@commercialdxb.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### Deploy Steps:

1. **Connect to Vercel**
   - Import repository from GitHub
   - Framework: Next.js (auto-detected)

2. **Configure Environment Variables**
   - Add all required variables in Vercel dashboard
   - Generate secure NEXTAUTH_SECRET: `openssl rand -base64 32`

3. **Deploy**
   - Click Deploy
   - Vercel will automatically run the build process

## Admin Panel

Access the admin panel at `/admin/login` with your configured credentials.

**Features:**
- Dashboard with key metrics
- Client management
- Consultation scheduling
- Analytics and reporting
- Content management
- Settings configuration

## Analytics & Tracking

The platform includes comprehensive tracking:
- UTM parameter capture
- Click ID tracking (Google, Facebook, etc.)
- User behavior analytics
- Lead attribution
- Real-time dashboard

## Contact Integration

- **WhatsApp**: Direct messaging integration
- **Email**: Automated consultation booking
- **Calendar**: Real-time availability checking

## License

Private - CommercialDXB Platform

---

Built with ❤️ for Dubai property investment
