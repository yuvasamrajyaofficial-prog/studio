import { SoulID, AstrologyData, PsychologyData } from "@/types/user";

export function calculateSoulID(data: Partial<AstrologyData>): SoulID {
  // Mock calculation logic
  // In a real app, this would use an ephemeris library or API
  
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

  // Deterministic mock based on date string length or similar to be consistent-ish
  const seed = data.dateOfBirth ? data.dateOfBirth.length : 5;
  
  const rashi = rashiList[Math.floor(Math.random() * rashiList.length)];
  const nakshatra = nakshatraList[Math.floor(Math.random() * nakshatraList.length)];
  const lagna = rashiList[Math.floor(Math.random() * rashiList.length)];

  const psychology: PsychologyData = {
    dominantGuna: Math.random() > 0.5 ? "Rajas" : "Sattva",
    gunaBalance: {
      sattva: Math.floor(Math.random() * 40) + 30,
      rajas: Math.floor(Math.random() * 40) + 20,
      tamas: Math.floor(Math.random() * 20) + 10,
    },
    dosha: Math.random() > 0.5 ? "Pitta" : "Vata",
    doshaBalance: {
      vata: Math.floor(Math.random() * 40) + 20,
      pitta: Math.floor(Math.random() * 40) + 20,
      kapha: Math.floor(Math.random() * 30) + 10,
    },
    personalityTraits: ["Seeker", "Resilient", "Intuitive"],
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
    karmicSignature: Math.floor(Math.random() * 9000) + 1000,
    signatureHash: `soul_${Math.random().toString(36).substring(7)}`,
  };
}

export function getKarmicGlowColor(psychology: PsychologyData): string {
  if (psychology.dominantGuna === "Sattva") return "#fbbf24"; // Amber
  if (psychology.dominantGuna === "Rajas") return "#ef4444"; // Red
  return "#3b82f6"; // Blue (Tamas)
}
