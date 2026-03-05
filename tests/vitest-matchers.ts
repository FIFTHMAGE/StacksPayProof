import { expect } from "vitest";
import { ResponseCV, ClarityValue } from "@stacks/transactions";

expect.extend({
  toBeOk(received: ResponseCV, expected?: ClarityValue) {
    // Type 7 is ok, Type 8 is err
    const pass = received.type === 7;
    
    if (!pass) {
      return {
        message: () => `Expected Ok response, but got Err: ${JSON.stringify(received)}`,
        pass: false,
      };
    }

    if (expected) {
      const valueMatch = JSON.stringify(received.value) === JSON.stringify(expected);
      return {
        message: () =>
          valueMatch
            ? `Expected Ok value to not equal ${JSON.stringify(expected)}`
            : `Expected Ok value ${JSON.stringify(received.value)} to equal ${JSON.stringify(expected)}`,
        pass: valueMatch,
      };
    }

    return {
      message: () => "Expected Err response, but got Ok",
      pass: true,
    };
  },

  toBeErr(received: ResponseCV, expected?: ClarityValue) {
    // Type 7 is ok, Type 8 is err
    const pass = received.type === 8;
    
    if (!pass) {
      return {
        message: () => `Expected Err response, but got Ok: ${JSON.stringify(received)}`,
        pass: false,
      };
    }

    if (expected) {
      const valueMatch = JSON.stringify(received.value) === JSON.stringify(expected);
      return {
        message: () =>
          valueMatch
            ? `Expected Err value to not equal ${JSON.stringify(expected)}`
            : `Expected Err value ${JSON.stringify(received.value)} to equal ${JSON.stringify(expected)}`,
        pass: valueMatch,
      };
    }

    return {
      message: () => "Expected Ok response, but got Err",
      pass: true,
    };
  },

  toBeSome(received: ClarityValue, expected?: ClarityValue) {
    const pass = received.type === 10 && received.value !== undefined;
    
    if (!pass) {
      return {
        message: () => `Expected Some value, but got None or non-optional`,
        pass: false,
      };
    }

    if (expected) {
      const valueMatch = JSON.stringify(received.value) === JSON.stringify(expected);
      return {
        message: () =>
          valueMatch
            ? `Expected Some value to not equal ${JSON.stringify(expected)}`
            : `Expected Some value ${JSON.stringify(received.value)} to equal ${JSON.stringify(expected)}`,
        pass: valueMatch,
      };
    }

    return {
      message: () => "Expected None, but got Some",
      pass: true,
    };
  },
});

declare module "vitest" {
  interface Assertion {
    toBeOk(expected?: ClarityValue): void;
    toBeErr(expected?: ClarityValue): void;
    toBeSome(expected?: ClarityValue): void;
  }
}
