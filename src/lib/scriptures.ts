
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
  | 'Jain Agamas & Philosophy'
  | 'Niti, Artha & Psychology'
  | 'Bhakti Texts'
  | 'Yoga & Sadhana'
  | 'Acharya Bhashyas (Commentaries)'
  | 'Advanced Vedanta'
  | 'Veda'
  | 'Upanishad'
  | 'Purana'
  | 'Smriti'
  | 'Agama'
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
    "rigveda": {
      "title": "Rigveda",
      "slug": "rigveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The oldest Veda containing hymns to Agni, Indra, Varuna, and cosmic principles.",
      "coverImage": "assets/images/scripture-icons/rigveda.png",
      "chapters": [
        {
          "id": 1,
          "title": "Mandala 1",
          "sanskrit": "अग्निमीळे पुरोहितं यज्ञस्य देवम् ऋत्विजम् ।",
          "english": "I praise Agni, the household priest, the divine minister of the sacrifice.",
          "hindi": "मैं अग्नि की स्तुति करता हूँ, जो देव पुरोहित है।",
          "kannada": "ನಾನು ಅಗ್ನಿಯನ್ನು ಸ್ತುತಿಸುತ್ತೇನೆ, ಯಜ್ಞದ ದೈವಿಕ ಅರ್ಚಕನು.",
          "audio": {
            "en": "",
            "hi": "",
            "kn": ""
          }
        }
      ],
      "references": ["sacred-texts.com", "SanskritDocuments.org"]
    },
    "samaveda": {
      "title": "Samaveda",
      "slug": "samaveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of melodies, basis of Indian classical music.",
      "coverImage": "assets/images/scripture-icons/samaveda.png",
      "chapters": [
        {
          "id": 1,
          "title": "First Song",
          "sanskrit": "अग्ना याहा वीतये गृणानो, हव्यदातये ।",
          "english": "O Agni, come for the offering, praised and invoked.",
          "hindi": "हे अग्नि, आओ और हवि स्वीकार करो।",
          "kannada": "ಅಗ್ನಿಯೇ, ಬಂದು ಹವಿಯನ್ನು ಸ್ವೀಕರಿಸು.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "yajurveda": {
      "title": "Yajurveda",
      "slug": "yajurveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of ritual formulas and sacred procedures.",
      "coverImage": "assets/images/scripture-icons/yajurveda.png",
      "chapters": [
        {
          "id": 1,
          "title": "Kanda 1",
          "sanskrit": "इषे त्वा ऊर्जे त्वा वायवः स्थो देवा वः सेतुं कृण्मि ।",
          "english": "For food I take you, for strength I take you.",
          "hindi": "मैं तुम्हें भोजन और शक्ति के लिए ग्रहण करता हूँ।",
          "kannada": "ಅನ್ನ ಮತ್ತು ಶಕ್ತಿಗಾಗಿ ನಾನು ನಿನ್ನನ್ನು ಸ್ವೀಕರಿಸುತ್ತೇನೆ.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "atharvaveda": {
      "title": "Atharvaveda",
      "slug": "atharvaveda",
      "yuga": "Satya",
      "category": "Vedas",
      "description": "The Veda of healing, protection, and daily life rituals.",
      "chapters": [
        {
          "id": 1,
          "title": "Charm Hymn",
          "sanskrit": "ॐ भूर्भुवः सुवः।",
          "english": "Om, Earth, Sky, Heaven.",
          "hindi": "ॐ भूः भुवः सुवः।",
          "kannada": "ಓಂ ಭೂಃ ಭುವಃ ಸುವಃ.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "isha-upanishad": {
      "title": "Isha Upanishad",
      "slug": "isha-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "One of the shortest yet most profound Upanishads.",
      "chapters": [
        {
          "id": 1,
          "title": "Opening Verse",
          "sanskrit": "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।",
          "english": "All this—whatsoever moves in the universe—should be covered by the Lord.",
          "hindi": "इस जगत में जो कुछ भी है वह ईश्वर से व्याप्त है।",
          "kannada": "ಈ ಜಗತ್ತಿನಲ್ಲಿರುವ ಎಲ್ಲವೂ ಈಶ್ವರನಿಂದ ಆವೃತವಾಗಿದೆ.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "katha-upanishad": {
      "title": "Katha Upanishad",
      "slug": "katha-upanishad",
      "yuga": "Dvapara",
      "category": "Upanishads",
      "description": "Dialogue between Nachiketa and Yama on the nature of the Self.",
      "chapters": [
        {
          "id": 1,
          "title": "Nachiketa's Question",
          "sanskrit": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।",
          "english": "Arise! Awake! Approach the great and learn.",
          "hindi": "उठो, जागो और श्रेष्ठ लोगों से ज्ञान प्राप्त करो।",
          "kannada": "ಎದ್ದಿಡಿ, ಎಚ್ಚರಿಕೆಯಾಗಿರಿ ಮತ್ತು ಮಹಾನುಭಾವರಿಂದ ಜ್ಞಾನವನ್ನು ಪಡೆಯಿರಿ.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "bhagavad-gita": {
      "title": "Bhagavad Gita",
      "slug": "bhagavad-gita",
      "yuga": "Dvapara",
      "category": "Itihasa",
      "description": "The divine song of Lord Krishna spoken in Mahabharata.",
      "chapters": [
        {
          "id": 1,
          "title": "Chapter 1",
          "sanskrit": "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।",
          "english": "On the field of dharma, the field of Kurukshetra...",
          "hindi": "धर्मक्षेत्र कुरुक्षेत्र में युद्धार्थ एकत्र हुए योद्धा...",
          "kannada": "ಧರ್ಮಕ್ಷೇತ್ರ ಕುರುಕ್ಷೇತ್ರದಲ್ಲಿ ಯುದ್ಧಕ್ಕಾಗಿ ಸೇರಿದ ಯೋಧರು...",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "ramayana": {
      "title": "Ramayana",
      "slug": "ramayana",
      "yuga": "Treta",
      "category": "Itihasa",
      "description": "The life story of Lord Rama written by Sage Valmiki.",
      "chapters": [
        {
          "id": 1,
          "title": "Bala Kanda",
          "sanskrit": "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।",
          "english": "Dedicated to penance and study, the sage shone brightly.",
          "hindi": "तप और स्वाध्याय में लगे हुए उस ऋषि की प्रभा अद्भुत थी।",
          "kannada": "ತಪಸ್ಸು ಮತ್ತು ಸ್ವಾಧ್ಯಾಯದಲ್ಲಿ ನಿರತರಾಗಿದ್ದ ಋಷಿಯ ಪ್ರಭಾ ಅದ್ಭುತವಾಗಿತ್ತು.",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "mahabharata": {
      "title": "Mahabharata",
      "slug": "mahabharata",
      "yuga": "Dvapara",
      "category": "Itihasa",
      "description": "The longest epic narrating the Kurukshetra war and Krishna's teachings.",
      "chapters": [
        {
          "id": 1,
          "title": "Adi Parva",
          "sanskrit": "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।",
          "english": "Having bowed to Narayana and Nara, the supreme humans...",
          "hindi": "नारायण और नर की वंदना करके...",
          "kannada": "ನಾರಾಯಣ ಮತ್ತು ನರರಿಗೆ ನಮಸ್ಕರಿಸಿ...",
          "audio": { "en": "", "hi": "", "kn": "" }
        }
      ]
    },
    "vishnu-purana": {
      "title": "Vishnu Purana",
      "slug": "vishnu-purana",
      "yuga": "Kali",
      "category": "Puranas",
      "description": "One of the most important Puranas detailing creation and avatars.",
      "chapters": []
    },
    "shiva-purana": {
      "title": "Shiva Purana",
      "slug": "shiva-purana",
      "category": "Puranas",
      "yuga": "Kali",
      "description": "Scripture dedicated to Lord Shiva.",
      "chapters": []
    },
    "devi-bhagavata": {
      "title": "Devi Bhagavata Purana",
      "slug": "devi-bhagavata",
      "category": "Puranas",
      "yuga": "Kali",
      "description": "Mahapurana describing Devi's glories.",
      "chapters": []
    },
    "skanda-purana": {
      "title": "Skanda Purana",
      "slug": "skanda-purana",
      "category": "Puranas",
      "yuga": "Kali",
      "description": "Largest Purana dedicated to Lord Kartikeya.",
      "chapters": []
    },
    "manu-smriti": {
      "title": "Manu Smriti",
      "slug": "manu-smriti",
      "category": "Dharma Shastra",
      "yuga": "Treta",
      "description": "Ancient law book of humanity.",
      "chapters": []
    },
    "narada-smriti": {
      "title": "Narada Smriti",
      "slug": "narada-smriti",
      "category": "Dharma Shastra",
      "yuga": "Treta",
      "description": "Smriti dedicated to social law and justice.",
      "chapters": []
    },
    "agamas": {
      "title": "Agamas",
      "slug": "agamas",
      "category": "Agamas & Tantras",
      "yuga": "Kali",
      "description": "Temple ritual manuals of Shaiva, Shakta, Vaishnava traditions.",
      "chapters": []
    },
    "tantras": {
      "title": "Tantras",
      "slug": "tantras",
      "category": "Agamas & Tantras",
      "yuga": "Kali",
      "description": "Esoteric scriptures related to energy and worship.",
      "chapters": []
    },
    "modern-texts": {
      "title": "Modern Texts",
      "slug": "modern-texts",
      "category": "Kali Yuga Texts",
      "yuga": "Kali",
      "description": "Kaliyuga saints, gurus, mahaans, spiritual literature.",
      "chapters": []
    }
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
    'Jain Agamas & Philosophy',
    'Niti, Artha & Psychology',
    'Bhakti Texts',
    'Yoga & Sadhana',
    'Acharya Bhashyas (Commentaries)',
    'Advanced Vedanta'
];
