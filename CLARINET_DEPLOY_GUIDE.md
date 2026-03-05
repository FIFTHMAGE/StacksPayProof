# Deploy with Clarinet - Step by Step

## Step 1: Get Your Wallet Mnemonic

Your mnemonic is your 12 or 24 word seed phrase from your Stacks wallet.

### How to Find Your Mnemonic:

**Hiro Wallet:**
1. Open Hiro Wallet extension
2. Click Settings (gear icon)
3. Click "View Secret Key"
4. Copy your 24-word seed phrase

**Leather Wallet:**
1. Open Leather Wallet
2. Go to Settings
3. Click "View Secret Key" or "Backup Wallet"
4. Copy your seed phrase

**Xverse Wallet:**
1. Open Xverse
2. Go to Settings
3. Click "Show Recovery Phrase"
4. Copy your seed phrase

⚠️ **IMPORTANT:** Never share your mnemonic with anyone! Keep it secure!

## Step 2: Configure Mainnet Settings

Edit `settings/Mainnet.toml`:

```toml
[network]
name = "mainnet"
stacks_node_rpc_address = "https://api.hiro.so"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
# Replace with your actual 12 or 24 word mnemonic
```

**Example (DO NOT USE THIS):**
```toml
[accounts.deployer]
mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
```

⚠️ **SECURITY:**
- Never commit this file to git
- Add `settings/Mainnet.toml` to `.gitignore`
- Delete the mnemonic after deployment

## Step 3: Verify You Have STX

Check your wallet has at least 0.5-1 STX for deployment fees.

## Step 4: Generate Deployment Plan

```bash
clarinet deployments generate --mainnet --medium-cost
```

This will create: `deployments/default.mainnet-plan.yaml`

Review the plan to see estimated costs.

## Step 5: Deploy to Mainnet

```bash
clarinet deployments apply --mainnet
```

Clarinet will:
1. Read your mnemonic from settings
2. Create the deployment transaction
3. Broadcast to mainnet
4. Show you the transaction ID

## Step 6: Verify Deployment

After deployment, you'll see output like:

```
✓ Contract deployed successfully
Transaction ID: 0xabc123...
Contract: SP2ABC...XYZ.stacks-pay-proof
```

Visit the explorer to verify:
```
https://explorer.hiro.so/txid/YOUR_TX_ID?chain=mainnet
```

## Step 7: Save Your Contract Address

Copy your contract address (format: `SPXXX...XXX.stacks-pay-proof`)

Update `web/src/config.ts`:
```typescript
CONTRACT_ADDRESS: 'YOUR_CONTRACT_ADDRESS_HERE',
```

## Alternative: Use Encrypted Mnemonic (More Secure)

### Encrypt Your Mnemonic

```bash
clarinet deployments encrypt
```

You'll be prompted:
1. Enter your mnemonic
2. Enter a password
3. Copy the encrypted output

### Update Settings

Replace `mnemonic` with `encrypted_mnemonic` in `settings/Mainnet.toml`:

```toml
[accounts.deployer]
encrypted_mnemonic = "47hYHSp4gtoBabz4X8cByJtRbvD3tBemS1zZJTkxYh2LJ7cVAHY6z74Td8bF5Dcsdpv45gDELPwfBP8Mfk64Q8TsBJNU9sf5hWMrTKPtr5h9abSdmxu4m2BewbUCi4o8znn42nAd7yphcb345YCrYLJFqFC7k9LqXvxgbQxUiFpWeyTVJPkGFa3aiQ8G5uhrv7pLCer4kRmXsmXbBvEqwEQLG7eM3TUMzUP79mHqJ1HGe2XWn"
```

Now when you deploy, you'll be prompted for the password instead of storing the mnemonic in plain text.

## Troubleshooting

### "Invalid mnemonic"
- Check you copied all 12 or 24 words
- Verify no extra spaces or line breaks
- Make sure words are separated by single spaces

### "Insufficient balance"
- Check your wallet has enough STX
- Try `--low-cost` instead of `--medium-cost`

### "Contract already exists"
- Change contract name in `Clarinet.toml`
- Or deploy from a different wallet

### "Network error"
- Check internet connection
- Try again in a few minutes
- Verify RPC endpoint is correct

## Complete Commands Reference

```bash
# Check contract syntax
clarinet check

# Generate testnet plan (for testing first)
clarinet deployments generate --testnet --medium-cost

# Deploy to testnet (test first!)
clarinet deployments apply --testnet

# Generate mainnet plan
clarinet deployments generate --mainnet --medium-cost

# Deploy to mainnet
clarinet deployments apply --mainnet

# Check deployment plan
cat deployments/default.mainnet-plan.yaml

# Encrypt mnemonic (recommended)
clarinet deployments encrypt
```

## Security Checklist

- [ ] Mnemonic is from correct wallet with STX
- [ ] Never shared mnemonic with anyone
- [ ] Added `settings/Mainnet.toml` to `.gitignore`
- [ ] Tested on testnet first (optional but recommended)
- [ ] Have backup of mnemonic stored securely
- [ ] Will delete mnemonic from file after deployment
- [ ] Using encrypted mnemonic (recommended)

## After Deployment

1. **Save contract address**
2. **Update web app config**
3. **Delete mnemonic from settings file** (or keep encrypted version)
4. **Test contract on mainnet**
5. **Deploy web app**

---

**Ready to deploy?** Follow the steps above!
