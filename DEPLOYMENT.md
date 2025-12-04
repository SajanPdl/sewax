# SEWAX - Deployment & Infrastructure Guide

## 1. Project Overview

**Sewax** is a multi-tenant website builder and SaaS platform designed for Nepal. It allows users to:
- Create and manage websites using a visual editor
- Choose from templates and customize them
- Manage billing, teams, and custom domains
- Access admin panels for super-admins and tenant owners

## 2. Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router 6.22.3** - Client-side routing
- **Framer Motion 11.0.14** - Animations
- **Lucide React 0.358.0** - Icons
- **Recharts 2.12.3** - Analytics charts
- **Lottie React 2.4.0** - Lottie animations
- **TypeScript ~5.8.2** - Type safety
- **Tailwind CSS** (assumed from class names) - Styling
- **Vite 6.2.0** - Build tool

### Backend (To be implemented)
- **Node.js / Express** (recommended)
- **PostgreSQL** or **MongoDB** for data storage
- **Stripe API** for billing
- **eSewa & Khalti APIs** for Nepali payment processing
- **Let's Encrypt / Cloudflare** for SSL certificates
- **Docker** for containerization

### Infrastructure
- **AWS / DigitalOcean / Vercel** for hosting
- **S3 / CloudFront** for static assets
- **PostgreSQL / MongoDB Atlas** for databases
- **Redis** for caching and sessions
- **GitHub Actions** for CI/CD

## 3. Database Schema (Conceptual)

```sql
-- Tenants (accounts/organizations)
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  subdomain VARCHAR(255) UNIQUE,
  plan_id UUID,
  status ENUM('active', 'suspended', 'canceled'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  tenant_id UUID REFERENCES tenants(id),
  role ENUM('owner', 'admin', 'editor', 'viewer'),
  created_at TIMESTAMP
);

-- Sites
CREATE TABLE sites (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name VARCHAR(255),
  subdomain VARCHAR(255),
  custom_domain VARCHAR(255),
  status ENUM('draft', 'published'),
  template_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Pages
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  title VARCHAR(255),
  slug VARCHAR(255),
  content JSONB, -- Store as JSON for flexibility
  published BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Subscriptions/Billing
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  plan_id UUID,
  status ENUM('active', 'canceled', 'past_due'),
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  subscription_id UUID,
  amount INT, -- in cents
  currency VARCHAR(3),
  status ENUM('paid', 'unpaid', 'refunded'),
  stripe_invoice_id VARCHAR(255),
  created_at TIMESTAMP,
  due_at TIMESTAMP
);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  role ENUM('owner', 'admin', 'editor', 'viewer'),
  invited_at TIMESTAMP,
  accepted_at TIMESTAMP
);

-- Domains / SSL
CREATE TABLE domains (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  domain VARCHAR(255),
  verified BOOLEAN,
  ssl_status ENUM('pending', 'issued', 'failed'),
  ssl_cert_expires TIMESTAMP,
  created_at TIMESTAMP
);

-- API Keys (for future API access)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  key VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  last_used TIMESTAMP,
  created_at TIMESTAMP
);
```

## 4. Multi-Tenancy Architecture

### Tenant Isolation
- Each tenant has a unique subdomain: `tenant-name.sewax.io`
- Custom domains can be mapped to sites within a tenant
- Database uses `tenant_id` for row-level security (RLS)
- Files/media are stored in tenant-specific S3 prefixes: `s3://bucket/tenant-{id}/`

### URL Structure
```
Public pages:    https://sewax.io/
Auth pages:      https://sewax.io/login, /signup, etc.
Tenant app:      https://app.sewax.io/ (authenticated, tenant-scoped)
Admin panel:     https://sewax.io/admin (super-admin only)
Published site:  https://tenant-name.sewax.io/ or https://custom-domain.com/
```

## 5. Deployment Steps

### Local Development
```bash
cd sewax
npm install
npm run dev
# App runs on http://localhost:3002
```

### Production Build
```bash
npm run build
# Outputs to dist/
```

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3002
CMD ["npm", "run", "preview"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3002:3002"
    environment:
      - VITE_API_URL=https://api.sewax.io
      - VITE_STRIPE_KEY=pk_test_...
    networks:
      - sewax-network

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: sewax
      POSTGRES_PASSWORD: secure_password
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - sewax-network

volumes:
  db_data:

networks:
  sewax-network:
```

### Deployment to Vercel
```bash
vercel deploy
# Frontend is deployed automatically on git push
```

### Deployment to AWS
1. **ECR:** Push Docker image to Elastic Container Registry
2. **ECS/Fargate:** Deploy containerized app
3. **RDS:** PostgreSQL database
4. **S3:** Static assets, user uploads
5. **CloudFront:** CDN for global distribution
6. **Route 53:** DNS and tenant subdomains
7. **ALB:** Application load balancer with SSL/TLS
8. **GitHub Actions:** CI/CD pipeline

## 6. SSL/TLS & Custom Domains

### Subdomain SSL (*.sewax.io)
- Wildcard certificate: `*.sewax.io`
- Issued by Let's Encrypt, renewed via Certbot or AWS Certificate Manager

### Custom Domain SSL
- Automatic provisioning with Let's Encrypt via **Greenlock** or **Certbot**
- Domain verification via DNS TXT record
- Certificate renewal every 90 days

### Implementation
```typescript
// Pseudocode for domain setup
async function setupCustomDomain(site: Site, domain: string) {
  // 1. Verify DNS ownership
  const challenge = generateDNSChallenge();
  // User adds DNS record: acme-challenge.custom-domain.com = challenge
  
  // 2. Provision SSL
  const cert = await letsEncryptAPI.provision(domain);
  
  // 3. Update DNS to point to Sewax infrastructure
  // custom-domain.com CNAME sewax.io
  
  // 4. Store domain record
  await db.domains.create({ site_id: site.id, domain, ssl_status: 'issued' });
}
```

## 7. Payment Processing

### Stripe Integration
```typescript
// Webhook handler for payment events
app.post('/webhook/stripe', async (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'customer.subscription.created':
      await activateTenantSubscription(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await cancelTenantSubscription(event.data.object);
      break;
    case 'invoice.paid':
      await recordInvoicePayment(event.data.object);
      break;
  }
});
```

### eSewa Integration (Nepal)
```typescript
// eSewa checkout flow
async function initiateEsewaPayment(tenant: Tenant, amount: number) {
  const params = {
    amt: amount,
    pdc: 0,
    psc: 0,
    txAmt: amount,
    tAmt: amount,
    pid: tenant.id,
    scd: process.env.ESEWA_MERCHANT_CODE,
    su: 'https://sewax.io/billing/success',
    fu: 'https://sewax.io/billing/failed',
  };
  return `https://esewa.com.np/epay/main?${toQueryString(params)}`;
}

// Handle eSewa callback
app.post('/webhook/esewa', async (req, res) => {
  const verified = await verifyEsewaTransaction(req.body);
  if (verified) {
    await activateSubscription(req.body.pid);
  }
});
```

### Khalti Integration (Nepal)
```typescript
// Similar to eSewa
async function initiateKhaltiPayment(tenant: Tenant, amount: number) {
  const response = await khaltiAPI.initiatePayment({
    public_key: process.env.KHALTI_PUBLIC_KEY,
    transaction_uuid: tenant.id,
    amount: amount * 100, // in paisa
    product_name: `Sewax ${tenant.plan} Plan`,
    product_url: 'https://sewax.io/pricing',
  });
  return response.payment_url;
}
```

## 8. Monitoring & Logging

### Cloud Monitoring
- **DataDog / New Relic:** APM and monitoring
- **Sentry:** Error tracking
- **CloudWatch (AWS):** Logs and metrics
- **PagerDuty:** Incident alerting

### Metrics to Track
- Uptime and latency
- User signups and active tenants
- Subscription revenue (MRR/ARR)
- Site creation and publishing rates
- Disk usage (S3 storage)
- Database performance (query times, connection pool)

## 9. Scaling Strategies

### Horizontal Scaling
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sewax-web
spec:
  replicas: 3  # Scale horizontally
  selector:
    matchLabels:
      app: sewax
  template:
    spec:
      containers:
      - name: sewax
        image: sewax:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Caching Strategy
- **Redis:** Cache frequently accessed data (user sessions, tenant config)
- **CDN (CloudFront):** Cache static assets and published site HTML
- **Browser caching:** Set appropriate cache headers

### Database Optimization
- **Indexes:** On `tenant_id`, `user_id`, `site_id`, `domain`
- **Replication:** Read replicas for analytics queries
- **Connection pooling:** PgBouncer or similar
- **Partitioning:** By `tenant_id` for large tables (sites, pages)

## 10. Backup & Disaster Recovery

### Backup Strategy
```bash
# Daily automated backups
- Database backups to S3 (incremental + full weekly)
- User uploads backed up to S3 Glacier (cold storage)
- Retention: 30 days for daily, 1 year for monthly

# Recovery Time Objective (RTO): 4 hours
# Recovery Point Objective (RPO): 1 hour
```

### Disaster Recovery Plan
1. **Database failure:** Restore from latest snapshot, failover to read replica
2. **Data loss:** Restore from S3 backups
3. **Region outage:** Switch to standby region (if set up)
4. **Security breach:** Isolate affected tenant, audit logs, notify users

## 11. Security Considerations

### Authentication
- OAuth 2.0 (Google, GitHub) with JWT tokens
- Email verification for new accounts
- CAPTCHA on signup/login
- 2FA (TOTP/authenticator apps)
- Magic link auth as alternative

### Authorization
- Role-based access control (RBAC)
- Tenant isolation via middleware
- API endpoint authorization checks
- Rate limiting on auth endpoints

### Data Protection
- HTTPS everywhere (TLS 1.3)
- Database encryption at rest
- Secrets management (HashiCorp Vault or AWS Secrets Manager)
- PII encryption (customer emails, payment details)

### Compliance
- GDPR compliance (for EU users)
- Data residency for Nepal (local backups)
- SOC 2 audit readiness
- Privacy policy and terms of service

## 12. Development Workflow

```bash
# Feature branch
git checkout -b feature/new-feature
npm run dev

# Testing
npm run test

# Build
npm run build

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# PR review → Merge → CI/CD deploys to staging → QA → Production release
```

## 13. Next Steps for Implementation

1. **Backend Setup:** Build REST API with Express/Node.js
2. **Database:** Set up PostgreSQL with migrations
3. **Auth:** Implement JWT + OAuth integrations
4. **Payments:** Integrate Stripe, eSewa, Khalti
5. **Editor:** Integrate GrapesJS or custom builder
6. **Hosting:** Deploy to Vercel, AWS, or DigitalOcean
7. **Monitoring:** Set up error tracking and analytics
8. **Documentation:** Create API docs and user guides

---

**Version:** 1.0
**Last Updated:** Dec 3, 2024
**Maintainer:** Sewax Team
