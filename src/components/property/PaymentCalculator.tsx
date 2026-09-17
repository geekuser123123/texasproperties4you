"use client";

import { useMemo, useState } from "react";
import { runCalculator } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";
import { Button, getButtonClasses } from "@/components/ui/Button";
import { TextUsLink } from "@/components/ContactLinks";
import { disclaimers } from "@/data/site-config";
import { trackEvent } from "@/lib/tracking";

interface PaymentCalculatorProps {
  purchasePrice: number;
  suggestedDownPayment: number;
  interestRate: number;
  termMonths: number;
  minMonthlyPayment?: number;
  propertyId: string;
  propertyTitle: string;
}

const TERM_OPTIONS = [60, 84, 96, 120, 144, 180, 240];

export function PaymentCalculator({
  purchasePrice,
  suggestedDownPayment,
  interestRate,
  termMonths,
  minMonthlyPayment = 450,
  propertyId,
  propertyTitle,
}: PaymentCalculatorProps) {
  const [downPayment, setDownPayment] = useState(suggestedDownPayment);
  const [term, setTerm] = useState(termMonths);

  const result = useMemo(
    () =>
      runCalculator(
        { purchasePrice, downPayment, interestRate, termMonths: term },
        minMonthlyPayment
      ),
    [purchasePrice, downPayment, interestRate, term, minMonthlyPayment]
  );

  function handleDownPaymentChange(value: number) {
    setDownPayment(value);
    trackEvent("calculator_used", { propertyId, field: "down_payment", value });
  }

  function handleTermChange(value: number) {
    setTerm(value);
    trackEvent("calculator_used", { propertyId, field: "term", value });
  }

  return (
    <div className="bg-brand-cream border border-brand-sand rounded-[10px] p-6">
      <h3 className="font-heading text-2xl font-semibold mb-1">Estimate Your Payment</h3>
      <p className="text-sm text-brand-gray mb-5">Adjust the down payment and term to see an estimated monthly payment.</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-[8px] border border-brand-sand p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray">Purchase Price</p>
          <p className="font-heading text-xl font-semibold text-brand-charcoal">{formatCurrency(purchasePrice)}</p>
        </div>
        <div className="bg-white rounded-[8px] border border-brand-sand p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray">Amount Financed</p>
          <p className="font-heading text-xl font-semibold text-brand-charcoal">{formatCurrency(result.amountFinanced)}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="down-payment" className="block text-sm font-semibold text-brand-charcoal mb-2">
            Down Payment: {formatCurrency(downPayment)}
          </label>
          <input
            id="down-payment"
            type="range"
            min={Math.min(suggestedDownPayment, purchasePrice * 0.05)}
            max={purchasePrice * 0.9}
            step={100}
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
            className="w-full accent-[#234D3C]"
          />
        </div>

        <div>
          <label htmlFor="term-length" className="block text-sm font-semibold text-brand-charcoal mb-2">
            Term Length: {term} months
          </label>
          <select
            id="term-length"
            value={term}
            onChange={(e) => handleTermChange(Number(e.target.value))}
            className="w-full min-h-[44px] rounded-[8px] border border-brand-sand bg-white px-3 text-[15px]"
          >
            {TERM_OPTIONS.map((months) => (
              <option key={months} value={months}>
                {months} months ({Math.round(months / 12)} years)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-brand-green text-white rounded-[8px] p-5">
        {result.minimumApplied ? (
          <>
            <p className="text-sm text-white/80">
              Calculated payment based on your selections: {formatCurrency(result.calculatedPayment, { decimals: true })}
            </p>
            <p className="text-sm text-white/80">Minimum monthly payment required: {formatCurrency(result.minimumPayment)}</p>
            <p className="font-heading text-2xl font-semibold mt-1">
              Estimated Monthly Payment: {formatCurrency(result.estimatedPayment)}
            </p>
          </>
        ) : (
          <p className="font-heading text-2xl font-semibold">
            Estimated Monthly Payment: {formatCurrency(result.estimatedPayment, { decimals: true })}
          </p>
        )}
      </div>

      <p className="text-xs text-brand-gray mt-3">{disclaimers.calculator}</p>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <Button href={`/apply?property=${propertyId}`} variant="primary" fullWidth>
          Apply For This Property
        </Button>
        <TextUsLink propertyTitle={propertyTitle} className={getButtonClasses({ variant: "outline", fullWidth: true })}>
          Text Us About This Property
        </TextUsLink>
      </div>
    </div>
  );
}
