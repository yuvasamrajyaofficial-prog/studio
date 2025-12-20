import { AstrologyData, PsychologyData, SoulID } from '@/types/user';
import { sha256 } from 'js-sha256';

/**
 * Calculates the Soul ID signature based on astrological and psychological data.
 * This is a simplified version for the prototype.
 */
export function calculateSoulID(
  astrology: AstrologyData,
  psychology: PsychologyData
): SoulID {
  // 1. Calculate Karmic Signature (0-1000)
  // A weighted average of Guna balance and astrological alignment (mocked)
  const gunaWeight = (psychology.gunaBalance.sattva * 2 + psychology.gunaBalance.rajas * 1 + psychology.gunaBalance.tamas * 0.5) / 3.5;
  const baseKarma = 500;
  const karmicSignature = Math.floor(baseKarma + (gunaWeight * 50));

  // 2. Generate a unique hash for the Soul ID
  const rawData = JSON.stringify({
    dob: astrology.dateOfBirth,
    tob: astrology.timeOfBirth,
    pob: astrology.placeOfBirth,
    guna: psychology.gunaBalance,
    dosha: psychology.dosha,
    traits: psychology.personalityTraits.sort()
  });
  
  const signatureHash = sha256(rawData);

  // 3. Mock some astrological details if not provided
  const enrichedAstrology: AstrologyData = {
    ...astrology,
    lagna: astrology.lagna || 'Leo',
    rashi: astrology.rashi || 'Aries',
    nakshatra: astrology.nakshatra || 'Ashwini'
  };

  return {
    astrology: enrichedAstrology,
    psychology,
    karmicSignature,
    signatureHash
  };
}

/**
 * Determines the "Glow Color" based on the dominant Guna.
 */
export function getKarmicGlowColor(psychology: PsychologyData): string {
  const { sattva, rajas, tamas } = psychology.gunaBalance;
  
  if (sattva >= rajas && sattva >= tamas) return '#FFD700'; // Gold (Sattva)
  if (rajas >= sattva && rajas >= tamas) return '#FF4500'; // Orange/Red (Rajas)
  return '#4B0082'; // Indigo/Dark (Tamas)
}
