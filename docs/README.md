# GBAKI Digital Solutions - Business Incubator for African Immigrants

> **From Immigration to Innovation in 30 Days** 🌍 → 🇺🇸 → 💼

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-DB-green)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

**Solo Founder Project** | Helping African immigrants launch US businesses

[Live Demo](https://gbaki-digital.vercel.app) • [Docs](./docs) • [API](https://gbaki-api.railway.app/docs)

---

## 🎯 What This Does

All-in-one platform for African immigrants to:
- ✅ Form LLC/Corporation ($0 → done)
- ✅ Get EIN from IRS
- ✅ Build professional website
- ✅ Setup business banking
- ✅ Get US phone number
- ✅ AI chatbot for customer service
- ✅ Marketing automation

**Problem**: Immigrants struggle with complex US business bureaucracy, fragmented services, language barriers.

**Solution**: One platform, culturally aware, affordable packages ($997-$4,997).

---

## 🛠️ Tech Stack (Solo-Friendly)

```yaml
Frontend:
  - Next.js 14 (TypeScript)
  - Tailwind CSS + shadcn/ui
  - Deployed on: Vercel (free tier rocks!)

Backend:
  - FastAPI (Python)
  - Deployed on: Railway ($5-20/mo)

Database:
  - Supabase (PostgreSQL + Auth + Storage)
  - Free tier: 500MB DB, 1GB storage

Payments:
  - Stripe (2.9% + 30¢)

Email:
  - Resend (10k/mo free) or SendGrid

SMS/Phone:
  - Twilio (pay-as-you-go)

AI:
  - OpenAI API (GPT-4)
  - Anthropic Claude API

Monitoring:
  - Vercel Analytics (free)
  - Sentry (10k events/mo free)
```

**Monthly Cost**: ~$50-100 (under 100 users)

---

## 📁 Project Structure

```
gbaki-digital/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Auth pages
│   │   ├── login/
│   │   ├── register/
│   │   └── onboarding/
│   ├── (dashboard)/       # Protected routes
│   │   ├── overview/
│   │   ├── my-business/
│   │   ├── services/
│   │   └── billing/
│   ├── (marketing)/       # Public pages
│   │   ├── page.tsx       # Homepage
│   │   ├── pricing/
│   │   └── about/
│   ├── api/               # API routes
│   │   ├── auth/
│   │   ├── stripe/
│   │   └── webhooks/
│   └── layout.tsx
│
├── components/
│   ├── ui/                # shadcn components
│   ├── forms/
│   ├── dashboard/
│   └── marketing/
│
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── stripe.ts          # Stripe setup
│   ├── api.ts             # API client
│   └── utils.ts
│
├── api/                   # FastAPI backend (separate repo optional)
│   ├── main.py
│   ├── routers/
│   │   ├── llc.py
│   │   ├── websites.py
│   │   ├── ai.py
│   │   └── payments.py
│   ├── services/
│   └── requirements.txt
│
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## 🚀 Quick Start (10 Minutes)

### Prerequisites
```bash
node -v    # v20+
python -v  # 3.11+
git --version
```

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/gbaki-digital.git
cd gbaki-digital

# Install frontend deps
npm install

# Install backend deps
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Setup Supabase

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your credentials
3. Run this SQL in Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  phone text,
  country_of_origin text,
  created_at timestamp with time zone default now()
);

-- Businesses
create table businesses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  business_name text not null,
  legal_structure text, -- LLC, Corp, etc
  state text,
  ein text,
  status text default 'forming',
  created_at timestamp with time zone default now()
);

-- Orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  package_tier text, -- starter, growth, premium
  amount numeric(10,2),
  status text default 'pending',
  stripe_payment_id text,
  created_at timestamp with time zone default now()
);

-- Services delivered
create table services (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade,
  service_type text, -- llc, website, phone, etc
  status text default 'pending',
  completed_at timestamp with time zone
);

-- Documents
create table documents (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references businesses(id) on delete cascade,
  document_type text,
  file_url text,
  uploaded_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table businesses enable row level security;
alter table orders enable row level security;
alter table services enable row level security;
alter table documents enable row level security;

-- Policies (users can only see their own data)
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can view own businesses" on businesses
  for select using (auth.uid() = user_id);

create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);
```

### 3. Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...

# Resend (email)
RESEND_API_KEY=re_...

# Twilio (SMS/phone)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `api/.env`:

```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJxxx...
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Run Locally

```bash
# Terminal 1: Frontend
npm run dev
# → http://localhost:3000

# Terminal 2: Backend
cd api
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs
```

---

## 📦 Deploy (30 Minutes)

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, add env variables in Vercel dashboard
```

### Backend → Railway

1. Go to [railway.app](https://railway.app) → New Project
2. Deploy from GitHub repo (select `/api` folder)
3. Add environment variables in Railway dashboard
4. Railway gives you: `https://your-app.railway.app`

### Database → Supabase

Already done! Free tier includes:
- 500MB database
- 1GB file storage
- 50k monthly active users
- 2GB bandwidth

---

## 💰 Pricing & Revenue Model

### Service Packages

| Package | Price | Services | Margin |
|---------|-------|----------|--------|
| **Starter** | $997 | LLC + EIN + Basic Website + Phone | ~70% |
| **Growth** | $2,497 | Everything + Branding + SEO | ~65% |
| **Premium** | $4,997 | Everything + AI + Marketing + Coaching | ~60% |

### Monthly Add-Ons (Recurring Revenue)

- Website Hosting: $29/mo
- AI Chatbot: $97/mo
- Bookkeeping: $297/mo
- Social Media: $497/mo
- SEO: $697/mo

**Target**: 40% of clients buy at least 1 add-on

### First Year Projection (Solo)

```
Month 1-3: 5 clients/mo × $2,000 = $10K/mo → $30K
Month 4-6: 15 clients/mo × $2,200 = $33K/mo → $99K
Month 7-9: 30 clients/mo × $2,500 = $75K/mo → $225K
Month 10-12: 50 clients/mo × $2,500 = $125K/mo → $375K

Year 1 Total: ~$729K revenue
Costs: ~$150K (tools, contractors, ads)
Net Profit: ~$579K
```

---

## 🎨 Key Features

### 1. LLC Formation Automation

```python
# api/routers/llc.py
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

@router.post("/formation")
async def create_llc(business_data: dict):
    """Submit LLC formation via ZenBusiness API"""
    
    # ZenBusiness API integration
    response = requests.post(
        "https://api.zenbusiness.com/v1/llc/formation",
        headers={"Authorization": f"Bearer {ZENBUSINESS_KEY}"},
        json={
            "business_name": business_data["name"],
            "state": business_data["state"],
            "registered_agent": True,
            "ein": True
        }
    )
    
    if response.status_code == 200:
        # Save to Supabase
        supabase.table("businesses").insert({
            "user_id": business_data["user_id"],
            "business_name": business_data["name"],
            "state": business_data["state"],
            "status": "processing"
        }).execute()
        
        return {"status": "success", "order_id": response.json()["id"]}
    
    raise HTTPException(status_code=400, detail="Formation failed")
```

### 2. AI Chatbot Service

```typescript
// app/api/chatbot/route.ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { message, businessId } = await req.json()
  
  // Get business context from Supabase
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a customer service assistant for ${business.business_name}, 
        a ${business.industry} business. Answer questions professionally.`
      },
      { role: 'user', content: message }
    ]
  })
  
  return Response.json({ reply: completion.choices[0].message.content })
}
```

### 3. Stripe Checkout

```typescript
// app/api/checkout/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { packageTier, userId } = await req.json()
  
  const prices = {
    starter: 99700,   // $997
    growth: 249700,   // $2,497
    premium: 499700   // $4,997
  }
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: `${packageTier} Package` },
        unit_amount: prices[packageTier]
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { userId, packageTier }
  })
  
  return Response.json({ url: session.url })
}
```

---

## 🎯 Marketing (Solo Founder Style)

### Content Marketing (Free)

```bash
# Blog posts (SEO)
- "How to Start LLC as Nigerian Immigrant in USA"
- "Ethiopian Entrepreneurs Guide to US Business"
- "Best States for African-Owned Businesses"

# YouTube videos (2x/week)
- Tutorials in English + French + Amharic
- Success story interviews
- Tips and Q&A

# Twitter/X (daily)
- Quick tips
- Immigration news
- Success stories
- Community building
```

### Paid Ads (Start $500/mo)

```yaml
Facebook/Instagram Ads: $300/mo
  Targeting: African diaspora, 25-45, USA, interested in entrepreneurship
  
Google Ads: $200/mo
  Keywords: "immigrant business usa", "LLC for Africans", "Nigerian business USA"

Budget increase: +$200/mo as revenue grows
```

### Community Partnerships (Free)

- African community centers → free workshops
- Churches/mosques → Sunday announcements
- Immigration lawyers → referral program (10% commission)
- African restaurants → leave flyers

### Referral Program

```
Give $200 → Get $200
Client refers friend → both get $200 credit
```

---

## 🛠️ Solo Founder Tools

### Essential ($50-100/mo)

```yaml
Development:
  - Cursor AI: $20/mo (coding assistant)
  - GitHub: Free
  
Hosting:
  - Vercel: $20/mo (Pro plan)
  - Railway: $20/mo (backend)
  - Supabase: Free → $25/mo (Pro)
  
Email:
  - Resend: Free → $20/mo
  
Design:
  - Figma: Free
  - Canva Pro: $13/mo
  
Communication:
  - Twilio: Pay-as-you-go (~$50/mo)
  - Cal.com: Free (scheduling)
  
Analytics:
  - Vercel Analytics: Free
  - Google Analytics: Free
  
Payments:
  - Stripe: 2.9% + 30¢ per transaction
```

### Nice to Have (Later)

```yaml
- Zapier: $20/mo (automation)
- Notion: $8/mo (docs/tasks)
- Linear: $8/mo (issue tracking)
- Plausible: $9/mo (privacy-friendly analytics)
```

---

## 📈 Metrics to Track

```typescript
// Simple analytics in Supabase
{
  weekly_signups: 0,
  conversion_rate: 0,
  mrr: 0,
  churn_rate: 0,
  avg_order_value: 0,
  customer_lifetime_value: 0
}
```

**North Star Metric**: Businesses Successfully Launched

---

## 🐛 Common Issues & Fixes

### Supabase Auth Issues
```bash
# Make sure RLS policies are set
# Check if NEXT_PUBLIC_ prefix is correct
```

### Stripe Webhook Failing
```bash
# Use ngrok for local testing
ngrok http 3000

# Update webhook URL in Stripe dashboard
```

### API CORS Errors
```python
# api/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://gbaki-digital.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 To-Do List (MVP)

### Week 1-2
- [x] Setup Supabase
- [x] Basic auth (email/password)
- [x] Landing page
- [ ] Pricing page
- [ ] Stripe integration

### Week 3-4
- [ ] Dashboard UI
- [ ] LLC formation integration
- [ ] Document upload
- [ ] Email notifications

### Week 5-6
- [ ] Website builder (5 templates)
- [ ] AI chatbot setup
- [ ] Admin panel

### Week 7-8
- [ ] Beta testing (10 users)
- [ ] Bug fixes
- [ ] Polish UI/UX

---

## 💡 Revenue Optimization Tips

1. **Upsell Add-Ons**: 40% should buy at least one
2. **Payment Plans**: Offer 3-month installments (+5% fee)
3. **Annual Subscriptions**: 12 months for price of 10
4. **Referral Bonuses**: $200 credit for successful referrals
5. **Package Bundling**: Premium gets 6 months free add-ons

---

## 📧 Contact

**Solo Founder**: [Your Name]
- Email: hello@gbakidigital.com
- Twitter: [@gbakidigital](https://twitter.com/gbakidigital)
- Discord: [Join Community](https://discord.gg/gbakidigital)

---

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org)
- [FastAPI](https://fastapi.tiangolo.com)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Railway](https://railway.app)
- [shadcn/ui](https://ui.shadcn.com)

---

**Made with ❤️ by a solo founder for African immigrant entrepreneurs**

*Let's build something amazing together* 🚀
