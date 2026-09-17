import { SITE_MIN_MONTHLY_PAYMENT } from "@/types/property";

export interface CalculatorInput {
  purchasePrice: number;
  downPayment: number;
  interestRate: number; // annual percent, e.g. 8.5
  termMonths: number;
}

export interface CalculatorResult {
  amountFinanced: number;
  calculatedPayment: number;
  minimumPayment: number;
  estimatedPayment: number;
  minimumApplied: boolean;
}

/**
 * Standard amortizing loan payment: M = P * r(1+r)^n / ((1+r)^n - 1)
 * Falls back to a straight-line P/n split when the rate is 0.
 */
export function calculateMonthlyPayment(
  amountFinanced: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (amountFinanced <= 0 || termMonths <= 0) return 0;
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) {
    return amountFinanced / termMonths;
  }
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (amountFinanced * monthlyRate * factor) / (factor - 1);
}

/**
 * Runs the full calculator, applying the site-wide $450/month floor for
 * owner financed properties. The buyer can never submit/select a payment
 * below this amount.
 */
export function runCalculator(
  input: CalculatorInput,
  minimumPayment: number = SITE_MIN_MONTHLY_PAYMENT
): CalculatorResult {
  const amountFinanced = Math.max(input.purchasePrice - input.downPayment, 0);
  const calculatedPayment = calculateMonthlyPayment(
    amountFinanced,
    input.interestRate,
    input.termMonths
  );
  const minimumApplied = calculatedPayment < minimumPayment;
  const estimatedPayment = minimumApplied ? minimumPayment : calculatedPayment;

  return {
    amountFinanced,
    calculatedPayment,
    minimumPayment,
    estimatedPayment,
    minimumApplied,
  };
}
