# 🚀 Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
- [ ] All production `.env` variables set
- [ ] Stripe keys switched to live mode
- [ ] Supabase keys using production project
- [ ] Sentry DSN configured
- [ ] Email service (Resend) configured
- [ ] SMS service (Twilio) configured

### 2. Database
- [ ] Production database created (Supabase)
- [ ] Migrations run successfully
- [ ] Seed data loaded (if needed)
- [ ] Backups configured
- [ ] RLS policies enabled

### 3. Security
- [ ] HTTPS/SSL certificates active
- [ ] CORS origins updated for production
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Secrets stored securely (not in code)

### 4. Testing
- [ ] All tests passing
- [ ] Load testing completed
- [ ] Security scan completed
- [ ] API endpoints tested
- [ ] Payment flow tested (Stripe test mode)

## Deployment Steps

### Backend (Railway)

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Create New Project**
   ```bash
   railway init
   ```

4. **Add PostgreSQL**
   ```bash
   railway add --plugin postgresql
   ```

5. **Set Environment Variables**
   ```bash
   railway variables set KEY=VALUE
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Get Deployment URL**
   ```bash
   railway domain
   ```

### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all NEXT_PUBLIC_* variables

5. **Configure Custom Domain**
   - Vercel Dashboard → Domains
   - Add: gbakidigital.com
   - Add: www.gbakidigital.com

## Post-Deployment

### 1. Monitoring
- [ ] Sentry errors being captured
- [ ] Uptime monitoring active (UptimeRobot)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Database metrics tracked

### 2. DNS Configuration
- [ ] A record: gbakidigital.com → Vercel IP
- [ ] CNAME: www.gbakidigital.com → cname.vercel-dns.com
- [ ] CNAME: api.gbakidigital.com → Railway URL
- [ ] MX records for email (if custom domain email)

### 3. Email Setup
- [ ] SPF record added
- [ ] DKIM configured
- [ ] DMARC policy set
- [ ] Sender domain verified in Resend

### 4. Final Checks
- [ ] Homepage loads correctly
- [ ] API health check responds
- [ ] Login/Register works
- [ ] Order creation works
- [ ] File upload works
- [ ] Email notifications sending
- [ ] Support tickets working

## Rollback Plan

If deployment fails:

1. **Frontend (Vercel)**
   ```bash
   vercel rollback
   ```

2. **Backend (Railway)**
   - Railway Dashboard → Deployments
   - Click "..." on previous deployment
   - Select "Rollback to this deployment"

3. **Database**
   - Restore from latest backup
   ```bash
   supabase db restore
   ```

## Cost Estimation

### Monthly Costs (Projected)

- **Vercel**: Free (Hobby) → $20 (Pro)
- **Railway**: $5 (Free tier) → $20-50 (usage-based)
- **Supabase**: Free → $25 (Pro)
- **Resend**: Free (100/day) → $20 (50k/month)
- **Stripe**: 2.9% + $0.30 per transaction
- **Domain**: $15/year
- **Total**: ~$10/month (free tier) → $100-150/month (production)

## Support Contacts

- **Technical Issues**: devops@gbakidigital.com
- **Railway Support**: https://railway.app/help
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support

