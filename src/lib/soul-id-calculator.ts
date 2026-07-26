import { SoulID, AstrologyData, PsychologyData } from "@/types/user";

export function calculateSoulID(data: Partial<AstrologyData>): SoulID {
  const rashiList = [
    "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
    "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
    "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"
  ];

  const nakshatraList = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  // Deterministic seed generation from Date of Birth & Time of Birth
  let seed = 0;
  const strToHash = `${data.dateOfBirth || '2000-01-01'}-${data.timeOfBirth || '12:00'}-${data.placeOfBirth || 'Kashi'}`;
  for (let i = 0; i < strToHash.length; i++) {
    seed = (seed << 5) - seed + strToHash.charCodeAt(i);
    seed |= 0;
  }
  const positiveSeed = Math.abs(seed);

  const rashiIndex = positiveSeed % rashiList.length;
  const nakshatraIndex = (positiveSeed * 7) % nakshatraList.length;
  const lagnaIndex = (positiveSeed * 13) % rashiList.length;

  const rashi = rashiList[rashiIndex];
  const nakshatra = nakshatraList[nakshatraIndex];
  const lagna = rashiList[lagnaIndex];

  const gunas: ("Sattva" | "Rajas" | "Tamas")[] = ["Sattva", "Rajas", "Sattva"];
  const dominantGuna = gunas[positiveSeed % gunas.length];

  const doshas: ("Vata" | "Pitta" | "Kapha")[] = ["Vata", "Pitta", "Kapha"];
  const dosha = doshas[(positiveSeed * 3) % doshas.length];

  const sattvaVal = 40 + (positiveSeed % 30);
  const rajasVal = 30 + ((positiveSeed * 3) % 25);
  const tamasVal = 100 - (sattvaVal + rajasVal);

  const psychology: PsychologyData = {
    dominantGuna,
    gunaBalance: {
      sattva: sattvaVal,
      rajas: rajasVal,
      tamas: Math.max(5, tamasVal),
    },
    dosha,
    doshaBalance: {
      vata: 35,
      pitta: 35,
      kapha: 30,
    },
    personalityTraits: ["Seeker", "Resilient", "Intuitive", "Compassionate"],
  };

  return {
    astrology: {
      dateOfBirth: data.dateOfBirth || "",
      timeOfBirth: data.timeOfBirth || "",
      placeOfBirth: data.placeOfBirth || "",
      rashi,
      nakshatra,
      lagna,
    },
    psychology,
    karmicSignature: (positiveSeed % 9000) + 1000,
    signatureHash: `soul_${positiveSeed.toString(36)}`,
  };
}

export function getKarmicGlowColor(psychology: PsychologyData): string {
  if (psychology.dominantGuna === "Sattva") return "#fbbf24"; // Amber
  if (psychology.dominantGuna === "Rajas") return "#ef4444"; // Red
  return "#3b82f6"; // Blue (Tamas)
}
