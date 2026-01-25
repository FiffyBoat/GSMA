# GSMA Ghana Website - Deployment Guide

This guide covers deploying the GSMA Ghana website to production using Vercel for hosting and Supabase for the database.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Deployment](#database-deployment)
4. [Storage Configuration](#storage-configuration)
5. [Vercel Deployment](#vercel-deployment)
6. [Post-Deployment Testing](#post-deployment-testing)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

- [ ] All local testing completed (npm run test-setup)
- [ ] TypeScript build passes (npm run build)
- [ ] .env.local has been removed from repository
- [ ] All sensitive data removed from code
- [ ] Admin user created and tested locally
- [ ] Image uploads tested in local environment
- [ ] Database migrations applied locally
- [ ] RLS policies validated in local database
- [ ] API endpoints tested with Postman/Thunder Client
- [ ] Admin dashboard functionality verified
- [ ] Contact form tested (email notifications)
- [ ] Gallery and news sections display correctly
- [ ] Mobile responsiveness verified

## Environment Setup

### 1. Supabase Cloud Setup

```bash
# Navigate to https://supabase.com and create a new project
# Fill in project details:
# - Project name: gsma-ghana-website
# - Database password: Strong password (save securely)
# - Region: Choose closest to Ghana (e.g., us-east-1)
# - Pricing: Pro plan recommended for production

# After project creation, save these variables:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
```

### 2. Create .env.production Environment Variables

Create `.env.local` for production (never commit this):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Admin
ADMIN_EMAIL=admin@gsma.org.gh
ADMIN_DEFAULT_PASSWORD=ChangeMe123!

# Email (if using contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### 3. Local Environment Variables Backup

Save your local `.env.local` in a secure location:

```bash
# Backup before pushing to production
cp .env.local ~/backup-env-local.txt
# Update permissions to read-only
chmod 400 ~/backup-env-local.txt
```

## Database Deployment

### 1. Apply Migrations to Cloud Database

```bash
# Login to Supabase
supabase login

# Link to your cloud project
supabase link --project-ref your-project-ref

# Push migrations to production
supabase db push
```

### 2. Verify Schema

```bash
# Connect to Supabase console and verify these tables exist:
# - news, projects, events, gallery_items
# - hero_slides, leadership, users
# - content_logs (for audit trail)
```

### 3. Enable Row Level Security (RLS)

```bash
# In Supabase Console > SQL Editor, run:
# Copy contents from supabase/rls-policies.sql and execute
```

### 4. Create Admin User in Production

```bash
# Option 1: Via API endpoint
curl -X POST https://yourdomain.com/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -d '{
    "email": "admin@gsma.org.gh",
    "password": "SecurePassword123!"
  }'

# Option 2: Via Supabase Console
# Navigate to SQL Editor and insert:
INSERT INTO users (email, password_hash, is_admin, is_active)
VALUES ('admin@gsma.org.gh', bcrypt('SecurePassword123!'), true, true);
```

## Storage Configuration

### 1. Create Storage Bucket

```bash
# In Supabase Console > Storage:
# 1. Create new bucket named "website-images"
# 2. Set to Private
# 3. Enable "File size limit": 10 MB
# 4. Enable "Allowed MIME types": image/jpeg, image/png, image/webp, image/gif
```

### 2. Set Storage RLS Policies

```sql
-- Public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'website-images');

-- Authenticated write/delete access
CREATE POLICY "Authenticated write access" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'website-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated delete access" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'website-images' 
    AND auth.role() = 'authenticated'
  );
```

### 3. Test Image Upload

```bash
# Use Supabase Console to upload a test image
# Or test via admin dashboard at https://yourdomain.com/admin
```

## Vercel Deployment

### 1. Prepare Repository

```bash
# Remove local environment files
rm .env.local
git add -A
git commit -m "Remove local environment files"

# Ensure no sensitive data in repository
git log -p | grep -i "secret\|password" || echo "No secrets found"
```

### 2. Connect to Vercel

```bash
# Option 1: Via Vercel CLI
npm install -g vercel
vercel --prod

# Option 2: Via Vercel Dashboard
# 1. Go to https://vercel.com
# 2. Connect GitHub repository
# 3. Select project
# 4. Click "Import Project"
```

### 3. Add Environment Variables in Vercel

In Vercel Dashboard > Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key (Production only)
SUPABASE_JWT_SECRET = your-jwt-secret (Production only)
NODE_ENV = production
```

### 4. Configure Build Settings

- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm ci`

### 5. Deploy

```bash
# Via CLI
vercel --prod

# Via Dashboard
# Click "Deploy" button
```

## Post-Deployment Testing

### 1. Smoke Tests

```bash
# Test homepage
curl -I https://yourdomain.com

# Test admin login page
curl -I https://yourdomain.com/admin

# Test API health check
curl https://yourdomain.com/api/health

# Test database connection
curl -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  https://yourdomain.com/api/admin/news
```

### 2. Functional Testing

- [ ] Load homepage - should display all sections
- [ ] Login to admin dashboard
- [ ] Create a new news post with image
- [ ] Edit the news post
- [ ] Delete the news post (verify image is removed)
- [ ] Upload image to gallery
- [ ] Change admin password
- [ ] Logout and login with new password
- [ ] View news on public site
- [ ] Contact form submission (if configured)
- [ ] Mobile view responsiveness

### 3. Performance Testing

```bash
# Use Lighthouse
# https://developers.google.com/web/tools/lighthouse

# Test API response times
curl -w "@curl-format.txt" -o /dev/null -s https://yourdomain.com/api/admin/news

# Check Core Web Vitals
# https://web.dev/vitals/
```

### 4. Security Testing

```bash
# Test CORS headers
curl -H "Origin: https://example.com" -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: X-Custom-Header" \
  -X OPTIONS https://yourdomain.com/api/admin/news -v

# Verify RLS policies (unauthorized access should fail)
curl -H "Authorization: Bearer invalid-token" \
  https://yourdomain.com/api/admin/news

# Check for secrets in response headers
curl -v https://yourdomain.com | grep -i "secret\|password\|api"
```

## Monitoring & Maintenance

### 1. Enable Vercel Analytics

In Vercel Dashboard > Analytics:
- [ ] Enable Web Analytics
- [ ] Enable Speed Insights

### 2. Database Monitoring

```bash
# Monitor database logs in Supabase Console
# - Settings > Database Logs
# - Check for errors and slow queries

# Set up performance alerts
# - Settings > Alerts
# - Enable database size warning
```

### 3. Automated Backups

```bash
# Enable automatic backups in Supabase
# - Settings > Backups
# - Schedule: Daily
# - Retention: 7 days

# Manual backup command
supabase db pull --db-url "postgresql://user:password@host/dbname"
```

### 4. Regular Tasks

**Daily:**
- Monitor error logs in Vercel and Supabase
- Check uptime status

**Weekly:**
- Review analytics data
- Check database performance metrics

**Monthly:**
- Audit admin users
- Review storage usage
- Update dependencies: `npm outdated`

## Troubleshooting

### Common Issues

**1. 502 Bad Gateway on Vercel**
```bash
# Check function execution time
# Vercel has 60 second timeout on Pro plan
# Reduce database query complexity or use caching

# Check environment variables
vercel env list
vercel env pull .env.local
```

**2. Database Connection Errors**
```bash
# Verify Supabase URL and keys are correct
# Check firewall settings in Supabase
# Settings > Database > Firewall > Allow all

# Test connection
psql "postgresql://user:password@db.supabase.co:5432/postgres"
```

**3. Image Upload Failures**
```bash
# Check storage bucket exists
# Verify bucket name: "website-images"
# Check file size limits (10 MB default)
# Verify MIME type restrictions

# Test upload via Supabase Console
```

**4. Authentication Issues**
```bash
# Verify JWT_SECRET matches SUPABASE_JWT_SECRET
# Clear browser cookies and try login again
# Check session table in database

# Test auth endpoint
curl -X POST https://yourdomain.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gsma.org.gh","password":"password"}'
```

**5. TypeScript Build Errors**
```bash
# Run type check locally
npm run type-check

# Fix errors before deploying
npm run build

# Deploy only after build succeeds
```

### Debug Mode

Enable debug logging:

```env
DEBUG=*
NODE_DEBUG=http,https
LOG_LEVEL=debug
```

## Rollback Procedure

If deployment fails:

```bash
# Option 1: Revert to previous Vercel deployment
# Vercel Dashboard > Deployments > Select previous > Promote

# Option 2: Revert git and redeploy
git revert HEAD
git push origin main
# Vercel will auto-redeploy

# Option 3: Manual rollback
vercel rollback
```

## Security Best Practices

1. **Rotate Keys Regularly**
   ```bash
   # Every 90 days
   # Supabase Console > Settings > API
   # Rotate ANON_KEY and SERVICE_ROLE_KEY
   ```

2. **Monitor Unauthorized Access**
   - Check logs for suspicious activity
   - Enable 2FA on admin accounts

3. **Regular Security Updates**
   ```bash
   npm audit
   npm audit fix
   npm update
   ```

4. **Database Security**
   - Enable SSL connections (default in Supabase)
   - Use service role key only server-side
   - Keep RLS policies enabled

## Support & Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Project README](./README.md)
- [Setup Checklist](./SETUP_CHECKLIST.md)

---

**Last Updated:** January 2025
**Maintained By:** GSMA Ghana Development Team
