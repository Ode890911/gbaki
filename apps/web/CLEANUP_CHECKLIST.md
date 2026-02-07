# 🧹 Code Cleanup Checklist

## High Priority

### 1. Remove Console Statements
- [ ] `apps/web/providers/auth-provider.tsx` - Remove console.error on line ~55
- [ ] `apps/web/providers/websocket-provider.tsx` - Remove console.log statements
- [ ] `apps/web/app/api/newsletter/route.ts` - Remove console.log statements
- [ ] `apps/web/components/layout/CookieConsent.tsx` - Remove console.log statements
- [ ] `apps/web/components/error-boundary.tsx` - Remove console.error on line ~50 (keep for error reporting)
- [ ] `apps/web/app/error.tsx` - Remove console.error on line ~15 (keep for error reporting)
- [ ] `apps/web/app/global-error.tsx` - Remove console.error on line ~15 (keep for error reporting)

### 2. Complete TODO Items
- [ ] `apps/web/app/(dashboard)/dashboard/page.tsx` - Replace placeholder avatar URL with actual manager avatar from API
- [ ] `apps/web/components/dashboard/Sidebar.tsx` - Replace placeholder avatar URL with actual user avatar from API
- [ ] `apps/web/app/(dashboard)/dashboard/settings/page.tsx:282` - Create business API endpoint
- [ ] `apps/web/app/(dashboard)/dashboard/settings/page.tsx:667` - Implement change password endpoint
- [ ] `apps/web/app/(dashboard)/dashboard/settings/page.tsx:980` - Implement theme switching logic
- [ ] `apps/web/providers/websocket-provider.tsx` - Configure production WebSocket URL
- [ ] `apps/web/app/sitemap.ts` - Add dynamic blog routes when blog is ready
- [ ] `apps/web/components/layout/CookieConsent.tsx` - Initialize analytics when ready
- [ ] `apps/web/components/error-boundary.tsx` - Send to Sentry when configured
- [ ] `apps/web/app/error.tsx` - Send to Sentry when configured
- [ ] `apps/web/app/global-error.tsx` - Send to Sentry when configured
- [ ] `apps/web/app/(auth)/verify-email/page.tsx` - Implement resend verification email endpoint

### 3. Fix Type Assertions
Replace all `as any` with proper types:

**Files to check:**
- `apps/web/lib/api/client.ts` - Use proper AxiosRequestConfig type
- `apps/web/app/(dashboard)/dashboard/page.tsx` - Type order data properly
- `apps/web/components/marketing/Testimonials.tsx` - Type carousel data

**Example Fix:**
```typescript
// ❌ Before
const config = originalRequest as any

// ✅ After
const config = originalRequest as AxiosRequestConfig & { _retry?: boolean }
```

### 4. Environment Variables
- [ ] Add all `.env.example` variables to production
- [ ] Verify all `NEXT_PUBLIC_*` variables are set
- [ ] Check Supabase keys are correct
- [ ] Verify Stripe keys (use live keys for production)
- [ ] Set `NODE_ENV=production`

### 5. Remove Development Code
- [ ] Remove all `if (process.env.NODE_ENV === 'development')` debug code (keep error details in error pages)
- [ ] Remove test data/mock APIs
- [ ] Remove development-only routes

## Medium Priority

### 6. Performance Optimization
- [ ] Add `loading.tsx` to all route groups
- [ ] Implement React.lazy() for heavy components
- [ ] Add image optimization (next/image)
- [ ] Enable gzip compression

### 7. SEO Improvements
- [ ] Verify all pages have proper metadata
- [ ] Add structured data (JSON-LD)
- [ ] Generate sitemap dynamically
- [ ] Add robots.txt rules

### 8. Accessibility
- [ ] Run axe DevTools audit
- [ ] Add ARIA labels where missing
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios

## Low Priority

### 9. Code Organization
- [ ] Move inline styles to CSS modules
- [ ] Extract repeated components
- [ ] Organize utility functions
- [ ] Document complex functions

### 10. Testing
- [ ] Add unit tests for critical functions
- [ ] Add E2E tests for main user flows
- [ ] Test error boundaries
- [ ] Test all API integrations

## Before Deployment

### Pre-Flight Checklist
- [ ] All console.logs removed (keep console.error for error reporting)
- [ ] All TODOs addressed or documented
- [ ] Type assertions fixed
- [ ] Environment variables set
- [ ] Error boundaries in place
- [ ] Error pages working
- [ ] 404 page working
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Security headers set
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Database migrations run
- [ ] SSL certificate active

