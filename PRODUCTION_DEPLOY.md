# 🚀 Production Deployment - Quick Guide

## Step 1: Deploy Smart Contract to Mainnet

### Using Hiro Platform (Easiest)

1. **Go to:** https://platform.hiro.so/
2. **Connect wallet** (make sure you have ~1 STX)
3. **Create new project**
4. **Upload** `contracts/stacks-pay-proof.clar`
5. **Deploy to Mainnet**
6. **Copy your contract address** (format: `SPXXX...XXX.stacks-pay-proof`)

### Using Stacks Explorer

1. **Go to:** https://explorer.hiro.so/sandbox/deploy?chain=mainnet
2. **Connect wallet** (verify it says "mainnet")
3. **Copy contract code** from `contracts/stacks-pay-proof.clar`
4. **Paste and deploy**
5. **Copy your contract address**

## Step 2: Update Configuration

**Edit `web/src/config.ts`:**

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: 'YOUR_MAINNET_ADDRESS_HERE', // ← Paste here!
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'mainnet' as 'testnet' | 'mainnet', // ← Already set
  // ...
};
```

## Step 3: Deploy Web App

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd web
vercel --prod
```

Follow the prompts. You'll get a URL like: `stackspayproof.vercel.app`

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd web
npm run build
netlify deploy --prod
```

## Step 4: Publish SDK to npm

```bash
cd sdk

# Login to npm
npm login

# Publish
npm publish --access public
```

Your SDK will be available at: `@stackspayproof/sdk`

## Step 5: Verify Everything Works

1. **Visit your deployed web app**
2. **Connect wallet** (mainnet mode)
3. **Register a test merchant**
4. **Record a test payment**
5. **Verify receipt works**

## Step 6: Announce! 🎉

- Tweet about your launch
- Share in Stacks Discord
- Post on Reddit r/stacks
- Update GitHub README with live URLs

---

## Quick Checklist

- [ ] Contract deployed to mainnet
- [ ] Contract address copied
- [ ] `web/src/config.ts` updated with mainnet address
- [ ] Web app deployed to Vercel/Netlify
- [ ] Web app tested and working
- [ ] SDK published to npm
- [ ] README updated with live URLs
- [ ] Launch announced

---

## Important URLs

**Mainnet Contract Deploy:**
- Hiro Platform: https://platform.hiro.so/
- Explorer: https://explorer.hiro.so/sandbox/deploy?chain=mainnet

**Web Hosting:**
- Vercel: https://vercel.com/
- Netlify: https://netlify.com/

**npm:**
- https://www.npmjs.com/

---

## Need Help?

See `MAINNET_DEPLOYMENT.md` for detailed instructions.

**You're ready to go live! 🚀**
