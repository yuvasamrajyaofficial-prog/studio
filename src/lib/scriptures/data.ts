import { Scripture } from '@/types/scripture';

export const MOCK_SCRIPTURES: Scripture[] = [
  {
    id: 'bhagavad-gita',
    slug: 'bhagavad-gita',
    title: {
      en: 'Bhagavad Gita',
      sa: 'भगवद्गीता',
      hi: 'श्रीमद्भगवद्गीता',
    },
    description: {
      en: 'The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and the god Krishna, who serves as his charioteer.',
    },
    author: 'Vyasa',
    tradition: 'Hinduism',
    tags: ['Yoga', 'Dharma', 'Karma', 'Bhakti'],
    coverImage: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1000&auto=format&fit=crop',
    totalChapters: 18,
    languages: ['en', 'sa', 'hi'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'rig-veda',
    slug: 'rig-veda',
    title: {
      en: 'Rig Veda',
      sa: 'ऋग्वेद',
    },
    description: {
      en: 'The Rigveda is an ancient Indian collection of Vedic Sanskrit hymns. It is one of the four sacred canonical texts (śruti) of Hinduism known as the Vedas.',
    },
    author: 'Various Rishis',
    tradition: 'Hinduism',
    tags: ['Vedas', 'Hymns', 'Rituals'],
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    totalChapters: 10,
    languages: ['en', 'sa'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'dhammapada',
    slug: 'dhammapada',
    title: {
      en: 'Dhammapada',
      pi: 'धम्मपद',
    },
    description: {
      en: 'The Dhammapada is a collection of sayings of the Buddha in verse form and one of the most widely read and best known Buddhist scriptures.',
    },
    author: 'Buddha',
    tradition: 'Buddhism',
    tags: ['Buddhism', 'Wisdom', 'Ethics'],
    coverImage: 'https://images.unsplash.com/photo-1526716173434-a1b560f2065d?q=80&w=1000&auto=format&fit=crop',
    totalChapters: 26,
    languages: ['en', 'pi'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_CHAPTERS = [
  {
    id: 'gita-ch1',
    scriptureId: 'bhagavad-gita',
    number: 1,
    title: {
      en: 'Arjuna Vishada Yoga',
      sa: 'अर्जुनविषादयोग',
    },
    summary: {
      en: 'The Yoga of Arjuna\'s Dejection. Arjuna sees his relatives and friends on the opposing side and is overcome with grief and despair.',
    },
    versesCount: 47,
    order: 1,
  },
  {
    id: 'gita-ch2',
    scriptureId: 'bhagavad-gita',
    number: 2,
    title: {
      en: 'Sankhya Yoga',
      sa: 'सांख्ययोग',
    },
    summary: {
      en: 'The Yoga of Knowledge. Krishna begins his teaching by distinguishing between the temporary body and the eternal soul.',
    },
    versesCount: 72,
    order: 2,
  },
];

export const MOCK_VERSES = [
  {
    id: 'gita-1-1',
    scriptureId: 'bhagavad-gita',
    chapterId: 'gita-ch1',
    number: 1,
    text: {
      original: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
      transliteration: 'dharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||',
    },
    translations: {
      en: 'Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?',
      hi: 'धृतराष्ट्र बोले- हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा वाले मेरे और पाण्डु के पुत्रों ने क्या किया?',
      kn: 'ಧೃತರಾಷ್ಟ್ರ ಉವಾಚ: ಧರ್ಮಕ್ಷೇತ್ರವಾದ ಕುರುಕ್ಷೇತ್ರದಲ್ಲಿ ಯುದ್ಧಮಾಡಲು ಬಯಸಿ ಸೇರಿರುವ ನನ್ನವರು ಮತ್ತು ಪಾಂಡವರು ಏನು ಮಾಡಿದರು ಸಂಜಯ?',
    },
  },
  {
    id: 'gita-1-2',
    scriptureId: 'bhagavad-gita',
    chapterId: 'gita-ch1',
    number: 2,
    text: {
      original: 'सञ्जय उवाच ।\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥',
      transliteration: 'sañjaya uvāca |\ndṛṣṭvā tu pāṇḍavānīkaṃ vyūḍhaṃ duryodhanastadā |\nācāryamupasaṅgamya rājā vacanamabravīt ||',
    },
    translations: {
      en: 'Sanjaya said: O King, after looking at the army arranged in military formation by the sons of Pandu, King Duryodhana went to his teacher and spoke the following words.',
      hi: 'संजय बोले- उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर और द्रोणाचार्य के पास जाकर यह वचन कहा।',
      kn: 'ಸಂಜಯ ಉವಾಚ: ಆ ಸಮಯದಲ್ಲಿ ರಾಜ ದುರ್ಯೋಧನನು ವ್ಯೂಹ ರಚನೆಯಿಂದ ಕೂಡಿದ ಪಾಂಡವರ ಸೈನ್ಯವನ್ನು ನೋಡಿ ದ್ರೋಣಾಚಾರ್ಯರ ಬಳಿಗೆ ಹೋಗಿ ಈ ಮಾತನ್ನು ಹೇಳಿದನು.',
    },
  },
];
