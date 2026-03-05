# 🚀 Mainnet Production Deployment Guide

## ⚠️ Important - Read First!

Mainnet deployment uses REAL STX and creates a permanent, immutable contract. Make sure:
- ✅ All tests pass (run `npm test`)
- ✅ Contract has been tested on testnet
- ✅ You have reviewed the contract code carefully
- ✅ You have enough STX for deployment (~0.5-1 STX)
- ✅ Consider getting a security audit for production use

## Prerequisites

1. **Stacks Wallet with Real STX**
   - You'll need ~0.5-1 STX for deployment
   - Buy STX on exchanges like Coinbase, Binance, OKX, etc.
   - Transfer to your Stacks wallet

2. **Wallet Options**
   - Hiro Wallet (browser extension)
   - Leather Wallet (browser extension)
   - Xverse Wallet (mobile/browser)

## Deployment Options

### Option 1: Hiro Platform (Recommended - Easiest)

1. **Visit Hiro Platform**
   - Go to: https://platform.hiro.so/
   - Click "Sign In" or "Get Started"

2. **Connect Wallet**
   - Connect your Stacks wallet
   - Make sure you're on MAINNET (not testnet)

3. **Create Project**
   - Click "New Project"
   - Name: "StacksPayProof"
   - Description: "Onchain payment receipt protocol"

4. **Upload Contract**
   - Click "Add Contract"
   - Upload `contracts/stacks-pay-proof.clar`
   - Or paste the contract code
   - Set contract name: `stacks-pay-proof`

5. **Deploy to Mainnet**
   - Click "Deploy"
   - Select "Mainnet"
   - Review transaction details
   - Confirm in your wallet
   - Wait for confirmation (2-10 minutes)

6. **Save Contract Address**
   - Copy your deployed contract address
   - Format: `YOUR_ADDRESS.stacks-pay-proof`
   - Save this - you'll need it!

### Option 2: Stacks Explorer

1. **Visit Explorer**
   - Go to: https://explorer.hiro.so/sandbox/deploy?chain=mainnet
   - ⚠️ Make sure it says "mainnet" not "testnet"

2. **Connect Wallet**
   - Click "Connect Wallet"
   - Approve connection
   - Verify you're on mainnet

3. **Deploy Contract**
   - Open `contracts/stacks-pay-proof.clar`
   - Copy ALL the contract code
   - Paste into the "Contract code" field
   - Set "Contract name": `stacks-pay-proof`
   - Click "Deploy contract"
   - Confirm transaction (~0.5 STX fee)
   - Wait for confirmation

4. **Verify Deployment**
   - Transaction will appear in explorer
   - Wait for confirmation
   - Copy your contract address

### Option 3: Clarinet CLI

1. **Setup Mainnet Account**

Edit `settings/Mainnet.toml`:

```toml
[network]
name = "mainnet"

[accounts.deployer]
mnemonic = "YOUR_MAINNET_WALLET_MNEMONIC"
# KEEP THIS SECURE! Never commit to git!
```

2. **Generate Deployment Plan**

```bash
clarinet deployments generate --mainnet
```

3. **Review Plan**

Check `deployments/default.mainnet-plan.yaml`

4. **Deploy**

```bash
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
```

5. **Confirm Transaction**

Follow prompts and confirm in wallet.

## After Mainnet Deployment

### 1. Update Configuration

**Update SDK (`sdk/src/index.ts` or create config):**

```typescript
const client = new StacksPayProof({
  network: 'mainnet',  // ← Changed to mainnet
  contractAddress: 'YOUR_MAINNET_ADDRESS',  // ← Your deployed address
  contractName: 'stacks-pay-proof'
});
```

**Update Web App (`web/src/config.ts`):**

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: 'YOUR_MAINNET_ADDRESS',  // ← Your deployed address
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'mainnet' as 'testnet' | 'mainnet',  // ← Changed to mainnet
  
  TESTNET_API: 'https://api.testnet.hiro.so',
  MAINNET_API: 'https://api.hiro.so',
};
```

### 2. Rebuild SDK

```bash
cd sdk
npm run build
```

### 3. Test on Mainnet

⚠️ **Use small amounts for testing!**

```javascript
// Test with real but small amounts
await client.registerMerchant('Test Store', privateKey);
await client.recordPayment(1, 100, 'STX', 'test-ref', privateKey);
```

### 4. Verify on Explorer

Visit: https://explorer.hiro.so/txid/YOUR_TX_ID?chain=mainnet

Check that:
- Contract is deployed
- Functions are callable
- Events are emitted

## Deploy Web App to Production

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login**

```bash
vercel login
```

3. **Deploy**

```bash
cd web
vercel --prod
```

4. **Follow Prompts**
   - Set up project
   - Configure build settings
   - Deploy!

5. **Get URL**
   - Vercel will give you a URL like: `stackspayproof.vercel.app`
   - You can add a custom domain later

### Option 2: Netlify

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login**

```bash
netlify login
```

3. **Build**

```bash
cd web
npm run build
```

4. **Deploy**

```bash
netlify deploy --prod
```

5. **Follow Prompts**
   - Publish directory: `dist`
   - Confirm deployment

### Option 3: GitHub Pages

1. **Install gh-pages**

```bash
cd web
npm install --save-dev gh-pages
```

2. **Add to package.json**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/stacks-pay-proof"
}
```

3. **Deploy**

```bash
npm run deploy
```

### Option 4: Custom Server

Build and deploy to your own server:

```bash
cd web
npm run build
# Upload dist/ folder to your server
```

## Publish SDK to npm

1. **Update Version**

Edit `sdk/package.json`:

```json
{
  "version": "1.0.0",  // ← Update version
  "description": "JavaScript SDK for StacksPayProof - Mainnet Ready"
}
```

2. **Build**

```bash
cd sdk
npm run build
```

3. **Login to npm**

```bash
npm login
```

4. **Publish**

```bash
npm publish --access public
```

5. **Verify**

Visit: https://www.npmjs.com/package/@stackspayproof/sdk

## Update Documentation

### Update README.md

```markdown
## Mainnet Deployment

Contract Address: `YOUR_MAINNET_ADDRESS.stacks-pay-proof`
Network: Mainnet
Web App: https://your-app-url.vercel.app
npm Package: @stackspayproof/sdk

## Installation

\`\`\`bash
npm install @stackspayproof/sdk
\`\`\`

## Usage

\`\`\`javascript
import StacksPayProof from '@stackspayproof/sdk';

const client = new StacksPayProof({
  network: 'mainnet',
  contractAddress: 'YOUR_MAINNET_ADDRESS',
  contractName: 'stacks-pay-proof'
});
\`\`\`
```

## Security Checklist

Before going live:

- [ ] All tests passing
- [ ] Contract tested on testnet
- [ ] Code reviewed
- [ ] No hardcoded private keys
- [ ] Environment variables secured
- [ ] Error handling tested
- [ ] Consider security audit
- [ ] Rate limiting on web app (if needed)
- [ ] Monitor contract activity

## Post-Deployment

### Monitor Your Contract

- Check transactions: https://explorer.hiro.so/?chain=mainnet
- Monitor for errors
- Track usage metrics
- Watch for unusual activity

### Announce Launch

- [ ] Tweet about launch
- [ ] Post in Stacks Discord
- [ ] Share on Reddit (r/stacks)
- [ ] Update GitHub README
- [ ] Add to Stacks ecosystem lists
- [ ] Create launch blog post

### Marketing

- Share your web app URL
- Create demo videos
- Write tutorials
- Engage with community
- Respond to feedback

## Costs

**Mainnet Deployment:**
- Contract deployment: ~0.5-1 STX
- Each transaction: ~0.001-0.01 STX (varies)

**Web Hosting:**
- Vercel: Free tier available
- Netlify: Free tier available
- Custom server: Varies

**npm Publishing:**
- Free

## Troubleshooting

**"Insufficient balance"**
- Buy more STX
- Check you're on mainnet
- Verify wallet connection

**"Contract name already exists"**
- Someone deployed with that name from your address
- Choose a different name
- Or deploy from different address

**"Transaction failed"**
- Check STX balance
- Verify contract syntax
- Try again with higher fee

**Web app not connecting**
- Verify config.ts has correct mainnet address
- Check wallet is on mainnet
- Clear browser cache

## Rollback Plan

If issues arise:
1. Don't panic - contract is immutable
2. Deploy a new version with fixes
3. Update SDK and web app to point to new contract
4. Communicate changes to users

## Support

- Stacks Discord: https://discord.gg/stacks
- Stacks Forum: https://forum.stacks.org/
- GitHub Issues: Create issues in your repo

## Next Steps

1. ✅ Deploy contract to mainnet
2. ✅ Update all configurations
3. ✅ Deploy web app
4. ✅ Publish SDK to npm
5. ✅ Update documentation
6. ✅ Announce launch
7. ✅ Monitor and maintain

---

**Congratulations on going to production! 🎉**

Your StacksPayProof protocol is now live on Stacks mainnet!
