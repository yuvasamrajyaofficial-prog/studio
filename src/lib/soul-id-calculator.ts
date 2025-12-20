import { AstrologyData, PsychologyData, SoulID } from '@/types/user';
import { sha256 } from 'js-sha256';

/**
 * Calculates the Soul ID signature based on astrological and optional psychological data.
 * Psychology is now optional - can be added later via AI chat.
 */
export function calculateSoulID(
  astrology: AstrologyData,
  psychology?: PsychologyData
): SoulID {
  // 1. Calculate Karmic Signature (0-1000)
  let karmicSignature: number;
  
  if (psychology) {
    // With psychology: Calculate based on Guna balance
    const gunaWeight = (psychology.gunaBalance.sattva * 2 + psychology.gunaBalance.rajas * 1 + psychology.gunaBalance.tamas * 0.5) / 3.5;
    const baseKarma = 500;
    karmicSignature = Math.floor(baseKarma + (gunaWeight * 50));
  } else {
    // Without psychology: Generate from birth time
    const match = astrology.timeOfBirth.match(/(\d+):(\d+)/);
    const hour = match ? parseInt(match[1]) : 12;
    const minute = match ? parseInt(match[2]) : 0;
    karmicSignature = (hour * 100 + minute) % 10000;
  }

  // 2. Generate a unique hash for the Soul ID
  const rawData = JSON.stringify({
    dob: astrology.dateOfBirth,
    tob: astrology.timeOfBirth,
    pob: astrology.placeOfBirth,
    ...(psychology && {
      guna: psychology.gunaBalance,
      dosha: psychology.dosha,
      traits: psychology.personalityTraits.sort()
    })
  });
  
  const signatureHash = sha256(rawData);

  // 3. Mock some astrological details  if not provided
  const enrichedAstrology: AstrologyData = {
    ...astrology,
    lagna: astrology.lagna || 'Taurus',
    rashi: astrology.rashi || 'Leo',
    nakshatra: astrology.nakshatra || 'Magha'
  };

  // 4. Provide default psychology if not present
  const enrichedPsychology: PsychologyData = psychology || {
    dominantGuna: 'Sattva',
    gunaBalance: { sattva: 33, rajas: 33, tamas: 34 },
    dosha: 'Vata',
    doshaBalance: { vata: 33, pitta: 33, kapha: 34 },
    personalityTraits: []
  };

  return {
    astrology: enrichedAstrology,
    psychology: enrichedPsychology,
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
