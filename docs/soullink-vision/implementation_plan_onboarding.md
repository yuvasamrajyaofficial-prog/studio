# Implementation Plan: Soul ID Onboarding Flow

This plan outlines the steps to build the foundational onboarding experience for Soullink, where users create their unique "Soul ID" through a combination of astrological data and a psychological assessment.

## User Review Required

> [!IMPORTANT]
> We will be using a multi-step form approach for onboarding. Please review the proposed steps and the "Soul ID" logic.

## Proposed Changes

### 1. Onboarding Components

#### [NEW] [soul-id-stepper.tsx](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/components/onboarding/soul-id-stepper.tsx)

A multi-step container to manage the onboarding flow.

#### [NEW] [step-astrology.tsx](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/components/onboarding/step-astrology.tsx)

Step 1: Collect birth details (Date, Time, Place) to calculate the natal chart.

#### [NEW] [step-psychology.tsx](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/components/onboarding/step-psychology.tsx)

Step 2: An interactive quiz/chat with the AI Guru to determine Guna and Dosha.

#### [NEW] [soul-id-card.tsx](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/components/onboarding/soul-id-card.tsx)

The final step: Display the generated Soul ID with a premium, glowing visual design.

### 2. Logic & State Management

#### [MODIFY] [onboarding-store.ts](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/store/onboarding-store.ts)

Update the store to handle astrological data and psychological assessment results.

#### [NEW] [soul-id-calculator.ts](file:///c:/Users/prashant%20B%20hiremath/.gemini/antigravity/scratch/MALOLA/src/lib/soul-id-calculator.ts)

The core algorithm that combines astrology and psychology into the Soul ID signature.

## Verification Plan

### Automated Tests

- Unit tests for `soul-id-calculator.ts` to ensure correct Guna/Dosha mapping.
- Component tests for the stepper to ensure smooth transitions.

### Manual Verification

- Walk through the entire onboarding flow.
- Verify that the Soul ID card displays correctly with the "Cosmic" visual language.
