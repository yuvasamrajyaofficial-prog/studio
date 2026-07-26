export interface PanchangData {
  tithi: {
    name: string;
    number: number;
    paksha: 'Shukla' | 'Krishna';
    percentageCompleted: number;
  };
  nakshatra: {
    name: string;
    deity: string;
    ruler: string;
    pada: number;
  };
  yoga: {
    name: string;
    meaning: string;
  };
  karana: {
    name: string;
    category: string;
  };
  rahuKalam: {
    start: string;
    end: string;
  };
  auspiciousTime: {
    abhijitMuhurta: string;
  };
}

const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
];

const NAKSHATRAS = [
  { name: "Ashwini", deity: "Ashwini Kumaras", ruler: "Ketu" },
  { name: "Bharani", deity: "Yama", ruler: "Venus" },
  { name: "Krittika", deity: "Agni", ruler: "Sun" },
  { name: "Rohini", deity: "Brahma", ruler: "Moon" },
  { name: "Mrigashira", deity: "Soma", ruler: "Mars" },
  { name: "Ardra", deity: "Rudra", ruler: "Rahu" },
  { name: "Punarvasu", deity: "Aditi", ruler: "Jupiter" },
  { name: "Pushya", deity: "Brihaspati", ruler: "Saturn" },
  { name: "Ashlesha", deity: "Nagas", ruler: "Mercury" },
  { name: "Magha", deity: "Pitrs", ruler: "Ketu" },
  { name: "Purva Phalguni", deity: "Bhaga", ruler: "Venus" },
  { name: "Uttara Phalguni", deity: "Aryaman", ruler: "Sun" },
  { name: "Hasta", deity: "Savitar", ruler: "Moon" },
  { name: "Chitra", deity: "Vishwakarma", ruler: "Mars" },
  { name: "Swati", deity: "Vayu", ruler: "Rahu" },
  { name: "Vishakha", deity: "Indragni", ruler: "Jupiter" },
  { name: "Anuradha", deity: "Mitra", ruler: "Saturn" },
  { name: "Jyeshtha", deity: "Indra", ruler: "Mercury" },
  { name: "Mula", deity: "Nirriti", ruler: "Ketu" },
  { name: "Purva Ashadha", deity: "Apas", ruler: "Venus" },
  { name: "Uttara Ashadha", deity: "Vishwadevas", ruler: "Sun" },
  { name: "Shravana", deity: "Vishnu", ruler: "Moon" },
  { name: "Dhanishta", deity: "Eight Vasus", ruler: "Mars" },
  { name: "Shatabhisha", deity: "Varuna", ruler: "Rahu" },
  { name: "Purva Bhadrapada", deity: "Aja Ekapada", ruler: "Jupiter" },
  { name: "Uttara Bhadrapada", deity: "Ahirbudhnya", ruler: "Saturn" },
  { name: "Revati", deity: "Pushan", ruler: "Mercury" }
];

const YOGAS = [
  { name: "Vishkambha", meaning: "Overcoming obstacles" },
  { name: "Priti", meaning: "Joy and affection" },
  { name: "Ayushman", meaning: "Longevity and health" },
  { name: "Saubhagya", meaning: "Good fortune" },
  { name: "Shobhana", meaning: "Splendor and elegance" },
  { name: "Atiganda", meaning: "Overcoming difficulties" },
  { name: "Sukarma", meaning: "Noble deeds" },
  { name: "Dhriti", meaning: "Patience and firmness" },
  { name: "Shula", meaning: "Sharp focus" },
  { name: "Ganda", meaning: "Introspection" },
  { name: "Vriddhi", meaning: "Growth and prosperity" },
  { name: "Dhruva", meaning: "Stability and constancy" },
  { name: "Vyaghta", meaning: "Formidable power" },
  { name: "Harshana", meaning: "Delight and enthusiasm" },
  { name: "Vajra", meaning: "Diamond strength" },
  { name: "Siddhi", meaning: "Attainment and mastery" },
  { name: "Vyatipata", meaning: "Transformated energy" },
  { name: "Variyan", meaning: "Excellence" },
  { name: "Parigha", meaning: "Protection" },
  { name: "Shiva", meaning: "Auspicious grace" },
  { name: "Siddha", meaning: "Perfection" },
  { name: "Sadhya", meaning: "Accomplishment" },
  { name: "Shubha", meaning: "Pure wellness" },
  { name: "Shukla", meaning: "Luminous clarity" },
  { name: "Brahma", meaning: "Creative intellect" },
  { name: "Indra", meaning: "Leadership and honor" },
  { name: "Vaidhriti", meaning: "Resilience" }
];

export function getRealTimePanchang(date: Date = new Date()): PanchangData {
  const startYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Tithi calculation (lunar cycle approximation)
  const lunarDay = (dayOfYear * 1.03) % 30;
  const tithiIndex = Math.floor(lunarDay % 15);
  const isShukla = lunarDay < 15;
  const tithiName = TITHIS[tithiIndex] || "Pratipada";
  const percentage = Math.floor((lunarDay % 1) * 100);

  // Nakshatra calculation
  const nakshatraIndex = Math.floor((dayOfYear * 1.08) % 27);
  const nakshatraData = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const pada = (Math.floor(dayOfYear % 4) + 1);

  // Yoga calculation
  const yogaIndex = Math.floor((dayOfYear * 1.15) % 27);
  const yogaData = YOGAS[yogaIndex] || YOGAS[0];

  // Rahu Kalam calculation based on day of week (0 = Sun, 1 = Mon, etc.)
  const dayOfWeek = date.getDay();
  const rahuTimes = [
    { start: "16:30", end: "18:00" }, // Sun
    { start: "07:30", end: "09:00" }, // Mon
    { start: "15:00", end: "16:30" }, // Tue
    { start: "12:00", end: "13:30" }, // Wed
    { start: "13:30", end: "15:00" }, // Thu
    { start: "10:30", end: "12:00" }, // Fri
    { start: "09:00", end: "10:30" }, // Sat
  ];

  return {
    tithi: {
      name: tithiName,
      number: tithiIndex + 1,
      paksha: isShukla ? 'Shukla' : 'Krishna',
      percentageCompleted: percentage,
    },
    nakshatra: {
      name: nakshatraData.name,
      deity: nakshatraData.deity,
      ruler: nakshatraData.ruler,
      pada,
    },
    yoga: {
      name: yogaData.name,
      meaning: yogaData.meaning,
    },
    karana: {
      name: "Bava",
      category: "Chara (Movable)",
    },
    rahuKalam: rahuTimes[dayOfWeek] || rahuTimes[0],
    auspiciousTime: {
      abhijitMuhurta: "11:45 AM - 12:35 PM",
    },
  };
}
