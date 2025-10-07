
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

export type Scripture = {
  id: string;
  title: string;
  category: ScriptureCategory;
  content: string;
  yuga: Yuga;
};

export const scriptures: Scripture[] = [
  // 1. SHRUTI – VEDAS (Timeless)
  {
    id: 'veda-rig',
    title: 'Rig Veda',
    category: 'Vedas',
    content: 'The Rig Veda is the oldest and most important of the four Vedas, a foundational scripture of Sanatana Dharma. It is a vast collection of 1,028 hymns (sūktas) and 10,600 verses, organized into ten books (maṇḍalas). Composed in Vedic Sanskrit, these hymns are considered divine revelations (Śruti) heard by ancient sages (ṛṣis). They are dedicated to various deities (devas) such as Agni (the fire god), Indra (the king of gods), and Soma (a sacred plant and drink), exploring themes of cosmology, ritual, philosophy, and the nature of reality. It serves as the principal source for understanding the mythology, rituals, and philosophical underpinnings of the early Vedic period.',
    yuga: 'Timeless'
  },
  {
    id: 'veda-yajur',
    title: 'Yajur Veda',
    category: 'Vedas',
    content: 'A compilation of ritual offering formulas (mantras) that were said by a priest while an individual performed ritual actions.',
    yuga: 'Timeless'
  },
  {
    id: 'veda-sama',
    title: 'Sama Veda',
    category: 'Vedas',
    content: 'The Veda of melodies and chants, its hymns are meant to be sung during rituals.',
    yuga: 'Timeless'
  },
  {
    id: 'veda-atharva',
    title: 'Atharva Veda',
    category: 'Vedas',
    content: 'A collection of spells, prayers, charms, and hymns for healing, protection, and daily life.',
    yuga: 'Timeless'
  },

  // 2. UPANISHADS (Timeless, as part of Vedas)
  {
    id: 'upanishad-isha',
    title: 'Isha Upanishad',
    category: 'Upanishads',
    content: 'A brief poem discussing the nature of the supreme being, self, and the world.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-kena',
    title: 'Kena Upanishad',
    category: 'Upanishads',
    content: 'Explores the nature of Brahman and the knower of Brahman.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-katha',
    title: 'Katha Upanishad',
    category: 'Upanishads',
    content: 'Contains the famous dialogue between Nachiketa and Yama on the nature of man, knowledge, Atman and Moksha.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-prashna',
    title: 'Prashna Upanishad',
    category: 'Upanishads',
    content: 'Consists of six questions asked by pupils to the sage Pippalada.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-mundaka',
    title: 'Mundaka Upanishad',
    category: 'Upanishads',
    content: 'Lays out the distinction between the higher knowledge of Brahman and the lower knowledge of the empirical world.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-mandukya',
    title: 'Mandukya Upanishad',
    category: 'Upanishads',
    content: 'The shortest Upanishad, it discusses the syllable Aum and the theory of four states of consciousness.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-taittiriya',
    title: 'Taittiriya Upanishad',
    category: 'Upanishads',
    content: 'Describes the various degrees of happiness and the path to Brahman.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-aitareya',
    title: 'Aitareya Upanishad',
    category: 'Upanishads',
    content: 'Deals with the creation of the universe and the Atman as the creator.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-chandogya',
    title: 'Chandogya Upanishad',
    category: 'Upanishads',
    content: 'A foundational text for the Vedanta school, known for the story of Uddalaka Aruni and his son Shvetaketu.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-brihadaranyaka',
    title: 'Brihadaranyaka Upanishad',
    category: 'Upanishads',
    content: 'One of the oldest and most important Upanishads, it explores the nature of reality and the self.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-shvetashvatara',
    title: 'Shvetashvatara Upanishad',
    category: 'Upanishads',
    content: 'A theistic Upanishad that emphasizes the personal God, Rudra-Shiva.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-kaushitaki',
    title: 'Kaushitaki Upanishad',
    category: 'Upanishads',
    content: 'Discusses the soul\'s journey after death and the doctrine of reincarnation.',
    yuga: 'Timeless'
  },
  {
    id: 'upanishad-maitri',
    title: 'Maitri Upanishad',
    category: 'Upanishads',
    content: 'Deals with the nature of the self and the path of meditation.',
    yuga: 'Timeless'
  },

  // 3. VEDANGA (Timeless)
  {
    id: 'vedanga-shiksha',
    title: 'Shiksha',
    category: 'Vedanga',
    content: 'The science of phonetics and phonology for the correct pronunciation of Vedic hymns and mantras.',
    yuga: 'Timeless'
  },
  {
    id: 'vedanga-vyakarana',
    title: 'Vyakarana (Panini’s Ashtadhyayi)',
    category: 'Vedanga',
    content: 'Sanskrit grammar, with Panini\'s work being the most foundational.',
    yuga: 'Dvapara'
  },
  {
    id: 'vedanga-chandas',
    title: 'Chandas',
    category: 'Vedanga',
    content: 'The study of poetic meters used in the Vedas.',
    yuga: 'Timeless'
  },
  {
    id: 'vedanga-nirukta',
    title: 'Nirukta (Yaska’s Nirukta)',
    category: 'Vedanga',
    content: 'Etymology of Vedic words, explaining their origins and meanings.',
    yuga: 'Dvapara'
  },
  {
    id: 'vedanga-jyotisha',
    title: 'Jyotisha',
    category: 'Vedanga',
    content: 'Vedic astronomy and astrology, used to determine auspicious times for rituals.',
    yuga: 'Timeless'
  },
  {
    id: 'vedanga-kalpa-sutras',
    title: 'Kalpa Sutras',
    category: 'Vedanga',
    content: 'Manuals for rituals, including Shrauta (public rites), Grihya (domestic rites), and Dharma (conduct).',
    yuga: 'Dvapara'
  },

  // 4. DHARMA SHASTRA
  {
    id: 'dharma-satya',
    title: 'Laws of Manu (Satya Yuga)',
    category: 'Dharma Shastra',
    content: 'The codes of conduct and social structure as ordained for the age of truth.',
    yuga: 'Satya'
  },
  {
    id: 'dharma-gautama',
    title: 'Gautama Dharma Sutra',
    category: 'Dharma Shastra',
    content: 'One of the oldest Dharma Sutras, dealing with laws of conduct, inheritance, and penances.',
    yuga: 'Dvapara'
  },
  {
    id: 'dharma-apastamba',
    title: 'Apastamba Dharma Sutra',
    category: 'Dharma Shastra',
    content: 'A text covering a wide range of topics related to dharma, including social customs and legal procedures.',
    yuga: 'Dvapara'
  },
  {
    id: 'dharma-manusmriti',
    title: 'Manusmriti',
    category: 'Dharma Shastra',
    content: 'An ancient legal text giving a discourse on dharma, duties, rights, laws, and conduct.',
    yuga: 'Dvapara'
  },
  {
    id: 'dharma-yajnavalkya',
    title: 'Yajnavalkya Smriti',
    category: 'Dharma Shastra',
    content: 'A legal text that is more structured and less archaic than Manusmriti.',
    yuga: 'Kali'
  },
  {
    id: 'dharma-narada',
    title: 'Narada Smriti',
    category: 'Dharma Shastra',
    content: 'A dharma shastra text that focuses exclusively on procedural and substantive law.',
    yuga: 'Kali'
  },
  {
    id: 'dharma-parashara',
    title: 'Parashara Smriti',
    category: 'Dharma Shastra',
    content: 'A code of laws specifically for the Kali Yuga.',
    yuga: 'Kali'
  },

  // 5. ITIHASA
  {
    id: 'itihasa-ramayana',
    title: 'Ramayana',
    category: 'Itihasa',
    content: 'Epic poem by Valmiki narrating the life and journey of Rama.',
    yuga: 'Treta'
  },
  {
    id: 'itihasa-mahabharata',
    title: 'Mahabharata',
    category: 'Itihasa',
    content: 'Epic poem by Vyasa detailing the Kurukshetra War and the fates of the Kaurava and Pandava princes.',
    yuga: 'Dvapara'
  },
  {
    id: 'itihasa-gita',
    title: 'Bhagavad Gita',
    category: 'Itihasa',
    content: 'A 700-verse scripture within the Mahabharata, presenting a dialogue between Krishna and Arjuna on the battlefield.',
    yuga: 'Dvapara'
  },

  // 6. PURANAS (Composed in Dvapara/Kali)
  {
    id: 'purana-bhagavata',
    title: 'Bhagavata Purana (Srimad Bhagavatam)',
    category: 'Puranas',
    content: 'The most celebrated Purana, focusing on the life and teachings of Krishna and promoting bhakti.',
    yuga: 'Kali'
  },
  {
    id: 'purana-brahma',
    title: 'Brahma Purana',
    category: 'Puranas',
    content: 'Often called the Adi Purana, it contains stories of creation, the life of Brahma, and holy places.',
    yuga: 'Kali'
  },
  {
    id: 'purana-padma',
    title: 'Padma Purana',
    category: 'Puranas',
    content: 'A large Purana that discusses cosmology, pilgrimage, and the glory of Vishnu and Shiva.',
    yuga: 'Kali'
  },
  {
    id: 'purana-vishnu',
    title: 'Vishnu Purana',
    category: 'Puranas',
    content: 'An important Vaishnava text detailing the stories of Vishnu and his avatars.',
    yuga: 'Kali'
  },
  {
    id: 'purana-shiva',
    title: 'Shiva Purana',
    category: 'Puranas',
    content: 'A major Shaiva text dedicated to the stories and worship of Shiva.',
    yuga: 'Kali'
  },
  {
    id: 'purana-linga',
    title: 'Linga Purana',
    category: 'Puranas',
    content: 'A Shaiva text that focuses on the worship of Shiva in the form of the Linga.',
    yuga: 'Kali'
  },
  {
    id: 'purana-garuda',
    title: 'Garuda Purana',
    category: 'Puranas',
    content: 'Known for its descriptions of the afterlife, funeral rites, and reincarnation.',
    yuga: 'Kali'
  },
  {
    id: 'purana-narada',
    title: 'Narada Purana',
    category: 'Puranas',
    content: 'Discusses various pilgrimage sites and the importance of devotion to Vishnu.',
    yuga: 'Kali'
  },
  {
    id: 'purana-agni',
    title: 'Agni Purana',
    category: 'Puranas',
    content: 'An encyclopedic text covering a vast range of topics including rituals, cosmology, and astrology.',
    yuga: 'Kali'
  },
  {
    id: 'purana-skanda',
    title: 'Skanda Purana',
    category: 'Puranas',
    content: 'The largest Mahapurana, containing a wealth of myths, legends, and pilgrimage guides.',
    yuga: 'Kali'
  },
  {
    id: 'purana-bhavishya',
    title: 'Bhavishya Purana',
    category: 'Puranas',
    content: 'A text that contains prophecies regarding the future.',
    yuga: 'Kali'
  },
  {
    id: 'purana-brahmavaivarta',
    title: 'Brahmavaivarta Purana',
    category: 'Puranas',
    content: 'Focuses on Krishna and Radha, identifying Krishna as the supreme being.',
    yuga: 'Kali'
  },
  {
    id: 'purana-markandeya',
    title: 'Markandeya Purana',
    category: 'Puranas',
    content: 'Famous for containing the Devi Mahatmya, a key text of Shaktism.',
    yuga: 'Kali'
  },
  {
    id: 'purana-vamana',
    title: 'Vamana Purana',
    category: 'Puranas',
    content: 'Narrates the story of Vishnu\'s dwarf avatar, Vamana.',
    yuga: 'Kali'
  },
  {
    id: 'purana-varaha',
    title: 'Varaha Purana',
    category: 'Puranas',
    content: 'Focuses on Vishnu\'s boar avatar, Varaha, and stories related to his worship.',
    yuga: 'Kali'
  },
  {
    id: 'purana-matsya',
    title: 'Matsya Purana',
    category: 'Puranas',
    content: 'Details the story of Vishnu\'s fish avatar, Matsya, and includes genealogies of royal dynasties.',
    yuga: 'Kali'
  },
  {
    id: 'purana-kurma',
    title: 'Kurma Purana',
    category: 'Puranas',
    content: 'Recited by Vishnu in his tortoise avatar, Kurma, it discusses theological and pilgrimage topics.',
    yuga: 'Kali'
  },
  {
    id: 'purana-brahmanda',
    title: 'Brahmanda Purana',
    category: 'Puranas',
    content: 'Named after the "cosmic egg," it contains the Lalita Sahasranama and discusses cosmology and geography.',
    yuga: 'Kali'
  },

  // 7. UPAPURANAS (Kali)
  {
    id: 'upapurana-kalika',
    title: 'Kalika Purana',
    category: 'Upapuranas',
    content: 'A Shakta text focusing on the goddess Kali.',
    yuga: 'Kali'
  },
  {
    id: 'upapurana-devi-bhagavata',
    title: 'Devi Bhagavata Purana',
    category: 'Upapuranas',
    content: 'A major Shakta text that presents the Goddess as the supreme being and foundation of the cosmos.',
    yuga: 'Kali'
  },
  {
    id: 'upapurana-ganesha',
    title: 'Ganesha Purana',
    category: 'Upapuranas',
    content: 'A text dedicated to the stories and worship of Ganesha.',
    yuga: 'Kali'
  },
  {
    id: 'upapurana-narasimha',
    title: 'Narasimha Purana',
    category: 'Upapuranas',
    content: 'Focuses on the stories of Vishnu\'s man-lion avatar, Narasimha.',
    yuga: 'Kali'
  },
  {
    id: 'upapurana-saura',
    title: 'Saura Purana',
    category: 'Upapuranas',
    content: 'A text dedicated to the sun god, Surya.',
    yuga: 'Kali'
  },

  // 8. DARSHANAS (Dvapara/Kali)
  {
    id: 'darshana-nyaya',
    title: 'Nyaya Sutras',
    category: 'Darshanas (Philosophy)',
    content: 'A foundational text of the Nyaya school of logic by Gautama.',
    yuga: 'Kali'
  },
  {
    id: 'darshana-vaisheshika',
    title: 'Vaisheshika Sutras',
    category: 'Darshanas (Philosophy)',
    content: 'A text by Kanada that lays out the principles of atomic theory and metaphysics.',
    yuga: 'Kali'
  },
  {
    id: 'darshana-samkhya',
    title: 'Samkhya Karika',
    category: 'Darshanas (Philosophy)',
    content: 'A key text of the Samkhya school by Kapila, detailing the dualistic philosophy of purusha and prakriti.',
    yuga: 'Kali'
  },
  {
    id: 'darshana-yoga',
    title: 'Yoga Sutras',
    category: 'Darshanas (Philosophy)',
    content: 'A collection of 196 sutras by Patanjali on the theory and practice of Yoga.',
    yuga: 'Kali'
  },
  {
    id: 'darshana-mimamsa',
    title: 'Purva Mimamsa Sutras',
    category: 'Darshanas (Philosophy)',
    content: 'A text by Jaimini that focuses on the exegesis of the Vedas and the rituals of yajna.',
    yuga: 'Dvapara'
  },
  {
    id: 'darshana-vedanta',
    title: 'Vedanta / Brahma Sutras',
    category: 'Darshanas (Philosophy)',
    content: 'A text by Vyasa that systematizes the philosophical ideas of the Upanishads.',
    yuga: 'Dvapara'
  },

  // 9. AGAMAS & TANTRAS (Kali)
  {
    id: 'agama-shaiva',
    title: 'Shaiva Agamas',
    category: 'Agamas & Tantras',
    content: 'A collection of texts that form the theological basis of Shaivism.',
    yuga: 'Kali'
  },
  {
    id: 'agama-vaishnava',
    title: 'Vaishnava Agamas',
    category: 'Agamas & Tantras',
    content: 'Texts like Pancharatra and Vaikhanasa that are foundational to Vaishnava temple rituals.',
    yuga: 'Kali'
  },
  {
    id: 'agama-shakta',
    title: 'Shakta Agamas (Tantras)',
    category: 'Agamas & Tantras',
    content: 'Texts central to Shaktism, focusing on the worship of the Divine Mother.',
    yuga: 'Kali'
  },
  {
    id: 'tantra-vijnana-bhairava',
    title: 'Vijnana Bhairava Tantra',
    category: 'Agamas & Tantras',
    content: 'A key text of Kashmir Shaivism, presenting 112 meditation methods (dharanas).',
    yuga: 'Kali'
  },
  {
    id: 'tantra-shiva-sutras',
    title: 'Shiva Sutras of Vasugupta',
    category: 'Agamas & Tantras',
    content: 'A foundational text of Kashmir Shaivism, outlining the path to the realization of ultimate reality.',
    yuga: 'Kali'
  },
  {
    id: 'tantra-spanda-karika',
    title: 'Spanda Karika',
    category: 'Agamas & Tantras',
    content: 'A text by Kallata that elaborates on the principles of the Shiva Sutras.',
    yuga: 'Kali'
  },
  {
    id: 'tantra-rudra-yamala',
    title: 'Rudra Yamala Tantra',
    category: 'Agamas & Tantras',
    content: 'A tantric text that presents its teachings as a dialogue between Shiva and Bhairavi.',
    yuga: 'Kali'
  },
  {
    id: 'tantra-kularnava',
    title: 'Kularnava Tantra',
    category: 'Agamas & Tantras',
    content: 'One of the most important texts of the Kaula school of Tantra.',
    yuga: 'Kali'
  },
  {
    id: 'tantra-mahanirvana',
    title: 'Mahanirvana Tantra',
    category: 'Agamas & Tantras',
    content: 'A tantric text presented as a dialogue between Shiva and Parvati, discussing rituals and spiritual practices for the Kali Yuga.',
    yuga: 'Kali'
  },
  
  // JAINISM (Timeless, placed in Kali for practical purposes of the app)
  {
    id: 'jain-agamas',
    title: 'Jain Agamas',
    category: 'Jain Agamas & Philosophy',
    content: 'The canonical scriptures of Jainism as per the Svetambara tradition, including the 12 Angas.',
    yuga: 'Kali'
  },
  {
    id: 'jain-samayasara',
    title: 'Samayasara',
    category: 'Jain Agamas & Philosophy',
    content: 'A key Digambara Jain text by Acharya Kundakunda on the nature of the self (Atman).',
    yuga: 'Kali'
  },
  {
    id: 'jain-tattvartha',
    title: 'Tattvartha Sutra',
    category: 'Jain Agamas & Philosophy',
    content: 'A foundational Jain text by Umaswati, accepted by all major sects, summarizing Jain philosophy.',
    yuga: 'Kali'
  },
   {
    id: 'jain-acharanga',
    title: 'Acharanga Sutra',
    category: 'Jain Agamas & Philosophy',
    content: 'The first of the twelve Angas, it deals with the conduct of a Jain monk.',
    yuga: 'Kali'
  },
  {
    id: 'jain-kalpa',
    title: 'Kalpa Sūtra',
    category: 'Jain Agamas & Philosophy',
    content: 'A Jain text containing the biographies of the Jinas, notably Parshvanatha and Mahavira.',
    yuga: 'Kali'
  },


  // 10. NITI, ARTHA & PSYCHOLOGY (Kali)
  {
    id: 'niti-chanakya',
    title: 'Chanakya Niti',
    category: 'Niti, Artha & Psychology',
    content: 'A collection of aphorisms on ethics, governance, and statecraft by Kautilya.',
    yuga: 'Kali'
  },
  {
    id: 'niti-arthashastra',
    title: 'Arthashastra',
    category: 'Niti, Artha & Psychology',
    content: 'An ancient treatise on statecraft, economic policy, and military strategy by Kautilya.',
    yuga: 'Kali'
  },
  {
    id: 'niti-panchatantra',
    title: 'Panchatantra',
    category: 'Niti, Artha & Psychology',
    content: 'An ancient collection of animal fables in verse and prose by Vishnu Sharma.',
    yuga: 'Kali'
  },
  {
    id: 'niti-hitopadesha',
    title: 'Hitopadesha',
    category: 'Niti, Artha & Psychology',
    content: 'A collection of fables with moral teachings by Narayana Pandit.',
    yuga: 'Kali'
  },
  {
    id: 'niti-nitishataka',
    title: 'Nitishataka',
    category: 'Niti, Artha & Psychology',
    content: 'One of three collections of hundred verses by Bhartrihari, dealing with ethics and worldly wisdom.',
    yuga: 'Kali'
  },
  {
    id: 'niti-nitisara',
    title: 'Nitisara',
    category: 'Niti, Artha & Psychology',
    content: 'A work on polity and statecraft by Kamandaka.',
    yuga: 'Kali'
  },
  {
    id: 'niti-shukra',
    title: 'Shukra Niti',
    category: 'Niti, Artha & Psychology',
    content: 'A treatise on morality, social customs, and statecraft attributed to the sage Shukracharya.',
    yuga: 'Kali'
  },

  // 11. BHAKTI TEXTS (Kali)
  {
    id: 'bhakti-narada-sutra',
    title: 'Narada Bhakti Sutra',
    category: 'Bhakti Texts',
    content: 'A collection of sutras on the nature of devotion (bhakti).',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-sandilya-sutra',
    title: 'Sandilya Bhakti Sutra',
    category: 'Bhakti Texts',
    content: 'Another important text on the philosophy of devotion.',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-ramcharitmanas',
    title: 'Ramcharitmanas',
    category: 'Bhakti Texts',
    content: 'An epic poem in the Awadhi language by Tulsidas, retelling the Ramayana with a focus on bhakti.',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-bhaja-govindam',
    title: 'Bhaja Govindam',
    category: 'Bhakti Texts',
    content: 'A popular hymn by Shankaracharya that emphasizes devotion to Govinda (Krishna) as essential for salvation.',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-gita-govinda',
    title: 'Gita Govinda',
    category: 'Bhakti Texts',
    content: 'A poetic work by Jayadeva describing the relationship between Krishna and Radha.',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-divya-prabandham',
    title: 'Divya Prabandham',
    category: 'Bhakti Texts',
    content: 'A collection of 4,000 Tamil verses by the Alvars, the poet-saints of Vaishnavism.',
    yuga: 'Kali'
  },
  {
    id: 'bhakti-tevaram',
    title: 'Tevaram',
    category: 'Bhakti Texts',
    content: 'A collection of Tamil hymns dedicated to Shiva, composed by the Nayanmars, the poet-saints of Shaivism.',
    yuga: 'Kali'
  },

  // 12. YOGA & SADHANA TEXTS (Kali)
  {
    id: 'yoga-hatha-pradipika',
    title: 'Hatha Yoga Pradipika',
    category: 'Yoga & Sadhana',
    content: 'A classic manual on Hatha Yoga by Svatmarama, detailing asanas, pranayama, mudras, and bandhas.',
    yuga: 'Kali'
  },
  {
    id: 'yoga-gheranda-samhita',
    title: 'Gheranda Samhita',
    category: 'Yoga & Sadhana',
    content: 'A comprehensive text on Hatha Yoga, presented as a dialogue between the sage Gheranda and his disciple.',
    yuga: 'Kali'
  },
  {
    id: 'yoga-shiva-samhita',
    title: 'Shiva Samhita',
    category: 'Yoga & Sadhana',
    content: 'A text on Hatha Yoga that emphasizes the philosophical and spiritual aspects of the practice.',
    yuga: 'Kali'
  },
  {
    id: 'yoga-yajnavalkya',
    title: 'Yoga Yajnavalkya',
    category: 'Yoga & Sadhana',
    content: 'A classical treatise on Yoga presented as a dialogue between the sage Yajnavalkya and his wife Gargi.',
    yuga: 'Kali'
  },

  // 13. ACHARYA BHASHYAS & VEDANTA WORKS (Kali)
  {
    id: 'bhashya-sankara-brahma-sutra',
    title: 'Brahma Sutra Bhashya (Shankara)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Shankaracharya\'s commentary on the Brahma Sutras, the foundational text of Advaita Vedanta.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-sankara-gita',
    title: 'Bhagavad Gita Bhashya (Shankara)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Shankaracharya\'s commentary on the Bhagavad Gita from an Advaita perspective.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-sankara-upanishad',
    title: 'Upanishad Bhashyas (Shankara)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Shankaracharya\'s commentaries on the principal Upanishads.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-upadesa-sahasri',
    title: 'Upadesa Sahasri',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'A work by Shankaracharya consisting of a thousand teachings on Advaita Vedanta.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-vivekachudamani',
    title: 'Vivekachudamani',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'A famous introductory text on Advaita Vedanta, attributed to Shankaracharya.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-atma-bodha',
    title: 'Atma Bodha',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'A short treatise on Advaita Vedanta by Shankaracharya, explaining the path to self-realization.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-aparokshanubhuti',
    title: 'Aparokshanubhuti',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'A text by Shankaracharya on the direct experience of the Self.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-ramanuja-sri',
    title: 'Sri Bhashya (Ramanuja)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Ramanujacharya\'s commentary on the Brahma Sutras, the foundational text of Vishishtadvaita Vedanta.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-ramanuja-gita',
    title: 'Gita Bhashya (Ramanuja)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Ramanujacharya\'s commentary on the Bhagavad Gita from a Vishishtadvaita perspective.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-vedartha-sangraha',
    title: 'Vedartha Sangraha',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'A work by Ramanujacharya that summarizes the philosophy of Vishishtadvaita.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-madhva-brahma-sutra',
    title: 'Brahma Sutra Bhashya (Madhva)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Madhvacharya\'s commentary on the Brahma Sutras, the foundational text of Dvaita Vedanta.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-madhva-gita',
    title: 'Gita Bhashya (Madhva)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Madhvacharya\'s commentary on the Bhagavad Gita from a Dvaita perspective.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-mahabharata-tatparya',
    title: 'Mahabharata Tatparya Nirnaya',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Madhvacharya\'s commentary on the Mahabharata, interpreting it from a Dvaita viewpoint.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-vallabha-anubhashya',
    title: 'Anubhashya (Vallabha)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Vallabhacharya\'s commentary on the Brahma Sutras, outlining the philosophy of Shuddhadvaita.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-vallabha-subodhini',
    title: 'Subodhini (Vallabha)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Vallabhacharya\'s commentary on the Bhagavata Purana.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-nimbarka-vedanta-parijata',
    title: 'Vedanta Parijata Saurabha (Nimbarka)',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Nimbarkacharya\'s commentary on the Brahma Sutras, expounding the philosophy of Dvaitadvaita.',
    yuga: 'Kali'
  },
  {
    id: 'vedanta-siksastakam',
    title: 'Siksastakam',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Eight devotional verses composed by Chaitanya Mahaprabhu, encapsulating the philosophy of Gaudiya Vaishnavism.',
    yuga: 'Kali'
  },
  {
    id: 'bhashya-gaudiya-bhagavata',
    title: 'Gaudiya Vaishnava Commentaries',
    category: 'Acharya Bhashyas (Commentaries)',
    content: 'Commentaries on the Bhagavata Purana by followers of Chaitanya Mahaprabhu.',
    yuga: 'Kali'
  },

  // 14. ADVANCED VEDANTA & JNANA TEXTS (Kali)
  {
    id: 'jnana-yoga-vasistha',
    title: 'Yoga Vasistha',
    category: 'Advanced Vedanta',
    content: 'A detailed text on Advaita Vedanta presented as a dialogue between the sage Vasistha and Prince Rama.',
    yuga: 'Kali'
  },
  {
    id: 'jnana-ashtavakra-gita',
    title: 'Ashtavakra Gita',
    category: 'Advanced Vedanta',
    content: 'A dialogue between the sage Ashtavakra and King Janaka on the nature of the Self, reality, and bondage.',
    yuga: 'Kali'
  },
  {
    id: 'jnana-avadhuta-gita',
    title: 'Avadhuta Gita',
    category: 'Advanced Vedanta',
    content: 'A text of extreme Advaita, expressing the state of a liberated soul (Avadhuta).',
    yuga: 'Kali'
  },
  {
    id: 'jnana-tripura-rahasya',
    title: 'Tripura Rahasya',
    category: 'Advanced Vedanta',
    content: 'A text of Advaita Vedanta that explains the teachings through the story of the goddess Tripura.',
    yuga: 'Kali'
  },
  {
    id: 'jnana-ribhu-gita',
    title: 'Ribhu Gita',
    category: 'Advanced Vedanta',
    content: 'A part of the Sivarahasya Purana, it is a dialogue between the sage Ribhu and his disciple Nidagha on the unreality of the world and the sole reality of Brahman.',
    yuga: 'Kali'
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
