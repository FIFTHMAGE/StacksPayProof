# Deployment Checklist

## Pre-Deployment ✓

- [x] Contract written and tested
- [x] All tests passing (9/9)
- [x] SDK built
- [x] Web app configured
- [x] Documentation complete

## Testnet Deployment

### Step 1: Get Testnet STX
- [ ] Create/connect Stacks wallet
- [ ] Visit https://explorer.hiro.so/sandbox/faucet?chain=testnet
- [ ] Request testnet STX (you'll need ~0.5 STX for deployment)
- [ ] Wait for confirmation

### Step 2: Deploy Contract (Choose ONE method)

#### Option A: Hiro Platform (Easiest - Recommended)
- [ ] Visit https://platform.hiro.so/
- [ ] Connect your wallet
- [ ] Create new project
- [ ] Upload `contracts/stacks-pay-proof.clar`
- [ ] Set contract name: `stacks-pay-proof`
- [ ] Click Deploy to Testnet
- [ ] Confirm transaction in wallet
- [ ] Wait for confirmation
- [ ] Copy deployed contract address

#### Option B: Stacks Explorer
- [ ] Visit https://explorer.hiro.so/sandbox/deploy?chain=testnet
- [ ] Connect your wallet
- [ ] Copy/paste contract code from `contracts/stacks-pay-proof.clar`
- [ ] Set contract name: `stacks-pay-proof`
- [ ] Click Deploy
- [ ] Confirm transaction
- [ ] Copy deployed contract address

#### Option C: Clarinet CLI
- [ ] Set up wallet in `settings/Testnet.toml`
- [ ] Run `clarinet deployments generate --testnet`
- [ ] Run `clarinet deployments apply -p deployments/default.testnet-plan.yaml`
- [ ] Copy deployed contract address

### Step 3: Verify Deployment
- [ ] Visit https://explorer.hiro.so/?chain=testnet
- [ ] Search for your transaction ID
- [ ] Confirm contract is deployed
- [ ] Note your contract address (format: YOUR_ADDRESS.stacks-pay-proof)

### Step 4: Update Configuration

#### Update SDK
- [ ] Edit `sdk/src/index.ts` or create config
- [ ] Set `contractAddress` to your deployed address
- [ ] Rebuild SDK: `cd sdk && npm run build`

#### Update Web App
- [ ] Edit `web/src/config.ts`
- [ ] Set `CONTRACT_ADDRESS` to your deployed address
- [ ] Verify `NETWORK` is set to 'testnet'

### Step 5: Test Deployment

#### Test with Clarinet Console
```bash
clarinet console --testnet
```

```clarity
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof register-merchant "Test Store")
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof record-payment u1 u1000 "STX" "ref-1")
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof verify-receipt u1)
```

#### Test with Web App
- [ ] Run `cd web && npm run dev`
- [ ] Visit http://localhost:5173
- [ ] Connect wallet
- [ ] Try registering a merchant
- [ ] Try recording a payment
- [ ] View a receipt

### Step 6: Create Example Data
- [ ] Register 2-3 test merchants
- [ ] Record 5-10 test payments
- [ ] Verify receipts work
- [ ] Share receipt URLs

## Web App Deployment

### Deploy to Vercel
- [ ] Create Vercel account
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `cd web && vercel`
- [ ] Follow prompts
- [ ] Note deployed URL

### Deploy to Netlify
- [ ] Create Netlify account
- [ ] Install Netlify CLI: `npm i -g netlify-cli`
- [ ] Run `cd web && npm run build`
- [ ] Run `netlify deploy --prod`
- [ ] Note deployed URL

## SDK Publishing

### Publish to npm
- [ ] Create npm account at https://www.npmjs.com/
- [ ] Run `npm login`
- [ ] Update `sdk/package.json` version if needed
- [ ] Run `cd sdk && npm publish --access public`
- [ ] Verify at https://www.npmjs.com/package/@stackspayproof/sdk

## GitHub Repository

### Create Repository
- [ ] Create repo at https://github.com/new
- [ ] Name: `stacks-pay-proof` or `stackspayproof`
- [ ] Add description: "Onchain payment receipt protocol on Stacks"
- [ ] Make it public
- [ ] Don't initialize with README (we have one)

### Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/stacks-pay-proof.git
git branch -M main
git push -u origin main
```

- [ ] Push code to GitHub
- [ ] Add topics: stacks, blockchain, clarity, payment, receipt
- [ ] Update README with deployed addresses
- [ ] Add GitHub repo URL to package.json

## Documentation Updates

- [ ] Update README.md with deployed contract address
- [ ] Update SDK README with real examples
- [ ] Add deployed web app URL to README
- [ ] Create CHANGELOG.md
- [ ] Add screenshots to README (optional)

## Marketing & Activity

### Generate Onchain Activity
- [ ] Share project on Twitter/X
- [ ] Post in Stacks Discord
- [ ] Share on Stacks subreddit
- [ ] Create demo video (optional)
- [ ] Write blog post (optional)

### Encourage Usage
- [ ] Share receipt URLs
- [ ] Invite others to test
- [ ] Create example integrations
- [ ] Add to Stacks ecosystem list

## Monitoring

- [ ] Monitor contract transactions on explorer
- [ ] Track npm downloads
- [ ] Watch GitHub stars/forks
- [ ] Check for issues/PRs
- [ ] Monitor web app usage

## Success Metrics

Track these for leaderboard:
- [ ] Contract transactions: _____
- [ ] Merchants registered: _____
- [ ] Payments recorded: _____
- [ ] npm downloads: _____
- [ ] GitHub stars: _____
- [ ] Web app visits: _____

## Mainnet Deployment (Future)

When ready for mainnet:
- [ ] Audit contract (recommended)
- [ ] Get real STX for deployment
- [ ] Deploy to mainnet
- [ ] Update all configs to mainnet
- [ ] Announce mainnet launch

---

## Quick Reference

**Contract File:** `contracts/stacks-pay-proof.clar`
**Contract Name:** `stacks-pay-proof`
**Network:** Testnet
**Deployed Address:** `_________________` (fill in after deployment)
**Web App URL:** `_________________` (fill in after deployment)
**npm Package:** `@stackspayproof/sdk`
**GitHub Repo:** `_________________` (fill in after creation)

---

## Need Help?

- Clarinet Docs: https://docs.hiro.so/clarinet/
- Stacks Docs: https://docs.stacks.co/
- Discord: https://discord.gg/stacks
- Forum: https://forum.stacks.org/

Good luck! 🚀
