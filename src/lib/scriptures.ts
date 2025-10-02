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
    id: 'purana-1',
    title: 'Bhagavata Purana',
    category: 'Puranas',
    content: 'One of Hinduism\'s eighteen great Puranas. It promotes bhakti (devotion) to Krishna, integrating themes from the Advaita philosophy of Adi Shankara, the Vishishtadvaita of Ramanujacharya and the Dvaita of Madhvacharya.'
  },
  {
    id: 'purana-2',
    title: 'Vishnu Purana',
    category: 'Puranas',
    content: 'One of the eighteen Mahapuranas, a genre of ancient and medieval texts of Hinduism. It is an important Pancharatra text in the Vaishnavism literature corpus.'
  },
  {
    id: 'purana-3',
    title: 'Shiva Purana',
    category: 'Puranas',
    content: 'One of eighteen major Puranas, a genre of Sanskrit texts in Hinduism, and part of the Shaivism literature corpus. It primarily centers around the Hindu god Shiva and goddess Parvati.'
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
