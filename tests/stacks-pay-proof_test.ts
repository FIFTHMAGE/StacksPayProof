import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Can register a merchant",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'stacks-pay-proof',
        'register-merchant',
        [types.ascii("Test Merchant")],
        deployer.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Can record a payment",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'stacks-pay-proof',
        'register-merchant',
        [types.ascii("Test Merchant")],
        deployer.address
      ),
      Tx.contractCall(
        'stacks-pay-proof',
        'record-payment',
        [
          types.uint(1),
          types.uint(1000),
          types.ascii("STX"),
          types.ascii("tx-ref-123")
        ],
        wallet1.address
      )
    ]);
    
    block.receipts[1].result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Can verify a receipt",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;
    
    let block = chain.mineBlock([
      Tx.contractCall(
        'stacks-pay-proof',
        'register-merchant',
        [types.ascii("Test Merchant")],
        deployer.address
      ),
      Tx.contractCall(
        'stacks-pay-proof',
        'record-payment',
        [
          types.uint(1),
          types.uint(1000),
          types.ascii("STX"),
          types.ascii("tx-ref-123")
        ],
        wallet1.address
      )
    ]);
    
    let receipt = chain.callReadOnlyFn(
      'stacks-pay-proof',
      'verify-receipt',
      [types.uint(1)],
      deployer.address
    );
    
    receipt.result.expectOk().expectSome();
  },
});
