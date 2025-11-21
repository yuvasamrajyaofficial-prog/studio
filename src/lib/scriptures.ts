
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
  | 'Advanced Vedanta';

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

// This mock data needs to be updated or replaced with Firestore fetching.
// For now, I will adapt one entry to the new structure to avoid breaking the UI.
export const scriptures: Scripture[] = [
  // 1. SHRUTI – VEDAS (Timeless)
  {
    id: 'veda-rig',
    title: 'Rig Veda',
    slug: 'rig-veda',
    category: 'Vedas',
    yuga: 'Timeless',
    description: 'The Rig Veda is the oldest and most important of the four Vedas, a foundational scripture of Sanatana Dharma. It is a vast collection of 1,028 hymns (sūktas) and 10,600 verses, organized into ten books (maṇḍalas). Composed in Vedic Sanskrit, these hymns are considered divine revelations (Śruti) heard by ancient sages (ṛṣis). They are dedicated to various deities (devas) such as Agni (the fire god), Indra (the king of gods), and Soma (a sacred plant and drink), exploring themes of cosmology, ritual, philosophy, and the nature of reality. It serves as the principal source for understanding the mythology, rituals, and philosophical underpinnings of the early Vedic period.',
    coverImage: '',
    chapters: [],
    references: [],
    createdAt: null,
    updatedAt: null,
    roadmap: [
      "Mandala 1",
      "Mandala 2",
      "Mandala 3",
      "Mandala 4",
      "Mandala 5",
      "Mandala 6",
      "Mandala 7",
      "Mandala 8",
      "Mandala 9",
      "Mandala 10"
    ]
  },
  // Other scriptures are temporarily simplified to avoid breaking the build.
  // They will be updated once we fetch from Firestore.
  {
    id: 'veda-yajur',
    title: 'Yajur Veda',
    category: 'Vedas',
    description: 'A compilation of ritual offering formulas (mantras) that were said by a priest while an individual performed ritual actions.',
    yuga: 'Timeless',
    slug: 'yajur-veda',
    coverImage: '',
    chapters: [],
    references: [],
    createdAt: null,
    updatedAt: null,
    roadmap: [
        "Krishna (Black) Yajur Veda",
        "Shukla (White) Yajur Veda"
    ]
  },
  {
    id: 'veda-sama',
    title: 'Sama Veda',
    category: 'Vedas',
    description: 'The Veda of melodies and chants, its hymns are meant to be sung during rituals.',
    yuga: 'Timeless',
    slug: 'sama-veda',
    coverImage: '',
    chapters: [],
    references: [],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 'veda-atharva',
    title: 'Atharva Veda',
    category: 'Vedas',
    description: 'A collection of spells, prayers, charms, and hymns for healing, protection, and daily life.',
    yuga: 'Timeless',
    slug: 'atharva-veda',
    coverImage: '',
    chapters: [],
    references: [],
    createdAt: null,
    updatedAt: null,
  },
   {
    id: 'itihasa-gita',
    title: 'Bhagavad Gita',
    category: 'Itihasa',
    description: 'A 700-verse scripture within the Mahabharata, presenting a dialogue between Krishna and Arjuna on the battlefield.',
    yuga: 'Dvapara',
    slug: 'bhagavad-gita',
    coverImage: '',
    chapters: [],
    references: [],
    createdAt: null,
    updatedAt: null,
  },
];

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
