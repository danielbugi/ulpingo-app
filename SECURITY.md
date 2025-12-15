# Ulpingo Security Policy

## Reporting Security Issues

If you discover a security vulnerability in Ulpingo, please email [your-email@domain.com] with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Please do not create public GitHub issues for security vulnerabilities.**

## Security Best Practices for Production

### 1. Environment Variables

- Never commit `.env` or `.env.production` files
- Rotate secrets regularly (at least every 90 days)
- Use strong, randomly generated secrets
- Store secrets in a secure vault (e.g., HashiCorp Vault, AWS Secrets Manager)

### 2. Database Security

- Use strong passwords (minimum 20 characters, random)
- Enable SSL/TLS for database connections in production
- Restrict database access to application container only
- Regular backups with encryption
- Keep PostgreSQL updated with security patches

### 3. Authentication

- Enable MFA for admin accounts
- Implement rate limiting on login endpoints
- Monitor for suspicious authentication attempts
- Regularly audit user accounts
- Use secure session management

### 4. Network Security

- Use HTTPS only in production
- Configure proper CORS policies
- Enable CSP (Content Security Policy) headers
- Use firewall to restrict access
- Keep all ports closed except 80/443

### 5. Application Security

- Keep all dependencies updated
- Run `npm audit` regularly
- Enable security headers (already configured)
- Sanitize user inputs
- Implement rate limiting on API routes
- Regular security audits

### 6. Docker Security

- Don't run containers as root (already implemented)
- Use official base images only
- Keep base images updated
- Scan images for vulnerabilities
- Limit container resources

### 7. Monitoring & Logging

- Enable access logs
- Monitor for unusual patterns
- Set up alerts for security events
- Regular log review
- Implement SIEM if possible

## Security Checklist

Before going to production:

- [ ] All secrets are randomly generated and strong
- [ ] `.env` files are not in version control
- [ ] HTTPS is enforced
- [ ] Database passwords are changed from defaults
- [ ] Security headers are enabled
- [ ] Dependencies are up to date
- [ ] Rate limiting is configured
- [ ] Monitoring is in place
- [ ] Backups are automated and tested
- [ ] Firewall rules are configured
- [ ] OAuth redirect URIs are restricted to production domain
- [ ] Error messages don't expose sensitive information

## Vulnerability Disclosure Timeline

1. Report received - Acknowledged within 48 hours
2. Issue validated - Within 7 days
3. Fix developed and tested - Within 30 days
4. Security patch released - As soon as possible
5. Public disclosure - 90 days after fix (or earlier if already public)

## Security Updates

We regularly update dependencies and monitor for security vulnerabilities. Subscribe to GitHub security advisories to stay informed.

## Compliance

This application stores:

- User email addresses
- User names
- Learning progress data
- OAuth tokens (encrypted)

Ensure compliance with:

- GDPR (if serving EU users)
- LGPD (if serving Brazilian users)
- Local data protection regulations

## Contact

Security Team: [your-email@domain.com]

---

Last Updated: December 16, 2025
