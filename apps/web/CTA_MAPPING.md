# 📋 **COMPREHENSIVE CTA MAPPING**

## **CTA BEHAVIOR MATRIX**

### **When User is NOT Logged In:**
- All "Get Started" / "Start Your Business" → `/register`
- All "View Packages" → `/#pricing` (scroll to pricing section)
- All "Buy Now" / "Get Started" on pricing cards → `/register?package={package}`
- All "Contact" / "Talk to Expert" → `/contact`
- All "Learn More" → Service pages

### **When User IS Logged In:**
- All "Get Started" / "Start Your Business" → `/checkout?package={package}` (if no order) OR `/dashboard` (if has order)
- All "View Packages" → `/#pricing` (scroll to pricing section)
- All "Buy Now" / "Get Started" on pricing cards → `/checkout?package={package}`
- All "Contact" / "Talk to Expert" → `/contact` OR `/dashboard/support`
- All "Learn More" → Service pages

---

## **CTA LOCATIONS**

### **1. HERO SECTION** (`components/marketing/Hero.tsx`)
- **"Start Your Business"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"View Packages"** button
  - Always: `/#pricing`

### **2. PRICING SECTION** (`components/marketing/Pricing.tsx`)
- **"Get Started"** (Starter package)
  - Not logged in: `/register?plan=starter`
  - Logged in: `/checkout?package=starter`
- **"Start Growing"** (Growth package)
  - Not logged in: `/register?plan=growth`
  - Logged in: `/checkout?package=growth`
- **"Go Premium"** (Premium package)
  - Not logged in: `/register?plan=premium`
  - Logged in: `/checkout?package=premium`

### **3. CTA SECTION** (`components/marketing/CTA.tsx`)
- **"Get Started Today"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"View Packages"** button
  - Always: `/#pricing`

### **4. NAVBAR** (`components/layout/Header.tsx`)
- **"Get Started"** button
  - Not logged in: `/register`
  - Logged in: `/dashboard` (show user menu instead)

### **5. SERVICE PAGES** (`app/services/*/page.tsx`)
- **"Get Started Today"** / **"Get Started Now"** buttons
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"Talk to an Expert"** / **"Contact"** buttons
  - Not logged in: `/contact`
  - Logged in: `/dashboard/support` OR `/contact`

### **6. ABOUT PAGE** (`app/about/page.tsx`)
- **"Start Your Journey"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"Get in Touch"** button
  - Not logged in: `/contact`
  - Logged in: `/dashboard/support` OR `/contact`

### **7. SUCCESS STORIES PAGE** (`app/success-stories/page.tsx`)
- **"Get Started"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"Talk to Our Team"** button
  - Not logged in: `/contact`
  - Logged in: `/dashboard/support` OR `/contact`

### **8. RESOURCES PAGE** (`app/resources/page.tsx`)
- **"Get Started"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)
- **"Contact Our Team"** button
  - Not logged in: `/contact`
  - Logged in: `/dashboard/support` OR `/contact`

### **9. HOW IT WORKS** (`components/marketing/HowItWorks.tsx`)
- **"Get Started Now"** button
  - Not logged in: `/register`
  - Logged in: `/checkout?package=starter` (if no order) OR `/dashboard` (if has order)

### **10. DASHBOARD** (`app/(dashboard)/dashboard/page.tsx`)
- **"View Packages"** (when no orders)
  - Always: `/#pricing`
- **"View Order Details"**
  - Always: `/dashboard/orders`
- **"Contact Support"**
  - Always: `/dashboard/support`

---

## **IMPLEMENTATION STRATEGY**

### **Create Smart CTA Component**
Create a reusable component that:
1. Checks if user is logged in
2. Checks if user has existing orders
3. Routes accordingly

### **Update All CTAs**
Replace hardcoded `/register` links with smart routing logic.

---

## **NEXT STEPS**
1. ✅ Create CTA mapping (this document)
2. ⏳ Create SmartCTA component
3. ⏳ Update all CTAs to use SmartCTA
4. ⏳ Create checkout page
5. ⏳ Protect checkout route
6. ⏳ Integrate Stripe

