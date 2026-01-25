# Deployment Checklist - GSMA Ghana Website

This checklist covers all steps needed to deploy the project to production.

## Pre-Deployment Verification

### Code & Build
- [ ] Latest code is committed to git
- [ ] `npm run build` completes successfully (0 errors)
- [ ] All TypeScript errors are resolved
- [ ] No console warnings or errors in dev mode

### Database
- [ ] Database migration applied (`department` column added to leadership table)
- [ ] All 11 tables migrated to cloud Supabase
- [ ] Database backups configured in Supabase dashboard
- [ ] Database indexes created for performance

### Features Testing (Local)
- [ ] Admin dashboard loads without errors
- [ ] Can add/edit leadership with department selection
- [ ] Department pages display HOD correctly
- [ ] Leadership page shows all department heads
- [ ] Images load properly from Supabase Storage
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All navigation links work
- [ ] Search/filter functionality works (if implemented)

---

## Environment Configuration

### 1. Production Environment Variables
Create or update `.env.production.local` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database (if needed for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin credentials (if using basic auth)
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password

# Optional: Analytics, Monitoring, etc.
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

**Getting these values:**
1. Go to [supabase.com](https://supabase.com) dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy `Project URL` and `anon public` key
5. Also copy `service_role` key (keep this secret!)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` configured
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configured
- [ ] All secrets stored securely (never in git)

### 2. Supabase Security
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] Test RLS policies with different user roles
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Storage bucket permissions set to private (except public assets)
- [ ] Database backups automated (daily recommended)

---

## Hosting Deployment

### Option A: Vercel (Recommended for Next.js)

1. **Create Vercel Account:**
   - [ ] Sign up at [vercel.com](https://vercel.com)
   - [ ] Install Vercel CLI: `npm i -g vercel`

2. **Deploy to Vercel:**
   ```powershell
   cd C:\Users\USER\Desktop\orchids-remix-of-gsma-ghana-official-website-main
   vercel --prod
   ```

3. **Configure Environment:**
   - [ ] Go to Vercel dashboard → Project Settings
   - [ ] Add all environment variables under "Environment Variables"
   - [ ] Set to "Production" environment
   - [ ] Redeploy after adding variables

### Option B: AWS, Google Cloud, Azure, or Other
- [ ] Set up hosting account
- [ ] Configure Node.js runtime
- [ ] Set environment variables in hosting dashboard
- [ ] Deploy built app

### Option C: Self-Hosted
- [ ] Server running Node.js 18+ (check with `node --version`)
- [ ] PM2 or similar process manager installed
- [ ] Nginx/Apache reverse proxy configured
- [ ] Environment variables configured on server

---

## Domain Configuration

- [ ] Domain registered (if not already done)
- [ ] DNS records updated:
  - [ ] A record pointing to hosting IP/Vercel
  - [ ] CNAME records configured if needed
- [ ] SSL certificate auto-renewed (usually automatic)
- [ ] HTTPS redirect configured
- [ ] DNS propagation verified (can take 24 hours)

**Test domain:**
```
https://your-domain.com
```

---

## Post-Deployment Verification

### Functionality Testing
- [ ] Home page loads and displays correctly
- [ ] Navigation menu works on all pages
- [ ] Admin login works with production credentials
- [ ] Admin dashboard loads and is functional
- [ ] Can add/edit content (news, events, projects, etc.)
- [ ] Department pages display HODs correctly
- [ ] Leadership page shows all staff
- [ ] Gallery/images display properly
- [ ] Contact form submits (if configured)
- [ ] Mobile responsive design verified

### Performance Testing
- [ ] Page load time is acceptable (< 3 seconds ideal)
- [ ] Images are optimized and loading quickly
- [ ] No broken links (use online link checker)
- [ ] All images display with correct paths
- [ ] Check PageSpeed Insights score
- [ ] Check Core Web Vitals

**Tools:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Security Testing
- [ ] HTTPS working and enforced
- [ ] SSL certificate valid (green padlock in browser)
- [ ] No mixed content warnings
- [ ] Security headers configured
- [ ] OWASP security checklist passed
- [ ] No sensitive data exposed in client-side code

**Check headers:**
```powershell
curl -I https://your-domain.com
```

### SEO & Accessibility
- [ ] Meta tags present and correct
- [ ] Title and description on all pages
- [ ] Open Graph tags configured
- [ ] sitemap.xml exists (if using static export)
- [ ] robots.txt configured
- [ ] Accessibility audit passed (WCAG 2.1 AA)

---

## Monitoring & Maintenance

### Set Up Monitoring
- [ ] Error tracking (Sentry, LogRocket, etc.)
  ```
  npm install @sentry/nextjs
  ```
- [ ] Analytics configured (Google Analytics, Plausible, etc.)
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] Email alerts for errors/downtime

### Regular Maintenance
- [ ] Database backups tested and verified
- [ ] Weekly backup downloads to local storage
- [ ] Monthly security updates checked
- [ ] Dependencies updated monthly
- [ ] SSL certificate auto-renewal verified
- [ ] Server logs reviewed regularly

### Content Updates
- [ ] Admin can easily update news/events/projects
- [ ] Image upload working in admin
- [ ] Content changes reflect on site within minutes
- [ ] Staging environment for testing (optional but recommended)

---

## Performance Optimization

- [ ] Enable Next.js Image Optimization
- [ ] Compress images in Supabase Storage
- [ ] Enable caching headers
- [ ] Enable CDN for static assets
- [ ] Database query optimization
- [ ] Remove unused dependencies

**Check bundle size:**
```powershell
npm run build -- --analyze
```

---

## Disaster Recovery

- [ ] Database backup schedule (daily minimum)
- [ ] Backup verification procedure documented
- [ ] Backup restoration tested (on staging)
- [ ] Contact list for emergencies
- [ ] Rollback procedure documented
- [ ] DNS failover configured (optional for high availability)

---

## Documentation

- [ ] Deployment procedure documented
- [ ] Admin user guide created
- [ ] Content editing guidelines documented
- [ ] Emergency contact list prepared
- [ ] Credentials stored securely (LastPass, 1Password, etc.)
- [ ] Handoff documentation to team/client

---

## Launch Checklist (Final)

- [ ] All items above completed
- [ ] Final QA testing passed
- [ ] Stakeholder approval obtained
- [ ] Launch announcement prepared
- [ ] DNS pointing to production
- [ ] Monitoring active and alerting
- [ ] Team notified of go-live
- [ ] Post-launch support plan in place

---

## Post-Launch (First Week)

- [ ] Monitor error logs daily
- [ ] Check analytics for traffic patterns
- [ ] Verify all functionality working
- [ ] Collect user feedback
- [ ] Fix any issues that arise
- [ ] Optimize based on real-world usage

---

## Useful Commands

```powershell
# Build for production
npm run build

# Start production server locally
npm run start

# Check Next.js version
npm list next

# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# View build analysis
npm run build -- --analyze
```

---

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

**Status:** Ready for deployment after all items checked ✅
**Last Updated:** January 25, 2026
**Project:** GSMA Ghana Official Website
