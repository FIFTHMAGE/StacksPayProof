# 🚀 Deploy StacksPayProof NOW - 5 Minute Guide

## Step 1: Get Testnet STX (2 minutes)

1. Open your Stacks wallet (Hiro Wallet, Leather, or Xverse)
2. Switch to Testnet mode
3. Copy your testnet address
4. Visit: **https://explorer.hiro.so/sandbox/faucet?chain=testnet**
5. Paste your address and request STX
6. Wait ~30 seconds for confirmation

## Step 2: Deploy Contract (2 minutes)

### Using Stacks Explorer (Easiest!)

1. Visit: **https://explorer.hiro.so/sandbox/deploy?chain=testnet**

2. Click "Connect Wallet" and connect your wallet

3. Open `contracts/stacks-pay-proof.clar` in your editor

4. Copy ALL the contract code

5. Paste it into the "Contract code" box on the explorer

6. Set "Contract name" to: `stacks-pay-proof`

7. Click "Deploy contract"

8. Confirm the transaction in your wallet popup

9. Wait for confirmation (~1-2 minutes)

10. **IMPORTANT:** Copy your contract address from the confirmation
    - Format: `YOUR_ADDRESS.stacks-pay-proof`
    - Example: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacks-pay-proof`

## Step 3: Update Config (30 seconds)

1. Open `web/src/config.ts`

2. Replace the CONTRACT_ADDRESS with YOUR deployed address:

```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: 'YOUR_ADDRESS_HERE', // ← Paste your address here!
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'testnet' as 'testnet' | 'mainnet',
  // ... rest stays the same
};
```

3. Save the file

## Step 4: Run Your App (30 seconds)

```bash
cd web
npm run dev
```

Visit: **http://localhost:5173**

## Step 5: Test It! (1 minute)

1. Click "Register Merchant"
2. Enter a merchant name (e.g., "My Coffee Shop")
3. Click "Register Merchant" button
4. Confirm transaction in wallet
5. Wait for confirmation
6. Try recording a payment!

## 🎉 You're Live!

Your contract is now deployed on Stacks testnet and your app is running!

## What's Next?

### Generate Activity
- Register multiple merchants
- Record several payments
- Share receipt URLs with others
- Invite people to test

### Deploy Web App
```bash
cd web
npm run build
vercel deploy
```

### Publish SDK
```bash
cd sdk
npm login
npm publish --access public
```

### Create GitHub Repo
```bash
git remote add origin https://github.com/YOUR_USERNAME/stacks-pay-proof.git
git push -u origin main
```

## Troubleshooting

**"Insufficient balance"**
- Get more testnet STX from the faucet
- Wait for previous transaction to confirm

**"Contract already exists"**
- Someone already deployed with that name from your address
- Change the contract name to `stacks-pay-proof-v2` or similar

**"Transaction failed"**
- Check you have enough STX (~0.5 STX needed)
- Verify contract syntax: `clarinet check`
- Try again in a few minutes

**Web app won't connect**
- Make sure you updated `web/src/config.ts` with YOUR contract address
- Verify your wallet is on testnet mode
- Check browser console for errors

## Quick Links

- **Testnet Faucet:** https://explorer.hiro.so/sandbox/faucet?chain=testnet
- **Deploy Contract:** https://explorer.hiro.so/sandbox/deploy?chain=testnet
- **Explorer:** https://explorer.hiro.so/?chain=testnet
- **Hiro Platform:** https://platform.hiro.so/

## Contract Code Location

Your contract is in: `contracts/stacks-pay-proof.clar`

Just copy and paste it into the explorer!

---

**Need help?** Check DEPLOYMENT_CHECKLIST.md for detailed steps or TESTNET_DEPLOYMENT.md for all deployment options.

**Ready to go?** Start with Step 1 above! 🚀
