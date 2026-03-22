import { describe, it, expect } from "vitest";
import { calculateExpression } from "./calculateExpression";

describe("calculateExpression", () => {
  it("adds numbers correctly", () => {
    expect(calculateExpression("2", "+", "3")).toBe("5");
  });

  it("subtracts numbers correctly", () => {
    expect(calculateExpression("5", "-", "3")).toBe("2");
  });

  it("multiplies numbers correctly", () => {
    expect(calculateExpression("4", "×", "3")).toBe("12");
  });

  it("divides numbers correctly", () => {
    expect(calculateExpression("6", "÷", "2")).toBe("3");
  });

  it("handles division by zero", () => {
    expect(calculateExpression("6", "÷", "0")).toBe("0");
  });

  it("returns current number for unknown operation", () => {
    expect(calculateExpression("6", "?", "3")).toBe("3");
  });
});
