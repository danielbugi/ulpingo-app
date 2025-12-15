# Production Deployment Checklist

Use this checklist before deploying Ulpingo to production.

## Pre-Deployment

### Security

- [ ] Generate strong `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- [ ] Update database password in `docker-compose.yml` (change from `ulpingo_password`)
- [ ] Create production `.env.production` file with all required variables
- [ ] Verify `.env` and `.env.production` are in `.gitignore`
- [ ] Set up Google OAuth credentials for production domain
- [ ] Update `NEXTAUTH_URL` to your production domain (e.g., `https://ulpingo.com`)

### Infrastructure

- [ ] Set up reverse proxy (nginx/Caddy) with SSL/TLS certificate
- [ ] Configure firewall to block direct access to port 5432 (PostgreSQL)
- [ ] Set up domain DNS records
- [ ] Configure HTTPS redirect (HTTP → HTTPS)

### Database

- [ ] Database backup strategy in place
- [ ] Test database connection from application
- [ ] Verify schema is up to date
- [ ] Plan for database migration strategy

### Monitoring

- [ ] Set up health check monitoring (e.g., UptimeRobot, StatusCake)
- [ ] Configure error tracking (optional: Sentry, LogRocket)
- [ ] Set up log aggregation (optional: Datadog, CloudWatch)
- [ ] Configure alerts for downtime

## Deployment Steps

1. **Prepare Environment**

   ```bash
   # Create production environment file
   cp env.example .env.production
   # Edit with production values
   nano .env.production
   ```

2. **Update Docker Compose**

   - Change database password
   - Update port mappings if needed
   - Configure restart policies

3. **Deploy**

   ```bash
   # Build and start services
   docker-compose up -d --build

   # Check health
   curl http://localhost:3000/api/health

   # View logs
   docker-compose logs -f ulpingo-app
   ```

4. **Verify Deployment**
   - [ ] Application is accessible
   - [ ] Health check endpoint returns 200
   - [ ] Database connection is working
   - [ ] User registration works
   - [ ] Google OAuth works (if configured)
   - [ ] Guest mode works
   - [ ] Quiz functionality works
   - [ ] Flashcard functionality works
   - [ ] Review system works

## Post-Deployment

### Monitoring

- [ ] Verify health checks are passing
- [ ] Monitor application logs for errors
- [ ] Check database performance
- [ ] Monitor disk usage

### Backup

- [ ] Schedule automated database backups
- [ ] Test backup restoration process
- [ ] Store backups securely off-site

### Maintenance

- [ ] Document deployment process
- [ ] Set up CI/CD pipeline (optional)
- [ ] Plan for zero-downtime updates
- [ ] Schedule regular security updates

## Environment Variables Checklist

```env
# Required
DATABASE_URL=postgresql://ulpingo:STRONG_PASSWORD@postgres-ulpingo:5432/ulpingo_db
NEXTAUTH_SECRET=<openssl-rand-base64-32>
NEXTAUTH_URL=https://yourdomain.com
NODE_ENV=production

# Optional (but recommended)
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
NEXT_TELEMETRY_DISABLED=1
```

## Quick Commands

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f ulpingo-app

# Restart application
docker-compose restart ulpingo-app

# Backup database
docker-compose exec postgres-ulpingo pg_dump -U ulpingo ulpingo_db > backup-$(date +%Y%m%d).sql

# Stop all services
docker-compose down

# Update application
git pull
docker-compose up -d --build ulpingo-app
```

## Rollback Plan

If deployment fails:

```bash
# Stop new version
docker-compose down

# Restore from backup if needed
docker-compose up -d postgres-ulpingo
docker-compose exec -T postgres-ulpingo psql -U ulpingo ulpingo_db < backup.sql

# Revert to previous version
git checkout <previous-commit>
docker-compose up -d --build
```

## Support Contacts

- Technical Lead: [Your Name]
- Infrastructure: [Team/Person]
- On-Call: [Contact Info]

---

Last Updated: December 16, 2025
