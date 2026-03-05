# After Deployment - Next Steps

## ✅ You Just Deployed! Now What?

### Step 1: Save Your Contract Address (30 seconds)

After deployment, you'll see something like:
```
Contract deployed: ST2ABC123XYZ.stacks-pay-proof
Transaction ID: 0xabc123...
```

**Copy your contract address!** You'll need it.

### Step 2: Update Web App Configuration (1 minute)

Edit `web/src/config.ts`:

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: 'ST2ABC123XYZ', // ← Paste YOUR address here (without .stacks-pay-proof)
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'testnet', // ← Keep as testnet for now
  
  TESTNET_API: 'https://api.testnet.hiro.so',
  MAINNET_API: 'https://api.hiro.so',
};
```

### Step 3: Test Your Contract (2 minutes)

Visit the explorer to verify:
```
https://explorer.hiro.so/txid/YOUR_TX_ID?chain=testnet
```

Or search for your contract address.

### Step 4: Run the Web App (1 minute)

```bash
cd web
npm run dev
```

Visit: http://localhost:5173

### Step 5: Test the Web App (3 minutes)

1. **Connect your wallet** (make sure it's on testnet!)
2. **Register a merchant:**
   - Click "Register Merchant"
   - Enter name: "Test Coffee Shop"
   - Click "Register Merchant" button
   - Confirm in wallet
   - Wait for confirmation

3. **Record a payment:**
   - Click "Record Payment"
   - Merchant ID: 1
   - Amount: 1000
   - Currency: STX
   - Reference: test-payment-001
   - Click "Record Payment"
   - Confirm in wallet

4. **View receipt:**
   - Go to "Receipt" page
   - Enter receipt ID: 1
   - See your payment receipt!

### Step 6: Deploy to Mainnet (When Ready)

Once testnet works perfectly:

1. **Get real STX** (buy from exchange)
2. **Update settings/Mainnet.toml** with your mnemonic
3. **Deploy to mainnet:**
   - Use same web interface: https://explorer.hiro.so/sandbox/deploy?chain=mainnet
   - Or use Clarinet: `clarinet deployments apply --mainnet`

4. **Update web config** to mainnet:
```typescript
NETWORK: 'mainnet',
CONTRACT_ADDRESS: 'YOUR_MAINNET_ADDRESS',
```

### Step 7: Deploy Web App to Production

```bash
# Build
cd web
npm run build

# Deploy to Vercel
vercel --prod

# Or Netlify
netlify deploy --prod
```

### Step 8: Publish SDK to npm

```bash
cd sdk
npm login
npm publish --access public
```

Your SDK will be at: `@stackspayproof/sdk`

### Step 9: Create GitHub Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - StacksPayProof"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/stacks-pay-proof.git
git branch -M main
git push -u origin main
```

### Step 10: Announce Your Launch! 🎉

**Twitter/X:**
```
🚀 Just launched StacksPayProof on @Stacks!

Onchain payment receipt protocol - every payment gets a verifiable receipt on the blockchain.

✅ Contract deployed
✅ Web app live
✅ SDK on npm

Try it: [YOUR_URL]

#Stacks #Bitcoin #Web3
```

**Discord:**
- Post in Stacks Discord #showcase channel

**Reddit:**
- r/stacks

---

## Quick Reference

### Your Deployment Info

Fill this in:
- **Testnet Contract:** `_______________________`
- **Testnet TX ID:** `_______________________`
- **Mainnet Contract:** `_______________________` (when deployed)
- **Web App URL:** `_______________________` (when deployed)
- **npm Package:** `@stackspayproof/sdk`

### Useful Commands

```bash
# Run web app locally
cd web && npm run dev

# Build web app
cd web && npm run build

# Deploy to Vercel
vercel --prod

# Publish SDK
cd sdk && npm publish --access public

# Run tests
npm test
```

### Useful Links

- **Testnet Explorer:** https://explorer.hiro.so/?chain=testnet
- **Mainnet Explorer:** https://explorer.hiro.so/?chain=mainnet
- **Vercel:** https://vercel.com/
- **npm:** https://www.npmjs.com/

---

## Troubleshooting

### Web app won't connect to contract
- Verify you updated `web/src/config.ts` with correct address
- Check wallet is on correct network (testnet/mainnet)
- Rebuild web app: `npm run build`

### Contract functions not working
- Wait for deployment to fully confirm (2-5 minutes)
- Check transaction status in explorer
- Verify wallet has STX for transaction fees

### Can't see my contract
- Search by transaction ID in explorer
- Search by your wallet address
- Wait a few minutes for indexing

---

## What You've Accomplished! 🎉

- ✅ Built a complete Clarity smart contract
- ✅ Tested with 9 passing tests
- ✅ Deployed to Stacks blockchain
- ✅ Created a JavaScript SDK
- ✅ Built a web interface
- ✅ Ready for mainnet and production!

**You're now a Stacks developer! 🚀**

---

## Next Level

Want to go further?

1. **Add features:**
   - Batch payments
   - Payment categories
   - Merchant analytics
   - Receipt templates

2. **Build integrations:**
   - E-commerce plugins
   - POS systems
   - Accounting software

3. **Create tools:**
   - Receipt indexer
   - Analytics dashboard
   - Mobile app

4. **Grow community:**
   - Write tutorials
   - Create videos
   - Help others integrate
   - Build ecosystem

**The possibilities are endless!**
