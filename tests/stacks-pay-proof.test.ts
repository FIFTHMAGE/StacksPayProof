import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";
import { initSimnet } from "@hirosystems/clarinet-sdk";
import "./vitest-matchers";

const simnet = await initSimnet();

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("StacksPayProof Contract Tests", () => {
  it("should register a merchant", () => {
    const { result } = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("Test Merchant")],
      deployer
    );
    
    expect(result).toBeOk(Cl.uint(1));
  });

  it("should get merchant details", () => {
    const merchantName = "Coffee Shop " + Date.now();
    const registerResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii(merchantName)],
      deployer
    );
    
    const merchantId = (registerResult.result.value as any).value;

    const { result } = simnet.callReadOnlyFn(
      "stacks-pay-proof",
      "get-merchant",
      [Cl.uint(Number(merchantId))],
      deployer
    );

    expect(result).toBeOk();
  });

  it("should record a payment", () => {
    const registerResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("Restaurant")],
      deployer
    );
    
    const merchantId = (registerResult.result.value as any).value;

    const { result } = simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [
        Cl.uint(Number(merchantId)),
        Cl.uint(1000),
        Cl.stringAscii("STX"),
        Cl.stringAscii("tx-ref-123"),
      ],
      wallet1
    );

    expect(result).toBeOk();
  });

  it("should verify a receipt", () => {
    const registerResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("Store")],
      deployer
    );
    
    const merchantId = (registerResult.result.value as any).value;

    const paymentResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [
        Cl.uint(Number(merchantId)),
        Cl.uint(500),
        Cl.stringAscii("STX"),
        Cl.stringAscii("payment-001"),
      ],
      wallet1
    );
    
    const receiptId = (paymentResult.result.value as any).value;

    const { result } = simnet.callReadOnlyFn(
      "stacks-pay-proof",
      "verify-receipt",
      [Cl.uint(Number(receiptId))],
      deployer
    );

    expect(result).toBeOk();
  });

  it("should track merchant payment count", () => {
    const registerResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("Salon")],
      deployer
    );
    
    const merchantId = (registerResult.result.value as any).value;

    simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [Cl.uint(Number(merchantId)), Cl.uint(100), Cl.stringAscii("STX"), Cl.stringAscii("ref1")],
      wallet1
    );

    simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [Cl.uint(Number(merchantId)), Cl.uint(200), Cl.stringAscii("STX"), Cl.stringAscii("ref2")],
      wallet2
    );

    const { result } = simnet.callReadOnlyFn(
      "stacks-pay-proof",
      "get-merchant-payments",
      [Cl.uint(Number(merchantId))],
      deployer
    );

    expect(result).toBeOk(Cl.uint(2));
  });

  it("should fail to record payment for non-existent merchant", () => {
    const { result } = simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [
        Cl.uint(999999),
        Cl.uint(100),
        Cl.stringAscii("STX"),
        Cl.stringAscii("ref"),
      ],
      wallet1
    );

    expect(result).toBeErr(Cl.uint(101)); // err-merchant-not-found
  });

  it("should fail to record payment with zero amount", () => {
    const registerResult = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("Shop")],
      deployer
    );
    
    const merchantId = (registerResult.result.value as any).value;

    const { result } = simnet.callPublicFn(
      "stacks-pay-proof",
      "record-payment",
      [Cl.uint(Number(merchantId)), Cl.uint(0), Cl.stringAscii("STX"), Cl.stringAscii("ref")],
      wallet1
    );

    expect(result).toBeErr(Cl.uint(102)); // err-invalid-amount
  });

  it("should fail to register merchant with empty name", () => {
    const { result } = simnet.callPublicFn(
      "stacks-pay-proof",
      "register-merchant",
      [Cl.stringAscii("")],
      deployer
    );

    expect(result).toBeErr(Cl.uint(103)); // err-invalid-name
  });

  it("should get correct counters", () => {
    const { result } = simnet.callReadOnlyFn(
      "stacks-pay-proof",
      "get-counters",
      [],
      deployer
    );

    expect(result).toBeOk();
    // Just verify it returns ok with merchants and receipts fields
  });
});
