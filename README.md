# Ulpingo - Portuguese-Hebrew Language Learning App

A modern language learning application built with Next.js, featuring flashcards, quizzes, and spaced repetition for learning Hebrew vocabulary in Portuguese.

## Features

- 🎴 **Flashcards**: Interactive flashcard learning with audio pronunciation
- 📝 **Multiple Choice Quizzes**: Test your knowledge with engaging quizzes
- 🔄 **Spaced Repetition**: SM-2 algorithm for optimal learning retention
- 👤 **User Progress Tracking**: Monitor your learning journey
- 🔐 **Authentication**: Email/password and Google OAuth support
- 👥 **Guest Mode**: Try the app without creating an account
- 🎨 **Modern UI**: Built with HeroUI and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + HeroUI
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16.x or higher
- Docker & Docker Compose (for containerized deployment)
- npm or yarn

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/danielbugi/ulpingo-app.git
cd ulpingo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Edit `.env` and configure the following:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ulpingo_db

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Node Environment
NODE_ENV=development
```

### 4. Set Up Database

Create a PostgreSQL database:

```bash
createdb ulpingo_db
```

Run the setup script to initialize schema and seed data:

```bash
node scripts/setup-db.js
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Using Docker Compose (Recommended)

#### 1. Create Production Environment File

Create a `.env.production` file:

```env
# Database (Docker internal network)
DATABASE_URL=postgresql://ulpingo:ulpingo_password@postgres-ulpingo:5432/ulpingo_db

# NextAuth - MUST generate new secret for production!
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Node Environment
NODE_ENV=production
```

#### 2. Update Docker Compose Environment

Edit `docker-compose.yml` to source your production environment:

```yaml
ulpingo-app:
  env_file:
    - .env.production
```

#### 3. Build and Start

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f ulpingo-app

# Check health status
curl http://localhost:3000/api/health
```

The application will:

- Start PostgreSQL on port 5434 (host) / 5432 (container)
- Initialize the database automatically
- Start the app on port 3000
- Run health checks every 30 seconds

#### 4. Stop Services

```bash
docker-compose down

# To remove volumes (WARNING: deletes data)
docker-compose down -v
```

### Manual Production Deployment

#### 1. Build the Application

```bash
npm run build
```

#### 2. Set Up Production Database

Run the schema and seed scripts on your production database.

#### 3. Start the Server

```bash
npm start
```

## Environment Variables Reference

| Variable               | Required | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `DATABASE_URL`         | Yes      | PostgreSQL connection string           |
| `NEXTAUTH_SECRET`      | Yes      | Secret for NextAuth session encryption |
| `NEXTAUTH_URL`         | Yes      | Full URL of your application           |
| `GOOGLE_CLIENT_ID`     | No       | Google OAuth client ID                 |
| `GOOGLE_CLIENT_SECRET` | No       | Google OAuth client secret             |
| `NODE_ENV`             | Yes      | `development` or `production`          |

## Security Considerations for Production

### 1. Generate Strong Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

### 2. Use Strong Database Credentials

Update the default passwords in `docker-compose.yml`:

```yaml
POSTGRES_PASSWORD: <strong-random-password>
DATABASE_URL: postgresql://ulpingo:<strong-random-password>@...
```

### 3. Enable HTTPS

Use a reverse proxy (nginx, Caddy, Traefik) to handle SSL/TLS:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. Set Up Database Backups

```bash
# Manual backup
docker-compose exec postgres-ulpingo pg_dump -U ulpingo ulpingo_db > backup.sql

# Restore
docker-compose exec -T postgres-ulpingo psql -U ulpingo ulpingo_db < backup.sql
```

### 5. Configure OAuth Providers

For Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

## Monitoring & Health Checks

### Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T10:30:00.000Z",
  "database": "connected"
}
```

### Container Health Status

```bash
docker-compose ps
```

## Database Migrations

When updating the database schema:

1. Create a new migration file in `database/` directory
2. Update the schema version tracking
3. Run migrations on production carefully

```sql
-- Example migration file: migration-001-add-column.sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres-ulpingo

# View PostgreSQL logs
docker-compose logs postgres-ulpingo

# Test connection
docker-compose exec postgres-ulpingo psql -U ulpingo -d ulpingo_db
```

### Application Issues

```bash
# View app logs
docker-compose logs -f ulpingo-app

# Restart app
docker-compose restart ulpingo-app

# Rebuild and restart
docker-compose up -d --build ulpingo-app
```

### Clear Guest Data (Development)

Open browser console and run:

```javascript
clearGuestData();
```

## Performance Optimization

- Database indexes are configured for optimal query performance
- Standalone Next.js build reduces image size by ~80%
- Static assets are served efficiently
- Connection pooling is enabled for PostgreSQL

## License

Private - All rights reserved

## Support

For issues or questions, please open an issue in the GitHub repository.

---

Built with ❤️ for language learners
