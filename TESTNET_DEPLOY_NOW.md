# Deploy to Testnet NOW - Quick Guide

## Step 1: Get Testnet STX (2 minutes)

1. **Get your wallet address** from your Stacks wallet
2. **Visit the faucet:** https://explorer.hiro.so/sandbox/faucet?chain=testnet
3. **Paste your address** and request STX
4. **Wait ~30 seconds** for confirmation

## Step 2: Add Your Mnemonic (1 minute)

1. **Get your seed phrase** from your wallet:
   - Hiro Wallet: Settings → View Secret Key
   - Leather: Settings → Show Recovery Phrase
   - Xverse: Settings → Show Recovery Phrase

2. **Edit `settings/Testnet.toml`** (currently open in your editor!)

3. **Replace** `YOUR_WALLET_MNEMONIC_HERE` with your actual 12 or 24 words:

```toml
[accounts.deployer]
mnemonic = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
```

**Example format:**
```toml
mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin"
```

⚠️ Make sure:
- All words are lowercase
- Words separated by single spaces
- No extra spaces at start/end
- No quotes around individual words

## Step 3: Generate Deployment Plan (30 seconds)

```bash
clarinet deployments generate --testnet --medium-cost
```

This will:
- Create `deployments/default.testnet-plan.yaml`
- Show estimated deployment cost
- Validate your contract

## Step 4: Deploy! (1 minute)

```bash
clarinet deployments apply --testnet
```

You'll see:
```
✓ Contract deployed successfully
Transaction ID: 0xabc123...
Contract: ST2ABC...XYZ.stacks-pay-proof
```

## Step 5: Verify Deployment (30 seconds)

Visit the explorer:
```
https://explorer.hiro.so/?chain=testnet
```

Search for your transaction ID or contract address.

## Step 6: Save Your Contract Address

Copy your contract address (format: `ST2XXX...XXX.stacks-pay-proof`)

Update `web/src/config.ts`:
```typescript
export const CONFIG = {
  CONTRACT_ADDRESS: 'YOUR_TESTNET_ADDRESS',
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'testnet', // ← Keep as testnet for now
  // ...
};
```

## Step 7: Test Your Contract

Try calling a function:

```bash
clarinet console --testnet
```

Then in the console:
```clarity
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof get-counters)
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof register-merchant "Test Store")
```

## Complete Commands

```bash
# 1. Generate plan
clarinet deployments generate --testnet --medium-cost

# 2. Deploy
clarinet deployments apply --testnet

# 3. Test in console
clarinet console --testnet
```

## Troubleshooting

### "Invalid mnemonic"
- Check you copied all words correctly
- Verify no extra spaces
- Make sure words are lowercase
- Count should be 12, 15, 18, 21, or 24 words

### "Insufficient balance"
- Get more testnet STX from faucet
- Wait for faucet transaction to confirm
- Try `--low-cost` instead

### "Contract already exists"
- You already deployed it!
- Check explorer for your contract
- Or change contract name in `Clarinet.toml`

## After Testnet Success

Once testnet works:
1. Test your contract functions
2. Update web app config
3. Test web app with testnet
4. Then deploy to mainnet using same process!

---

**Ready?** Start with Step 1 above! 🚀

**Total time: ~5 minutes**
