# 🚀 School ERP - Deployment Guide

## Quick Start Deployment

### Option 1: Netlify (Easiest)

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Build Project
```bash
npm run build
```

#### Step 4: Deploy
```bash
netlify deploy --prod --dir=dist
```

Your site will be live at: `https://your-site-name.netlify.app`

---

### Option 2: Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel --prod
```

Your site will be live at: `https://your-project-name.vercel.app`

---

### Option 3: GitHub Pages

#### Step 1: Create GitHub Repository
- Go to github.com
- Create new repository named `username.github.io` or `school-erp`

#### Step 2: Push Code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages
- Go to Settings > Pages
- Select main branch as source
- Site will be available at: `https://username.github.io`

---

## Production Build

### Generate Production Build
```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Preview Before Deploying
```bash
npm run preview
```

Open `http://localhost:4173` to preview the production build.

---

## Environment Configuration

### Create .env.production
```bash
# .env.production
VITE_APP_TITLE=Elevate School ERP
VITE_API_URL=https://api.your-domain.com
VITE_ENVIRONMENT=production
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANIMATIONS=true
```

---

## Platform-Specific Instructions

### Netlify Advanced Configuration

#### Create netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production]
  environment = { VITE_ENVIRONMENT = "production" }
```

### Vercel Advanced Configuration

#### Create vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_ENVIRONMENT": "production"
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## Docker Deployment

### Create Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Create .dockerignore
```
node_modules
npm-debug.log
dist
.git
.gitignore
```

### Build and Run Docker Image
```bash
# Build
docker build -t school-erp .

# Run
docker run -p 3000:3000 school-erp
```

---

## AWS Deployment

### Using AWS S3 + CloudFront

#### Step 1: Build Project
```bash
npm run build
```

#### Step 2: Create S3 Bucket
- Go to AWS S3 console
- Create bucket: `school-erp-app`
- Enable static website hosting
- Set index.html as default

#### Step 3: Upload Build
```bash
aws s3 sync dist/ s3://school-erp-app --delete
```

#### Step 4: Create CloudFront Distribution
- Origin: Your S3 bucket
- Default root object: index.html
- Enable caching

Your site: `https://d111111abcdef8.cloudfront.net`

---

## Heroku Deployment

### Step 1: Create Heroku Account
- Go to heroku.com
- Sign up for free account

### Step 2: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
choco install heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 3: Login
```bash
heroku login
```

### Step 4: Create Heroku App
```bash
heroku create your-app-name
```

### Step 5: Deploy
```bash
git push heroku main
```

---

## Manual Server Deployment

### For Traditional Hosting (cPanel, DirectAdmin, etc.)

#### Step 1: Build Project
```bash
npm run build
```

#### Step 2: Upload Files
- Connect via FTP/SSH
- Upload contents of `dist` folder
- Upload to `public_html` or `www` directory

#### Step 3: Configure .htaccess (Apache)
Create `.htaccess` in root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Step 4: Configure web.config (IIS)
Create `web.config`:
```xml
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchList" trackAllCaptures="false">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

---

## CI/CD Pipeline Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './dist'
          production-branch: main
          production-deploy: true
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: 'Deploy from GitHub Actions'
          enable-pull-request-comment: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Production build with minification
npm run build
```

### Caching Strategy
Set in deployment platform:
- HTML: No cache (revalidate)
- JS/CSS: 1 year (immutable)
- Images: 1 month (revalidate)

### CDN Configuration
- Enable gzip compression
- Enable Brotli compression
- Set cache headers
- Enable minification

---

## Security Checklist

Before Deployment:

- [ ] Remove debug code
- [ ] No sensitive data in files
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Security headers set
- [ ] No console.logs
- [ ] Dependencies updated

### Security Headers (Add to deployment)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Domain Configuration

### Connect Custom Domain (Netlify)
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records:
   ```
   Name: @
   Type: A
   Value: Netlify IP
   ```
4. Verify and wait for SSL

### Connect Custom Domain (Vercel)
1. Go to Project > Settings > Domains
2. Add custom domain
3. Update DNS records
4. Verify and enable SSL

---

## Monitoring & Analytics

### Add Google Analytics
1. Get tracking ID from Google Analytics
2. Add to HTML head or use react-ga package
3. Monitor user behavior

### Error Tracking
Use services like:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Bugsnag** - Error monitoring

---

## Rollback Procedures

### Netlify Rollback
```bash
netlify deploy --prod --dir=dist  # Deploy new version
# If issues, deploy previous build
netlify deploy --prod --dir=dist  # From older git commit
```

### Vercel Rollback
- Dashboard > Deployments
- Click on previous deployment
- Click "Redeploy"

---

## Performance Monitoring

### Lighthouse Audit
```bash
# Using npm
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

### Web Vitals
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

---

## Scaling & Load Balancing

### For High Traffic

1. **CDN Distribution**
   - Use Cloudflare
   - Use Akamai
   - Use AWS CloudFront

2. **Server Load Balancing**
   - Multiple instances
   - Load balancer (NGINX, HAProxy)
   - Health checks

3. **Database Scaling**
   - Read replicas
   - Connection pooling
   - Caching layer (Redis)

---

## Backup Strategy

### Regular Backups
- Daily snapshots
- Weekly full backups
- Monthly archives
- Off-site storage

### Git Backup
```bash
git push --all --tags origin  # Push to backup repo
```

---

## Cost Optimization

### Free Tier Options
- **Netlify**: 100GB/month bandwidth
- **Vercel**: Generous free tier
- **GitHub Pages**: Unlimited for public repos
- **AWS S3**: 12 months free tier

### Paid Plans
- **Netlify Pro**: $19-99/month
- **Vercel**: $20/month + usage
- **AWS**: Pay as you go

---

## Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working
- Check `index.html` is default document
- Verify SPA routing configured
- Check `.htaccess` or `web.config`

### Styles Not Loading
- Check CSS file paths
- Verify file permissions
- Check MIME types

### Images Not Showing
- Verify image paths relative to build
- Check file permissions
- Verify image formats supported

---

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All routes work
- [ ] Dark mode works
- [ ] Forms function correctly
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Analytics tracking
- [ ] SSL certificate valid

---

## Support & Resources

### Deployment Platforms
- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Documentation](https://docs.aws.amazon.com)
- [Heroku Documentation](https://devcenter.heroku.com)

### Performance Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://www.webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

---

## Summary

**Recommended for Quick Launch**
- Netlify (easiest setup)
- Vercel (best performance)

**Recommended for Enterprise**
- AWS + CloudFront
- Docker + Kubernetes
- Traditional hosting with CI/CD

**Estimated Deploy Time**
- Netlify: 5 minutes
- Vercel: 5 minutes
- GitHub Pages: 10 minutes
- AWS: 20 minutes
- Docker: 15 minutes

---

**Ready to Go Live!** 🚀
