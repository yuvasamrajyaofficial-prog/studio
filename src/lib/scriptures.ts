
export type ScriptureCategory =
  | 'Vedas'
  | 'Upanishads'
  | 'Vedanga'
  | 'Dharma Shastra'
  | 'Itihasa'
  | 'Puranas'
  | 'Upapuranas'
  | 'Darshanas (Philosophy)'
  | 'Agamas & Tantras'
  | 'Niti, Artha & Psychology'
  | 'Bhakti Texts'
  | 'Yoga & Sadhana'
  | 'Acharya Bhashyas (Commentaries)'
  | 'Advanced Vedanta'
  | 'Kali Yuga Texts';

export type Yuga = 'Satya' | 'Treta' | 'Dvapara' | 'Kali' | 'Timeless';

export type Chapter = {
  id: number;
  title: string;
  sanskrit: string;
  english: string;
  hindi: string;
  kannada: string;
  audio: {
    en: string;
    hi: string;
    kn: string;
  };
};

export type Scripture = {
  id: string; // This will correspond to the document ID in Firestore
  slug: string;
  title: string;
  category: ScriptureCategory;
  yuga: Yuga;
  description: string; // Using this instead of the simple 'content'
  coverImage: string; // URL to the image
  chapters: Chapter[];
  references: string[];
  createdAt: any; // Using 'any' for now, will be a Firebase Timestamp
  updatedAt: any; // Using 'any' for now, will be a Firebase Timestamp
  roadmap?: string[];
};

const scripturesData = {
  "scriptures": {
    // 1. SHRUTI – VEDAS
    "rigveda": {
      "title": "Rig Veda",
      "slug": "rigveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The oldest Veda containing hymns to devas and cosmic order.",
      "chapters": []
    },
    "yajurveda": {
      "title": "Yajur Veda",
      "slug": "yajurveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of ritual mantras and yajnas.",
      "chapters": []
    },
    "samaveda": {
      "title": "Sama Veda",
      "slug": "samaveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of musical chanting and devotion.",
      "chapters": []
    },
    "atharvaveda": {
      "title": "Atharva Veda",
      "slug": "atharvaveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of healing, protection, and daily life.",
      "chapters": []
    },

    // 2. UPANISHADS
    "isha-upanishad": {
      "title": "Isha Upanishad",
      "slug": "isha-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "One of the principal Upanishads focusing on the unity of the Self and the Universe.",
      "chapters": []
    },
    "kena-upanishad": {
      "title": "Kena Upanishad",
      "slug": "kena-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Explores the nature of the power behind the senses and the mind.",
      "chapters": []
    },
    "katha-upanishad": {
      "title": "Katha Upanishad",
      "slug": "katha-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "The famous dialogue between Nachiketa and Yama on death and immortality.",
      "chapters": []
    },
    "prashna-upanishad": {
      "title": "Prashna Upanishad",
      "slug": "prashna-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Six questions asked by seekers to Sage Pippalada.",
      "chapters": []
    },
    "mundaka-upanishad": {
      "title": "Mundaka Upanishad",
      "slug": "mundaka-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Distinguishes between higher and lower knowledge.",
      "chapters": []
    },
    "mandukya-upanishad": {
      "title": "Mandukya Upanishad",
      "slug": "mandukya-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Explains the four states of consciousness and the meaning of Om.",
      "chapters": []
    },
    "taittiriya-upanishad": {
      "title": "Taittiriya Upanishad",
      "slug": "taittiriya-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Discusses the five sheaths (koshas) of the human being.",
      "chapters": []
    },
    "aitareya-upanishad": {
      "title": "Aitareya Upanishad",
      "slug": "aitareya-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Focuses on the creation of the universe and the nature of the Self.",
      "chapters": []
    },
    "chandogya-upanishad": {
      "title": "Chandogya Upanishad",
      "slug": "chandogya-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "One of the oldest and longest Upanishads, containing the Mahavakya 'Tat Tvam Asi'.",
      "chapters": []
    },
    "brihadaranyaka-upanishad": {
      "title": "Brihadaranyaka Upanishad",
      "slug": "brihadaranyaka-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "A vast treatise on metaphysics and ethics.",
      "chapters": []
    },
    "shvetashvatara-upanishad": {
      "title": "Shvetashvatara Upanishad",
      "slug": "shvetashvatara-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Emphasizes devotion (bhakti) to the Supreme Lord.",
      "chapters": []
    },
    "kaushitaki-upanishad": {
      "title": "Kaushitaki Upanishad",
      "slug": "kaushitaki-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Discusses the path of the soul after death.",
      "chapters": []
    },
    "maitri-upanishad": {
      "title": "Maitri Upanishad",
      "slug": "maitri-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Focuses on the transition from the physical to the spiritual.",
      "chapters": []
    },

    // 3. VEDANGA
    "shiksha": {
      "title": "Shiksha",
      "slug": "shiksha",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "Phonetics and rules of Vedic chanting.",
      "chapters": []
    },
    "vyakarana": {
      "title": "Vyakarana (Panini’s Ashtadhyayi)",
      "slug": "vyakarana",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "The science of grammar.",
      "chapters": []
    },
    "chandas": {
      "title": "Chandas",
      "slug": "chandas",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "Poetic meters used in Vedic hymns.",
      "chapters": []
    },
    "nirukta": {
      "title": "Nirukta (Yaska’s Nirukta)",
      "slug": "nirukta",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "Etymology and interpretation of Vedic words.",
      "chapters": []
    },
    "jyotisha": {
      "title": "Jyotisha",
      "slug": "jyotisha",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "Vedic astronomy and astrology.",
      "chapters": []
    },
    "kalpa-sutras": {
      "title": "Kalpa Sutras",
      "slug": "kalpa-sutras",
      "yuga": "Timeless",
      "category": "Vedanga",
      "description": "Ritual instructions including Shrauta, Grihya, and Dharma Sutras.",
      "chapters": []
    },

    // 4. DHARMA SHASTRA
    "manu-smriti": {
      "title": "Manusmriti",
      "slug": "manu-smriti",
      "yuga": "Treta",
      "category": "Dharma Shastra",
      "description": "The ancient code of conduct for humanity.",
      "chapters": []
    },
    "yajnavalkya-smriti": {
      "title": "Yajnavalkya Smriti",
      "slug": "yajnavalkya-smriti",
      "yuga": "Treta",
      "category": "Dharma Shastra",
      "description": "A major work on Hindu law and ethics.",
      "chapters": []
    },
    "narada-smriti": {
      "title": "Narada Smriti",
      "slug": "narada-smriti",
      "yuga": "Treta",
      "category": "Dharma Shastra",
      "description": "Focuses on judicial procedures and civil law.",
      "chapters": []
    },
    "parashara-smriti": {
      "title": "Parashara Smriti",
      "slug": "parashara-smriti",
      "yuga": "Kali",
      "category": "Dharma Shastra",
      "description": "The dharma shastra specifically recommended for Kali Yuga.",
      "chapters": []
    },
    "gautama-dharma-sutra": {
      "title": "Gautama Dharma Sutra",
      "slug": "gautama-dharma-sutra",
      "yuga": "Treta",
      "category": "Dharma Shastra",
      "description": "One of the oldest dharma sutras.",
      "chapters": []
    },
    "apastamba-dharma-sutra": {
      "title": "Apastamba Dharma Sutra",
      "slug": "apastamba-dharma-sutra",
      "yuga": "Treta",
      "category": "Dharma Shastra",
      "description": "Part of the Kalpa Sutras, focusing on dharma.",
      "chapters": []
    },

    // 5. ITIHASA
    "ramayana": {
      "title": "Ramayana (Valmiki)",
      "slug": "ramayana",
      "yuga": "Treta",
      "category": "Itihasa",
      "description": "The epic journey of Lord Rama.",
      "chapters": []
    },
    "mahabharata": {
      "title": "Mahabharata (Vyasa)",
      "slug": "mahabharata",
      "yuga": "Dvapara",
      "category": "Itihasa",
      "description": "The great epic of the Bharata dynasty, including the Bhagavad Gita.",
      "chapters": []
    },
    "bhagavad-gita": {
      "title": "Bhagavad Gita",
      "slug": "bhagavad-gita",
      "yuga": "Dvapara",
      "category": "Itihasa",
      "description": "The divine dialogue between Krishna and Arjuna.",
      "chapters": []
    },

    // 6. PURANAS
    "brahma-purana": { "title": "Brahma Purana", "slug": "brahma-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to Lord Brahma.", "chapters": [] },
    "padma-purana": { "title": "Padma Purana", "slug": "padma-purana", "yuga": "Kali", "category": "Puranas", "description": "Contains stories of creation and geography.", "chapters": [] },
    "vishnu-purana": { "title": "Vishnu Purana", "slug": "vishnu-purana", "yuga": "Kali", "category": "Puranas", "description": "Focuses on Lord Vishnu and his avatars.", "chapters": [] },
    "shiva-purana": { "title": "Shiva Purana", "slug": "shiva-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to Lord Shiva.", "chapters": [] },
    "linga-purana": { "title": "Linga Purana", "slug": "linga-purana", "yuga": "Kali", "category": "Puranas", "description": "Explains the significance of the Shiva Linga.", "chapters": [] },
    "garuda-purana": { "title": "Garuda Purana", "slug": "garuda-purana", "yuga": "Kali", "category": "Puranas", "description": "Discusses death, afterlife, and rituals.", "chapters": [] },
    "narada-purana": { "title": "Narada Purana", "slug": "narada-purana", "yuga": "Kali", "category": "Puranas", "description": "Contains teachings on devotion and rituals.", "chapters": [] },
    "bhagavata-purana": { "title": "Bhagavata Purana (Srimad Bhagavatam)", "slug": "bhagavata-purana", "yuga": "Kali", "category": "Puranas", "description": "The essence of all Puranas, focusing on Krishna Bhakti.", "chapters": [] },
    "agni-purana": { "title": "Agni Purana", "slug": "agni-purana", "yuga": "Kali", "category": "Puranas", "description": "An encyclopedic Purana covering various sciences.", "chapters": [] },
    "skanda-purana": { "title": "Skanda Purana", "slug": "skanda-purana", "yuga": "Kali", "category": "Puranas", "description": "The largest Purana, dedicated to Lord Skanda.", "chapters": [] },
    "prev-bhavishya-purana": { "title": "Bhavishya Purana", "slug": "bhavishya-purana", "yuga": "Kali", "category": "Puranas", "description": "Contains prophecies about the future.", "chapters": [] },
    "brahmavaivarta-purana": { "title": "Brahmavaivarta Purana", "slug": "brahmavaivarta-purana", "yuga": "Kali", "category": "Puranas", "description": "Focuses on the glories of Radha and Krishna.", "chapters": [] },
    "markandeya-purana": { "title": "Markandeya Purana", "slug": "markandeya-purana", "yuga": "Kali", "category": "Puranas", "description": "Contains the Devi Mahatmya.", "chapters": [] },
    "vamana-purana": { "title": "Vamana Purana", "slug": "vamana-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to the Vamana avatar of Vishnu.", "chapters": [] },
    "varaha-purana": { "title": "Varaha Purana", "slug": "varaha-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to the Varaha avatar of Vishnu.", "chapters": [] },
    "matsya-purana": { "title": "Matsya Purana", "slug": "matsya-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to the Matsya avatar of Vishnu.", "chapters": [] },
    "kurma-purana": { "title": "Kurma Purana", "slug": "kurma-purana", "yuga": "Kali", "category": "Puranas", "description": "Dedicated to the Kurma avatar of Vishnu.", "chapters": [] },
    "brahmanda-purana": { "title": "Brahmanda Purana", "slug": "brahmanda-purana", "yuga": "Kali", "category": "Puranas", "description": "Discusses the cosmic egg and creation.", "chapters": [] },

    // 7. UPAPURANAS
    "kalika-purana": { "title": "Kalika Purana", "slug": "kalika-purana", "yuga": "Kali", "category": "Upapuranas", "description": "Dedicated to Goddess Kali.", "chapters": [] },
    "devi-bhagavata": { "title": "Devi Bhagavata Purana", "slug": "devi-bhagavata", "yuga": "Kali", "category": "Upapuranas", "description": "Focuses on the glories of the Divine Mother.", "chapters": [] },
    "ganesha-purana": { "title": "Ganesha Purana", "slug": "ganesha-purana", "yuga": "Kali", "category": "Upapuranas", "description": "Dedicated to Lord Ganesha.", "chapters": [] },
    "narasimha-purana": { "title": "Narasimha Purana", "slug": "narasimha-purana", "yuga": "Kali", "category": "Upapuranas", "description": "Dedicated to the Narasimha avatar.", "chapters": [] },
    "saura-purana": { "title": "Saura Purana", "slug": "saura-purana", "yuga": "Kali", "category": "Upapuranas", "description": "Dedicated to the Sun God, Surya.", "chapters": [] },

    // 8. DARSHANAS
    "nyaya-sutras": { "title": "Nyaya Sutras (Gautama)", "slug": "nyaya-sutras", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The school of logic.", "chapters": [] },
    "vaisheshika-sutras": { "title": "Vaisheshika Sutras (Kanada)", "slug": "vaisheshika-sutras", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The school of atomism.", "chapters": [] },
    "samkhya-karika": { "title": "Samkhya Karika (Kapila)", "slug": "samkhya-karika", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The school of dualistic realism.", "chapters": [] },
    "yoga-sutras": { "title": "Yoga Sutras (Patanjali)", "slug": "yoga-sutras", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The foundation of Yoga philosophy.", "chapters": [] },
    "purva-mimamsa": { "title": "Purva Mimamsa Sutras (Jaimini)", "slug": "purva-mimamsa", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The school of ritual interpretation.", "chapters": [] },
    "vedanta-sutras": { "title": "Vedanta / Brahma Sutras (Vyasa)", "slug": "vedanta-sutras", "yuga": "Timeless", "category": "Darshanas (Philosophy)", "description": "The foundation of Vedanta philosophy.", "chapters": [] },

    // 9. AGAMAS & TANTRAS
    "shaiva-agamas": { "title": "Shaiva Agamas", "slug": "shaiva-agamas", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Scriptures of the Shaiva tradition.", "chapters": [] },
    "vaishnava-agamas": { "title": "Vaishnava Agamas", "slug": "vaishnava-agamas", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Scriptures of the Vaishnava tradition.", "chapters": [] },
    "shakta-agamas": { "title": "Shakta Agamas (Tantras)", "slug": "shakta-agamas", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Scriptures of the Shakta tradition.", "chapters": [] },
    "vijnana-bhairava": { "title": "Vijnana Bhairava Tantra", "slug": "vijnana-bhairava", "yuga": "Kali", "category": "Agamas & Tantras", "description": "112 meditation techniques.", "chapters": [] },
    "shiva-sutras": { "title": "Shiva Sutras (Vasugupta)", "slug": "shiva-sutras", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Foundational text of Kashmir Shaivism.", "chapters": [] },
    "spanda-karika": { "title": "Spanda Karika (Kallata)", "slug": "spanda-karika", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Teachings on the divine vibration.", "chapters": [] },
    "rudra-yamala": { "title": "Rudra Yamala Tantra", "slug": "rudra-yamala", "yuga": "Kali", "category": "Agamas & Tantras", "description": "A major tantric text.", "chapters": [] },
    "kularnava-tantra": { "title": "Kularnava Tantra", "slug": "kularnava-tantra", "yuga": "Kali", "category": "Agamas & Tantras", "description": "Focuses on the Kaula tradition.", "chapters": [] },
    "mahanirvana-tantra": { "title": "Mahanirvana Tantra", "slug": "mahanirvana-tantra", "yuga": "Kali", "category": "Agamas & Tantras", "description": "A comprehensive tantric treatise.", "chapters": [] },

    // 10. NITI, ARTHA & PSYCHOLOGY
    "chanakya-niti": { "title": "Chanakya Niti", "slug": "chanakya-niti", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Aphorisms on ethics and conduct.", "chapters": [] },
    "arthashastra": { "title": "Arthashastra (Kautilya)", "slug": "arthashastra", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Treatise on statecraft and economics.", "chapters": [] },
    "panchatantra": { "title": "Panchatantra", "slug": "panchatantra", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Ancient animal fables with moral lessons.", "chapters": [] },
    "hitopadesha": { "title": "Hitopadesha", "slug": "hitopadesha", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Collection of Sanskrit fables.", "chapters": [] },
    "nitishataka": { "title": "Nitishataka (Bhartrihari)", "slug": "nitishataka", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Hundred verses on ethics.", "chapters": [] },
    "nitisara": { "title": "Nitisara (Kamandaka)", "slug": "nitisara", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Elements of polity.", "chapters": [] },
    "shukra-niti": { "title": "Shukra Niti", "slug": "shukra-niti", "yuga": "Kali", "category": "Niti, Artha & Psychology", "description": "Treatise on social and political ethics.", "chapters": [] },

    // 11. BHAKTI TEXTS
    "narada-bhakti-sutra": { "title": "Narada Bhakti Sutra", "slug": "narada-bhakti-sutra", "yuga": "Kali", "category": "Bhakti Texts", "description": "Aphorisms on the path of devotion.", "chapters": [] },
    "sandilya-bhakti-sutra": { "title": "Sandilya Bhakti Sutra", "slug": "sandilya-bhakti-sutra", "yuga": "Kali", "category": "Bhakti Texts", "description": "Philosophical treatise on bhakti.", "chapters": [] },
    "ramcharitmanas": { "title": "Ramcharitmanas (Tulsidas)", "slug": "ramcharitmanas", "yuga": "Kali", "category": "Bhakti Texts", "description": "The story of Rama in Awadhi.", "chapters": [] },
    "bhaja-govindam": { "title": "Bhaja Govindam", "slug": "bhaja-govindam", "yuga": "Kali", "category": "Bhakti Texts", "description": "Devotional song by Adi Shankara.", "chapters": [] },
    "gita-govinda": { "title": "Gita Govinda (Jayadeva)", "slug": "gita-govinda", "yuga": "Kali", "category": "Bhakti Texts", "description": "Lyrical poem on the love of Radha and Krishna.", "chapters": [] },
    "divya-prabandham": { "title": "Divya Prabandham", "slug": "divya-prabandham", "yuga": "Kali", "category": "Bhakti Texts", "description": "Hymns of the Alvars.", "chapters": [] },
    "tevaram": { "title": "Tevaram", "slug": "tevaram", "yuga": "Kali", "category": "Bhakti Texts", "description": "Hymns of the Nayanmars.", "chapters": [] },

    // 12. YOGA & SADHANA TEXTS
    "hatha-yoga-pradipika": { "title": "Hatha Yoga Pradipika", "slug": "hatha-yoga-pradipika", "yuga": "Kali", "category": "Yoga & Sadhana", "description": "Classic text on Hatha Yoga.", "chapters": [] },
    "gheranda-samhita": { "title": "Gheranda Samhita", "slug": "gheranda-samhita", "yuga": "Kali", "category": "Yoga & Sadhana", "description": "Manual on Yoga and purification.", "chapters": [] },
    "shiva-samhita": { "title": "Shiva Samhita", "slug": "shiva-samhita", "yuga": "Kali", "category": "Yoga & Sadhana", "description": "Esoteric text on Yoga and anatomy.", "chapters": [] },
    "yoga-yajnavalkya": { "title": "Yoga Yajnavalkya", "slug": "yoga-yajnavalkya", "yuga": "Kali", "category": "Yoga & Sadhana", "description": "Dialogue on Yoga between Yajnavalkya and Gargi.", "chapters": [] },

    // 13. ACHARYA BHASHYAS
    "brahma-sutra-bhashya-shankara": { "title": "Brahma Sutra Bhashya (Śankaracharya)", "slug": "brahma-sutra-bhashya-shankara", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Advaita commentary on Brahma Sutras.", "chapters": [] },
    "gita-bhashya-shankara": { "title": "Bhagavad Gita Bhashya (Śankaracharya)", "slug": "gita-bhashya-shankara", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Advaita commentary on Bhagavad Gita.", "chapters": [] },
    "upanishad-bhashyas-shankara": { "title": "Upanishad Bhashyas (Śankaracharya)", "slug": "upanishad-bhashyas-shankara", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Advaita commentaries on principal Upanishads.", "chapters": [] },
    "upadesa-sahasri": { "title": "Upadesa Sahasri", "slug": "upadesa-sahasri", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "A thousand teachings by Shankara.", "chapters": [] },
    "vivekachudamani": { "title": "Vivekachudamani", "slug": "vivekachudamani", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "The Crest-Jewel of Discrimination.", "chapters": [] },
    "atma-bodha": { "title": "Atma Bodha", "slug": "atma-bodha", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Self-Knowledge.", "chapters": [] },
    "aparokshanubhuti": { "title": "Aparokshanubhuti", "slug": "aparokshanubhuti", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Direct Experience of the Self.", "chapters": [] },
    "sri-bhashya-ramanuja": { "title": "Śrī Bhashya (Rāmānuja)", "slug": "sri-bhashya-ramanuja", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Vishishtadvaita commentary on Brahma Sutras.", "chapters": [] },
    "gita-bhashya-ramanuja": { "title": "Gita Bhashya (Rāmānuja)", "slug": "gita-bhashya-ramanuja", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Vishishtadvaita commentary on Bhagavad Gita.", "chapters": [] },
    "vedartha-sangraha": { "title": "Vedartha Sangraha", "slug": "vedartha-sangraha", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Summary of the meaning of the Vedas.", "chapters": [] },
    "brahma-sutra-bhashya-madhva": { "title": "Brahma Sutra Bhashya (Madhva)", "slug": "brahma-sutra-bhashya-madhva", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Dvaita commentary on Brahma Sutras.", "chapters": [] },
    "gita-bhashya-madhva": { "title": "Gita Bhashya (Madhva)", "slug": "gita-bhashya-madhva", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Dvaita commentary on Bhagavad Gita.", "chapters": [] },
    "mahabharata-tatparya-nirnaya": { "title": "Mahabharata Tatparya Nirnaya", "slug": "mahabharata-tatparya-nirnaya", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Madhva's interpretation of Mahabharata.", "chapters": [] },
    "anubhashya-vallabha": { "title": "Anubhashya (Vallabha)", "slug": "anubhashya-vallabha", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Shuddhadvaita commentary on Brahma Sutras.", "chapters": [] },
    "subodhini-vallabha": { "title": "Subodhini (Vallabha)", "slug": "subodhini-vallabha", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Commentary on Srimad Bhagavatam.", "chapters": [] },
    "vedanta-parijata-saurabha": { "title": "Vedanta Parijata Saurabha (Nimbarka)", "slug": "vedanta-parijata-saurabha", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Dvaitadvaita commentary on Brahma Sutras.", "chapters": [] },
    "siksastakam": { "title": "Siksastakam (Chaitanya)", "slug": "siksastakam", "yuga": "Kali", "category": "Acharya Bhashyas (Commentaries)", "description": "Eight devotional verses.", "chapters": [] },

    // 14. ADVANCED VEDANTA & JNANA TEXTS
    "yoga-vasistha": { "title": "Yoga Vasistha", "slug": "yoga-vasistha", "yuga": "Timeless", "category": "Advanced Vedanta", "description": "Dialogue between Sage Vasistha and Lord Rama.", "chapters": [] },
    "ashtavakra-gita": { "title": "Ashtavakra Gita", "slug": "ashtavakra-gita", "yuga": "Timeless", "category": "Advanced Vedanta", "description": "Dialogue between Sage Ashtavakra and King Janaka.", "chapters": [] },
    "avadhuta-gita": { "title": "Avadhuta Gita", "slug": "avadhuta-gita", "yuga": "Timeless", "category": "Advanced Vedanta", "description": "The song of the free soul.", "chapters": [] },
    "tripura-rahasya": { "title": "Tripura Rahasya", "slug": "tripura-rahasya", "yuga": "Timeless", "category": "Advanced Vedanta", "description": "The mystery of the Supreme Goddess.", "chapters": [] },
    "ribhu-gita": { "title": "Ribhu Gita", "slug": "ribhu-gita", "yuga": "Timeless", "category": "Advanced Vedanta", "description": "Teachings of Sage Ribhu to Nidagha.", "chapters": [] }
  }
};


export const scriptures: Scripture[] = Object.entries(scripturesData.scriptures).map(([id, s]: [string, any]) => ({
  ...s,
  id: id,
  slug: s.slug || id,
  coverImage: s.coverImage || "",
  references: s.references || [],
  createdAt: s.createdAt === undefined ? null : s.createdAt,
  updatedAt: s.updatedAt === undefined ? null : s.updatedAt,
  roadmap: s.roadmap || [],
}));


export const orderedCategories: ScriptureCategory[] = [
    'Vedas',
    'Upanishads',
    'Vedanga',
    'Dharma Shastra',
    'Itihasa',
    'Puranas',
    'Upapuranas',
    'Darshanas (Philosophy)',
    'Agamas & Tantras',
    'Niti, Artha & Psychology',
    'Bhakti Texts',
    'Yoga & Sadhana',
    'Acharya Bhashyas (Commentaries)',
    'Advanced Vedanta',
    'Kali Yuga Texts',
];
