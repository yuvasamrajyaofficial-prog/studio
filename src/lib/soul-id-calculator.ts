import { AstrologyData, PsychologyData, SoulID } from '@/types/user';
import { sha256 } from 'js-sha256';

/**
 * Calculates the Soul ID signature based on astrological and optional psychological data.
 * Psychology is now optional - can be added later via AI chat.
 */
export function calculateSoulID(
  astrology: AstrologyData,
  psychology?: PsychologyData,
  shortId?: string // Optional short ID like @username_1234
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
    karmicSignature = (hour * 100 + minute) % 1000;
  }

  // 2. Generate a unique hash for the Soul ID (legacy support)
  const rawData = JSON.stringify({
    dob: astrology.dateOfBirth,
    time: astrology.timeOfBirth,
    place: astrology.placeOfBirth,
    lagna: astrology.lagna,
    rashi: astrology.rashi,
    nakshatra: astrology.nakshatra,
  });
  
  const signatureHash = sha256(rawData);
  
  // 3. Determine karmic glow color
  const karmicGlowColor = getKarmicGlowColor(psychology);

  return {
    astrology,
    psychology: psychology || ({
      gunaBalance: { sattva: 50, rajas: 30, tamas: 20 },
      doshaBalance: { vata: 33, pitta: 33, kapha: 34 },
      dosha: 'Balanced',
      dominantGuna: 'SATTVA',
      personalityTraits: ['Balanced', 'Harmonious']
    }),
    karmicSignature,
    signatureHash, // Long hash for legacy/backup
    shortId: shortId || '', // Short human-readable ID like @username_1234
  };
}

/**
 * Determines the karmic glow color based on psychological profile.
 * Returns appropriate color for user's dominant guna.
 */
export function getKarmicGlowColor(psychology?: PsychologyData | null): string {
  if (!psychology) {
    return '#4ECDC4'; // Default teal for new users
  }

  const { sattva, rajas, tamas } = psychology.gunaBalance;

  // Determine dominant guna
  const max = Math.max(sattva, rajas, tamas);

  if (sattva === max) {
    return '#FFD700'; // Gold for Sattva (purity, wisdom)
  } else if (rajas === max) {
    return '#FF6B6B'; // Red for Rajas (passion, activity)
  } else {
    return '#9B59B6'; // Purple for Tamas (inertia, ignorance)
  }
}
