# 🚀 Deploy to Production NOW - Step by Step

## ✅ Pre-Deployment Checklist

- [x] All tests passing (9/9)
- [x] Web app builds successfully
- [x] Verification meta tag added
- [x] Configuration files ready
- [x] Documentation complete

## Step 1: Deploy Smart Contract to Mainnet (5 minutes)

### Quick Deploy via Hiro Platform

1. **Go to:** https://platform.hiro.so/
2. **Sign in** with your Stacks wallet
3. **Make sure you have ~1 STX** in your wallet
4. **Create new project** → Name it "StacksPayProof"
5. **Add contract:**
   - Click "Add Contract"
   - Upload `contracts/stacks-pay-proof.clar`
   - Name: `stacks-pay-proof`
6. **Deploy to Mainnet:**
   - Click "Deploy"
   - Select "Mainnet"
   - Confirm transaction (~0.5 STX)
   - Wait 2-5 minutes
7. **SAVE YOUR CONTRACT ADDRESS!**
   - Format: `SPXXX...XXX.stacks-pay-proof`
   - You'll need this!

## Step 2: Update Configuration (1 minute)

**Edit `web/src/config.ts`:**

Replace line 3 with your deployed contract address:

```typescript
CONTRACT_ADDRESS: 'YOUR_MAINNET_ADDRESS_HERE', // ← Paste your address!
```

Save the file.

## Step 3: Deploy Web App to Vercel (3 minutes)

### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **stackspayproof** (or your choice)
- Directory? **./web**
- Override settings? **N**

You'll get a URL like: `stackspayproof.vercel.app`

### Option B: Vercel Web UI

1. Go to: https://vercel.com/new
2. Import your GitHub repo (or upload files)
3. Configure:
   - Framework: Vite
   - Root Directory: `web`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click "Deploy"
5. Wait 1-2 minutes

### Option C: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd web
npm run build
netlify deploy --prod
```

## Step 4: Publish SDK to npm (2 minutes)

```bash
# Go to SDK directory
cd sdk

# Login to npm (create account at npmjs.com if needed)
npm login

# Publish
npm publish --access public
```

Your SDK is now at: `@stackspayproof/sdk`

## Step 5: Test Everything (2 minutes)

1. **Visit your deployed web app**
2. **Connect wallet** (make sure it's on mainnet!)
3. **Register a test merchant**
4. **Record a test payment** (use small amount!)
5. **Verify receipt works**

## Step 6: Announce! 🎉

Share your launch:

**Twitter/X:**
```
🚀 Just launched StacksPayProof on @Stacks!

Onchain payment receipt protocol - every payment gets a verifiable receipt stored on the blockchain.

✅ Smart contract deployed
✅ Web app live
✅ SDK on npm

Try it: [YOUR_URL]

#Stacks #Bitcoin #Web3
```

**Discord:**
Post in Stacks Discord #showcase channel

**Reddit:**
Post in r/stacks

## 📋 Post-Deployment Checklist

- [ ] Contract deployed to mainnet
- [ ] Contract address saved
- [ ] Web app deployed
- [ ] Web app tested
- [ ] SDK published to npm
- [ ] README updated with live URLs
- [ ] Launch announced
- [ ] GitHub repo created/updated

## 🔗 Your Live URLs

Fill these in after deployment:

- **Contract:** `_______________________`
- **Web App:** `_______________________`
- **npm Package:** `@stackspayproof/sdk`
- **GitHub:** `_______________________`

## 📊 Monitor Your Deployment

- **Contract Activity:** https://explorer.hiro.so/?chain=mainnet
- **npm Downloads:** https://www.npmjs.com/package/@stackspayproof/sdk
- **Web Analytics:** Add Google Analytics or Vercel Analytics

## 🆘 Need Help?

- **Deployment issues?** See `MAINNET_DEPLOYMENT.md`
- **Build errors?** Check `PRODUCTION_DEPLOY.md`
- **Questions?** Open an issue on GitHub

---

## Quick Commands Reference

```bash
# Build web app
cd web && npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
cd web && netlify deploy --prod

# Publish SDK
cd sdk && npm publish --access public

# Run tests
npm test

# Check contract
clarinet check
```

---

**You're ready to go live! 🚀**

Start with Step 1 and you'll be in production in ~15 minutes!
