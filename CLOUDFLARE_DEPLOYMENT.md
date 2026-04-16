# Cloudflare Pages Deployment Guide for Buvijon

## Prerequisites
- Cloudflare account with buvijon.com domain configured
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Build the Website

```bash
cd web
npm run build
```

This creates an optimized production build in the `.next` folder.

## Step 1. Configure for Static Export

**CRITICAL:** Edit `next.config.ts` to add static export (already done for you):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // ← This line enables static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

## Step 2: Push to Git Repository

```bash
git init
git add .
git commit -m "Initial Buvijon website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 3: Deploy to Cloudflare Pages

### Option A: Via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Pages**
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your Git provider (GitHub/GitLab/Bitbucket)
6. Select your repository
7. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `20.x` or latest

**Note:** The `output: 'export'` in next.config.ts creates a static build in the `out` folder.

### Option B: With Static Export (Recommended for Better Performance)

1. Update `next.config.ts` to enable static export:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. Update build command to:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`

### Option C: Via Cloudflare CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
npx wrangler login

# Deploy (must build first!)
npm run build
npx wrangler pages deploy out
```

## Step 4: Configure Custom Domain

1. In Cloudflare Pages dashboard, go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `buvijon.com`
4. Click **Activate domain**

DNS will be automatically configured via Cloudflare.

## Step 5: Environment Variables (if needed)

For production, you may want to add environment variables in Cloudflare Pages:

1. Go to project → **Settings** → **Environment variables**
2. Add any required variables (e.g., API keys for future backend)

## Verification

Once deployed, visit `https://buvijon.com` to verify:
- ✅ Website loads correctly
- ✅ All animations work
- ✅ Navigation smooth scrolls
- ✅ Responsive design on mobile

## Troubleshooting

### Issue: "404 Not Found"
- Check build output directory setting matches actual output
- Verify `next.config.ts` has correct `output` setting

### Issue: Animations not working
- Ensure JavaScript is enabled
- Check browser console for errors

### Issue: Domain not pointing
- DNS propagation may take up to 24 hours
- Verify DNS records in Cloudflare DNS section

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
