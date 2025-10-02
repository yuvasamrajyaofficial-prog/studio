export type ScriptureCategory = 'Ancient Scriptures' | 'Regional Texts' | 'Philosophical Works' | 'Puranas';

export type Scripture = {
  id: string;
  title: string;
  category: ScriptureCategory;
  content: string;
};

export const scriptures: Scripture[] = [
  {
    id: 'veda-1',
    title: 'Rigveda',
    category: 'Ancient Scriptures',
    content: 'An ancient Indian collection of Vedic Sanskrit hymns. It is one of the four sacred canonical texts of Hinduism known as the Vedas.'
  },
  {
    id: 'upanishad-1',
    title: 'Isha Upanishad',
    category: 'Ancient Scriptures',
    content: 'One of the shortest Upanishads, embedded as the final chapter of the Shukla Yajurveda. It is a Mukhya Upanishad, and is known in two recensions, called Kanva and Madhyandina.'
  },
  {
    id: 'epic-1',
    title: 'Ramayana',
    category: 'Ancient Scriptures',
    content: 'An ancient Indian epic poem which narrates the struggle of the divine prince Rama to rescue his wife Sita from the demon king Ravana.'
  },
  {
    id: 'epic-2',
    title: 'Mahabharata',
    category: 'Ancient Scriptures',
    content: 'One of the two major Sanskrit epics of ancient India, it narrates the struggle between two groups of cousins in the Kurukshetra War and the fates of the Kaurava and the Pāṇḍava princes and their successors.'
  },
  {
    id: 'gita-1',
    title: 'Bhagavad Gita',
    category: 'Ancient Scriptures',
    content: 'A 700-verse Hindu scripture that is part of the epic Mahabharata, dated to the second half of the first millennium BCE and is typical of the Hindu synthesis.'
  },
  {
    id: 'smriti-1',
    title: 'Manusmriti',
    category: 'Ancient Scriptures',
    content: 'A discourse given by Manu and Bhrigu on dharma topics such as duties, rights, laws, conduct, virtues and others.'
  },
  {
    id: 'purana-bhagavata',
    title: 'Bhagavata Purana',
    category: 'Puranas',
    content: 'One of Hinduism\'s eighteen great Puranas. It promotes bhakti (devotion) to Krishna, integrating themes from the Advaita philosophy of Adi Shankara, the Vishishtadvaita of Ramanujacharya and the Dvaita of Madhvacharya.'
  },
  {
    id: 'purana-vishnu',
    title: 'Vishnu Purana',
    category: 'Puranas',
    content: 'One of the eighteen Mahapuranas, a genre of ancient and medieval texts of Hinduism. It is an important Pancharatra text in the Vaishnavism literature corpus.'
  },
  {
    id: 'purana-shiva',
    title: 'Shiva Purana',
    category: 'Puranas',
    content: 'One of eighteen major Puranas, a genre of Sanskrit texts in Hinduism, and part of the Shaivism literature corpus. It primarily centers around the Hindu god Shiva and goddess Parvati.'
  },
  {
    id: 'purana-agni',
    title: 'Agni Purana',
    category: 'Puranas',
    content: 'A Sanskrit text and one of the eighteen major Puranas of Hinduism. The text is encyclopedic, covering topics such as cosmology, mythology, genealogy, politics, education system, iconography, taxation theories, organization of army, theories on proper causes for war, martial arts, diplomacy, local laws, building public projects, water distribution methods, trees and plants, medicine, Vastu Shastra (architecture), and gemology.'
  },
  {
    id: 'purana-bhavishya',
    title: 'Bhavishya Purana',
    category: 'Puranas',
    content: 'One of the eighteen major works in the Purana genre of Hinduism, written in Sanskrit. The title Bhavishya means "future" and implies it is a work that contains prophecies regarding the future.'
  },
  {
    id: 'purana-brahma',
    title: 'Brahma Purana',
    category: 'Puranas',
    content: 'One of the eighteen major Puranas genre of Hindu texts in Sanskrit language. It is listed as the first Maha-Purana in all the anthologies, and therefore also called Adi Purana.'
  },
  {
    id: 'purana-brahmanda',
    title: 'Brahmanda Purana',
    category: 'Puranas',
    content: 'A Sanskrit text and one of the eighteen major Puranas. It is listed as the 18th Maha-Purana in almost all the anthologies. The text is named after one of the cosmological theories of Hinduism, which is the "cosmic egg" (Brahma-anda).'
  },
  {
    id: 'purana-brahmavaivarta',
    title: 'Brahmavaivarta Purana',
    category: 'Puranas',
    content: 'A voluminous Sanskrit text and a major Purana of Hinduism. It is a Vaishnavism text, and it is with the Bhagavata Purana, that has been influential to the Krishna-related Hindu traditions.'
  },
  {
    id: 'purana-garuda',
    title: 'Garuda Purana',
    category: 'Puranas',
    content: 'One of the 18 Mahapuranas. It is a Vaishnavism text, and its first part contains a dialogue between Vishnu and Garuda. The second half of the text deals with details of life after death, funeral rites and metaphysics of reincarnation.'
  },
  {
    id: 'purana-kurma',
    title: 'Kurma Purana',
    category: 'Puranas',
    content: 'One of the eighteen Mahapuranas. The text is named after the tortoise avatar of Vishnu. The text is believed to have been recited by Kurma to king Indradyumna and the sages in the Naimisha forest.'
  },
  {
    id: 'purana-linga',
    title: 'Linga Purana',
    category: 'Puranas',
    content: 'One of the eighteen Mahapuranas, and a Shaivism text of Hinduism. The text\'s title Linga refers to the icon of Shiva.'
  },
  {
    id: 'purana-markandeya',
    title: 'Markandeya Purana',
    category: 'Puranas',
    content: 'One of the eighteen major Mahapuranas. The text is named after the sage Markandeya who is the central character in it. The text is probably one of the oldest Puranas in Hinduism.'
  },
  {
    id: 'purana-matsya',
    title: 'Matsya Purana',
    category: 'Puranas',
    content: 'One of the eighteen major Puranas. The text is named after the half-human and half-fish avatar of Vishnu, Matsya. The text is notable for providing one of the earliest known definitions of a Purana.'
  },
  {
    id: 'purana-narada',
    title: 'Narada Purana',
    category: 'Puranas',
    content: 'Also known as Naradiya Purana, is one of the eighteen Mahapuranas, and a Vaishnavism text. It is a compilation of two parts (bhagas), with the first part called Purvabhaga and the second part called Uttarabhaga.'
  },
  {
    id: 'purana-padma',
    title: 'Padma Purana',
    category: 'Puranas',
    content: 'One of the eighteen major Puranas, and a Vaishnavism text. It is named after the lotus in which creator god Brahma appeared. It is a large text, with over 50,000 verses.'
  },
  {
    id: 'purana-skanda',
    title: 'Skanda Purana',
    category: 'Puranas',
    content: 'The largest Mahapurana, a genre of eighteen Hindu religious texts. The text is devoted mainly to the lilas of Kartikeya, a son of Shiva and Parvati, who is also known as Skanda.'
  },
  {
    id: 'purana-vamana',
    title: 'Vamana Purana',
    category: 'Puranas',
    content: 'One of the eighteen major Puranas. The text is named after one of the ten incarnations of Vishnu. It is a Vaishnavism text, and its main focus is on the stories of Vamana, an avatar of Vishnu.'
  },
  {
    id: 'purana-varaha',
    title: 'Varaha Purana',
    category: 'Puranas',
    content: 'One of the eighteen Mahapuranas. The text is named after the boar avatar of Vishnu, Varaha. The text contains stories of Varaha, and is a Vaishnavism text.'
  },
  {
    id: 'regional-1',
    title: 'Tirukkuṛaḷ',
    category: 'Regional Texts',
    content: 'A classic Tamil language text consisting of 1,330 short couplets of seven words each, or kurals. The text is divided into three books with aphoristic teachings on virtue, wealth, and love.'
  },
  {
    id: 'regional-2',
    title: 'Gita Govinda',
    category: 'Regional Texts',
    content: 'A work composed by the 12th-century Indian poet, Jayadeva. It describes the relationship between Krishna and the gopis of Vrindavana, and in particular one gopi named Radha.'
  },
  {
    id: 'philo-1',
    title: 'Yoga Sutras of Patanjali',
    category: 'Philosophical Works',
    content: 'A collection of 196 Indian sutras on the theory and practice of yoga. The Yoga Sutras were compiled sometime between 500 BCE and 400 CE by the sage Patanjali.'
  },
  {
    id: 'philo-2',
    title: 'Brahma Sutras',
    category: 'Philosophical Works',
    content: 'A Sanskrit text, attributed to the sage Badarayana or Vyasa, estimated to have been completed in its surviving form in approx. 400-450 CE. The text systematizes and summarizes the philosophical and spiritual ideas in the Upanishads.'
  },
];
