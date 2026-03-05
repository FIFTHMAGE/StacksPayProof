# Deployment Troubleshooting Guide

## Common Deployment Issues & Solutions

### Issue 1: "Contract deployment failed" or "Transaction failed"

**Possible Causes:**
1. Insufficient STX balance
2. Network congestion
3. Gas fee too low
4. Contract name already exists

**Solutions:**

**A. Check STX Balance**
- You need at least 0.5-1 STX for deployment
- Check your balance in your wallet
- Get more STX if needed

**B. Increase Gas Fee**
- Try deploying with a higher fee
- In Hiro Platform: Adjust fee slider
- In Explorer: Set custom fee

**C. Change Contract Name**
- If name exists, try: `stacks-pay-proof-v2`
- Or use a unique suffix: `stacks-pay-proof-yourname`

**D. Wait and Retry**
- Network might be congested
- Wait 5-10 minutes
- Try again

### Issue 2: "Invalid contract" or "Syntax error"

**Solution:**
The contract has been tested and is valid. This might be a copy-paste issue.

**Steps:**
1. Make sure you copied the ENTIRE contract
2. Check for any extra characters at start/end
3. Verify line endings (should be LF, not CRLF)
4. Try copying from the raw GitHub file

**Get clean contract:**
```bash
# From your local repo
cat contracts/stacks-pay-proof.clar

# Or download from GitHub
curl -o contract.clar https://raw.githubusercontent.com/YOUR_USERNAME/stacks-pay-proof/main/contracts/stacks-pay-proof.clar
```

### Issue 3: "Wallet not connected" or "Connection failed"

**Solutions:**
1. Refresh the page
2. Disconnect and reconnect wallet
3. Try a different browser
4. Clear browser cache
5. Update wallet extension
6. Try a different wallet (Hiro, Leather, Xverse)

### Issue 4: "Network error" or "RPC error"

**Solutions:**
1. Check your internet connection
2. Try a different network (WiFi vs mobile)
3. Wait a few minutes and retry
4. Use a different deployment method

### Issue 5: Contract deploys but can't interact with it

**Possible Causes:**
1. Wrong network (testnet vs mainnet)
2. Wrong contract address in config
3. Wallet on wrong network

**Solutions:**

**A. Verify Network**
- Check wallet is on correct network (mainnet/testnet)
- Check config.ts has correct network setting
- Verify contract address format matches network

**B. Update Configuration**
```typescript
// web/src/config.ts
export const CONFIG = {
  CONTRACT_ADDRESS: 'YOUR_ACTUAL_DEPLOYED_ADDRESS', // ← Check this!
  CONTRACT_NAME: 'stacks-pay-proof',
  NETWORK: 'mainnet', // ← Or 'testnet'
};
```

**C. Verify Contract Address**
- Should start with `SP` for mainnet
- Should start with `ST` for testnet
- Format: `ADDRESS.contract-name`

## Deployment Methods (Try in Order)

### Method 1: Hiro Platform (Easiest)

1. Go to: https://platform.hiro.so/
2. Sign in with wallet
3. Create project
4. Upload contract file
5. Deploy

**Pros:** Most user-friendly, visual interface
**Cons:** Requires account creation

### Method 2: Stacks Explorer

1. Go to: https://explorer.hiro.so/sandbox/deploy?chain=mainnet
2. Connect wallet
3. Paste contract code
4. Set name and deploy

**Pros:** No account needed, direct deployment
**Cons:** Must paste code manually

### Method 3: Clarinet CLI

```bash
# Generate deployment plan
clarinet deployments generate --mainnet

# Apply deployment
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
```

**Pros:** Automated, repeatable
**Cons:** Requires CLI setup and wallet config

### Method 4: Stacks.js SDK

Create a deployment script:

```javascript
// deploy.js
import { makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import fs from 'fs';

const network = new StacksMainnet();
const contractCode = fs.readFileSync('contracts/stacks-pay-proof.clar', 'utf8');

const txOptions = {
  contractName: 'stacks-pay-proof',
  codeBody: contractCode,
  senderKey: 'YOUR_PRIVATE_KEY', // KEEP SECURE!
  network,
};

const transaction = await makeContractDeploy(txOptions);
const result = await broadcastTransaction(transaction, network);
console.log('Deployed:', result);
```

Run: `node deploy.js`

**Pros:** Scriptable, can automate
**Cons:** Requires coding, private key handling

## Specific Error Messages

### "Error: Contract already exists"

**Solution:**
- Change contract name to something unique
- Or deploy from a different address
- Check if you already deployed it

### "Error: Insufficient funds"

**Solution:**
- Add more STX to your wallet
- Mainnet: Buy STX on exchange
- Testnet: Use faucet at https://explorer.hiro.so/sandbox/faucet?chain=testnet

### "Error: Fee too low"

**Solution:**
- Increase the transaction fee
- Try 0.001 STX or higher
- During congestion, may need 0.01+ STX

### "Error: Nonce conflict"

**Solution:**
- Wait for previous transaction to confirm
- Don't submit multiple transactions at once
- Check pending transactions in wallet

### "Error: Invalid principal"

**Solution:**
- Check wallet address format
- Verify you're on correct network
- Reconnect wallet

## Verification Steps

After deployment, verify it worked:

### 1. Check Transaction

Visit explorer:
- Mainnet: https://explorer.hiro.so/?chain=mainnet
- Testnet: https://explorer.hiro.so/?chain=testnet

Search for your transaction ID.

### 2. Verify Contract

Search for your contract address in explorer.
You should see:
- Contract code
- Functions list
- Transaction history

### 3. Test a Function

Try calling a read-only function:

```bash
# Using Clarinet
clarinet console --mainnet

# Then in console
(contract-call? 'YOUR_ADDRESS.stacks-pay-proof get-counters)
```

Or use the explorer's "Call function" feature.

## Still Having Issues?

### Get Help

1. **Check Contract Syntax Locally**
```bash
clarinet check
```

2. **Run Tests**
```bash
npm test
```

3. **Check GitHub Issues**
- Look for similar issues
- Open a new issue with details

4. **Ask Community**
- Stacks Discord: https://discord.gg/stacks
- Stacks Forum: https://forum.stacks.org/
- Reddit: r/stacks

### Provide These Details When Asking for Help

- Network (mainnet/testnet)
- Deployment method used
- Exact error message
- Transaction ID (if available)
- Wallet type
- Browser/OS

## Alternative: Deploy to Testnet First

If mainnet deployment keeps failing, try testnet first:

1. Switch wallet to testnet
2. Get testnet STX from faucet
3. Deploy to testnet
4. Test everything works
5. Then deploy to mainnet

**Testnet Faucet:** https://explorer.hiro.so/sandbox/faucet?chain=testnet

## Clean Contract Code

If you're having copy-paste issues, here's the contract in one block:

```clarity
;; StacksPayProof - Onchain Payment Receipt Protocol
;; Records verifiable payment receipts for merchants

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-merchant-not-found (err u101))
(define-constant err-invalid-amount (err u102))
(define-constant err-invalid-name (err u103))

;; Data Variables
(define-data-var merchant-counter uint u0)
(define-data-var receipt-counter uint u0)

;; Data Maps
(define-map merchants
  { merchant-id: uint }
  {
    owner: principal,
    name: (string-ascii 64),
    created-at: uint,
    total-payments: uint
  }
)

(define-map receipts
  { receipt-id: uint }
  {
    merchant-id: uint,
    payer: principal,
    amount: uint,
    currency: (string-ascii 10),
    payment-reference: (string-ascii 128),
    timestamp: uint
  }
)

;; Public Functions

;; Register a new merchant
(define-public (register-merchant (name (string-ascii 64)))
  (let
    (
      (new-merchant-id (+ (var-get merchant-counter) u1))
    )
    (asserts! (> (len name) u0) err-invalid-name)
    (map-set merchants
      { merchant-id: new-merchant-id }
      {
        owner: tx-sender,
        name: name,
        created-at: block-height,
        total-payments: u0
      }
    )
    (var-set merchant-counter new-merchant-id)
    (ok new-merchant-id)
  )
)

;; Record a payment receipt
(define-public (record-payment 
  (merchant-id uint)
  (amount uint)
  (currency (string-ascii 10))
  (payment-reference (string-ascii 128)))
  (let
    (
      (merchant (unwrap! (map-get? merchants { merchant-id: merchant-id }) err-merchant-not-found))
      (new-receipt-id (+ (var-get receipt-counter) u1))
    )
    (asserts! (> amount u0) err-invalid-amount)
    
    ;; Store receipt
    (map-set receipts
      { receipt-id: new-receipt-id }
      {
        merchant-id: merchant-id,
        payer: tx-sender,
        amount: amount,
        currency: currency,
        payment-reference: payment-reference,
        timestamp: block-height
      }
    )
    
    ;; Update merchant payment count
    (map-set merchants
      { merchant-id: merchant-id }
      (merge merchant { total-payments: (+ (get total-payments merchant) u1) })
    )
    
    (var-set receipt-counter new-receipt-id)
    
    ;; Emit event
    (print {
      event: "payment-recorded",
      merchant-id: merchant-id,
      receipt-id: new-receipt-id,
      amount: amount,
      currency: currency,
      timestamp: block-height
    })
    
    (ok new-receipt-id)
  )
)

;; Read-only Functions

;; Verify and get receipt details
(define-read-only (verify-receipt (receipt-id uint))
  (ok (map-get? receipts { receipt-id: receipt-id }))
)

;; Get merchant details
(define-read-only (get-merchant (merchant-id uint))
  (ok (map-get? merchants { merchant-id: merchant-id }))
)

;; Get merchant payment count
(define-read-only (get-merchant-payments (merchant-id uint))
  (match (map-get? merchants { merchant-id: merchant-id })
    merchant (ok (get total-payments merchant))
    err-merchant-not-found
  )
)

;; Get current counters
(define-read-only (get-counters)
  (ok {
    merchants: (var-get merchant-counter),
    receipts: (var-get receipt-counter)
  })
)
```

Copy this entire block and paste it into the deployment interface.

## Success Checklist

- [ ] Contract syntax validated (`clarinet check`)
- [ ] Sufficient STX in wallet
- [ ] Wallet connected to correct network
- [ ] Contract name is unique
- [ ] Entire contract code copied
- [ ] Transaction confirmed
- [ ] Contract address saved
- [ ] Contract visible in explorer

---

**Need more help?** Share your specific error message and we can troubleshoot further!
