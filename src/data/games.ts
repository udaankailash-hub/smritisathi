import { CognitiveGame } from '../types';

export const COGNITIVE_GAMES: CognitiveGame[] = [
  {
    id: 'game_personal_memory',
    title: 'Personal Memory Engagement (Showcase)',
    category: 'FAMILY_MEMORY',
    description: 'Engage with private photos of loved ones, familiar places, and caregiver-approved milestones.',
    targetSkill: 'Episodic Recall, Personal Identity & Gentle Reminiscence',
    culturalTheme: 'Caregiver-Approved Family Photos, Veranda Tea, Ancestral Home, Loved Ones',
    iconName: 'Heart',
    estimatedMinutes: 3,
    minDifficulty: 'easy',
    maxDifficulty: 'hard',
    instructions: {
      en: 'Look at the family photograph and answer the gentle question using your voice or by tapping.',
      as: 'পৰিয়ালৰ ফটোখন চাওক আৰু আপোনাৰ আত্মীয়ৰ বিষয়ে সোধা প্ৰশ্নটোৰ উত্তৰ মুখেৰে কওক বা টিপক।',
      bn: 'পারিবারিক ছবিটি দেখুন এবং প্রিয়জন সম্পর্কিত প্রশ্নের উত্তর মুখে বলুন বা বেছে নিন।',
      mni: 'ইমুংগী ফোতো অসি য়েংবীয়ু অমসুং অচুম্বা ৱাহংদু খুম্বীয়ু।',
      lus: 'Chhungkua thlalak en la, zawhna zangkhai tak hi aw emaw hmeh hmangin chhang rawh.',
      kha: 'Peit ia ka dur iing bad jubab ia ka jingkylli da ka ktien lane da kaba thoh.',
      hi: 'परिवार की तस्वीर देखें और बोलकर या टैप करके सवाल का उत्तर दें।'
    }
  },
  {
    id: 'game_memory_match',
    title: 'Memory Cards (Cultural Match)',
    category: 'MEMORY',
    description: 'Find matching pairs of familiar North Eastern cultural motifs, tea leaves, and artifacts.',
    targetSkill: 'Visual Working Memory & Cultural Pattern Recognition',
    culturalTheme: 'Assam Silk, Kaziranga Rhino, Hornbill, Tea Garden, Bamboo Crafts, Loktak Lake',
    iconName: 'Sparkles',
    estimatedMinutes: 3,
    minDifficulty: 'easy',
    maxDifficulty: 'hard',
    instructions: {
      en: 'Tap on cards to flip them over. Find pairs that match!',
      as: 'কাৰ্ডবোৰত টিপক আৰু যোৰা মিলাওক। একে ছবি থকা কাৰ্ড দুখন বিচাৰি উলিয়াওক।',
      bn: 'কার্ডে ট্যাপ করে উল্টান এবং জোড়া মেলান!',
      mni: 'কার্দশিং অসি থমজিনবীয়ু অমসুং মান্নবা কুপা থিবীয়ু।',
      lus: 'Card hi hmet la, a inang zawng rawh le!',
      kha: 'Pynkylla ia ki card bad wad ia kiba iasyriem!',
      hi: 'कार्डों पर टैप करें और समान दिखने वाले जोड़ों को मिलाएं!'
    }
  },
  {
    id: 'game_object_recognition',
    title: 'Familiar Object Recognition',
    category: 'OBJECT_RECOGNITION',
    description: 'Recognize everyday tools, identify what they are used for with gentle hints.',
    targetSkill: 'Semantic Memory & Everyday Object Association',
    culturalTheme: 'Traditional Tea Strainer, Bamboo Fan, Reading Spectacles, Pill Organizer',
    iconName: 'Compass',
    estimatedMinutes: 2,
    minDifficulty: 'easy',
    maxDifficulty: 'medium',
    instructions: {
      en: 'Look at the picture and tap the word that describes what this object is.',
      as: 'ছবিখন চাওক আৰু এই বস্তুটো কি হয় চিনাক্ত কৰি নামটোত টিপক।',
      bn: 'ছবিটি দেখুন এবং বস্তুটির সঠিক নামটি নির্বাচন করুন।',
      mni: 'ফোতো অসি য়েংবীয়ু অমসুং পোৎলমসিগী অচুম্বা মিংদু খল্লীয়ু।',
      lus: 'Thlalak hi en la, he thil hming dik tak hi thlang rawh.',
      kha: 'Peit ia ka dur bad jied ia ka kyrteng kaba biang.',
      hi: 'चित्र को देखें और पहचानें कि यह कौन सी वस्तु है।'
    }
  },
  {
    id: 'game_pattern_rhythm',
    title: 'Sequence Memory & Rhythm',
    category: 'PATTERN',
    description: 'Listen to a soothing melodic rhythm sequence and tap the corresponding bells in the same order.',
    targetSkill: 'Working Memory, Sequential Processing & Auditory Focus',
    culturalTheme: 'Bihu Dhol, Temple Chimes & Melodic Flutes',
    iconName: 'Music',
    estimatedMinutes: 3,
    minDifficulty: 'easy',
    maxDifficulty: 'hard',
    instructions: {
      en: 'Watch and listen to the order the bells light up. Then repeat the pattern in the exact sequence.',
      as: 'ঘণ্টিবোৰ কোনটো ক্ৰমত বাজি উঠে লক্ষ্য কৰক আৰু সেইদৰে টিপক।',
      bn: 'ঘণ্টাগুলি বাজার ক্রমটি লক্ষ্য করুন এবং একই ক্রমে ট্যাপ করুন।',
      mni: 'ঘন্তা তাবা মতুং ইন্না অমুক হন্না নম্বীয়ু।',
      lus: 'Dar rih dan indawt hi ngaithla la, a rik dan indawt khan hmet ve rawh.',
      kha: 'Sngap ia ka jingriew ki shakuriaw bad bud ia ka rukom riew.',
      hi: 'घंटियों के बजने का क्रम देखें और उसी क्रम में उन्हें बजाएं।'
    }
  },
  {
    id: 'game_daily_routine_recall',
    title: 'Daily Routine Recall Sequencing',
    category: 'DAILY_RECALL',
    description: 'Arrange daily familiar events in chronological order to reinforce daily executive functioning.',
    targetSkill: 'Temporal Orientation & Daily Executive Routine',
    culturalTheme: 'Morning Garden Walk, Assam Tea Time, Medicine, Reading Newspaper',
    iconName: 'CalendarCheck',
    estimatedMinutes: 3,
    minDifficulty: 'easy',
    maxDifficulty: 'medium',
    instructions: {
      en: 'Put the morning activities in order from what happens first to what happens last.',
      as: 'ৰাতিপুৱাৰ কামবোৰ প্ৰথমৰ পৰা শেষলৈ শুদ্ধ ক্ৰমত সজাওক।',
      bn: 'সকালের কাজগুলি পর পর সাজিয়ে রাখুন।',
      mni: 'অয়ুক্কী থবকশিং অসি অহানবদগী লোইবফাওবা অচুম্বা মতুং ইন্না থম্মু।',
      lus: 'Zingkar thiltih dan indawt hi a hmasa ber atanga a hnuhnung ber thlengin rem rawh.',
      kha: 'Buh ryntih ia ki kam step naduh kaba nyngkong haduh kaba khadduh.',
      hi: 'सुबह की गतिविधियों को उनके सही क्रम में व्यवस्थित करें।'
    }
  },
  {
    id: 'game_object_recall',
    title: 'Visual Object Recall',
    category: 'MEMORY',
    description: 'Observe a collection of household and traditional items, remember them, and identify them when hidden.',
    targetSkill: 'Short-Term Retention & Delayed Recall',
    culturalTheme: 'Traditional Bell, Gamosa, Clay Lamp, Brass Tea Kettle, Walking Cane',
    iconName: 'Eye',
    estimatedMinutes: 2,
    minDifficulty: 'easy',
    maxDifficulty: 'hard',
    instructions: {
      en: 'Look closely at the items shown. When they vanish, tap the ones you remember seeing.',
      as: 'বস্তুবোৰ ভালদৰে চাওক। সেইবোৰ লুকাই গ’লে, আপুনি দেখা বস্তুবোৰত টিপক।',
      bn: 'বস্তুগুলি ভালো করে দেখুন। লুকোনোর পর মনে করে চিহ্নিত করুন।',
      mni: 'পোৎলমশিং অসি নীংথিনা য়েংবীয়ু। মাংলবা মতুংদা নহাক্না উখিবা পোৎলমশিং খল্লীয়ু।',
      lus: 'Thil awmte hi uluk takin en la, a bo hnuah i hriatrengte kha thlang rawh.',
      kha: 'Peit bha ia ki tiar. Ynda ki la jah, jied ia kiba phi kynmaw.',
      hi: 'दिखाई गई वस्तुओं को ध्यान से देखें। फिर याद करके उन पर टैप करें।'
    }
  },
  {
    id: 'game_attention_odd_one',
    title: 'Spot the Different Motif',
    category: 'ATTENTION',
    description: 'Identify the one pattern or symbol that is slightly different from the others in the grid.',
    targetSkill: 'Selective Visual Attention & Discrimination',
    culturalTheme: 'Eri Silk Geometrics & Bamboo Weave Textures',
    iconName: 'Search',
    estimatedMinutes: 2,
    minDifficulty: 'easy',
    maxDifficulty: 'hard',
    instructions: {
      en: 'Look at the row of symbols. One of them is different from the rest. Tap the odd one!',
      as: 'চিহ্নবোৰলৈ চাওক। এটা চিহ্ন বাকীবোৰৰ পৰা সুকীয়া। সেই সুকীয়া চিহ্নটোত টিপক!',
      bn: 'চিহ্নগুলির মধ্যে যেটি আলাদা, সেটিতে আলতো চাপ দিন।',
      mni: 'খোঙথাংশিংগী মনুংদগী তোঙানবা অমদু খল্লীয়ু।',
      lus: 'A hrang bik pakhat kha thlang rawh le.',
      kha: 'Jied ia kaba pher na kiwei.',
      hi: 'चिह्नों को देखें और उस एक पर टैप करें जो बाकी से अलग है।'
    }
  },
  {
    id: 'game_familiar_sounds',
    title: 'Familiar Sound & Audio Recognition',
    category: 'SOUND_RECOGNITION',
    description: 'Listen to comforting regional and household sounds and identify what produced them.',
    targetSkill: 'Auditory Gnosia, Acoustic Memory & Sensory Focus',
    culturalTheme: 'Bihu Dhol Drum, Rain on Assam Tin Roof, Boiling Tea Kettle, Kaziranga Birdsong, Temple Bell',
    iconName: 'Volume2',
    estimatedMinutes: 3,
    minDifficulty: 'easy',
    maxDifficulty: 'medium',
    instructions: {
      en: 'Tap the speaker to hear the sound, then tap the picture that matches the sound.',
      as: 'শব্দটো শুনিবলৈ স্পীকাৰত টিপক, তাৰ পিছত সেই শব্দটো কিহৰ হয় বাছি লওক।',
      bn: 'শব্দটি শুনতে স্পিকারে ট্যাপ করুন, তারপর সঠিক ছবিটি বেছে নিন।',
      mni: 'খোন্থাং তাবগীদমক স্পিকারদা নম্বীয়ু, অমসুং চুনবা ফোতোদু খল্লীয়ু।',
      lus: 'A ri ngaithla turin speaker hmet la, a ri chhuahna dik thlang rawh.',
      kha: 'Khyllie ia u speaker ban sngap ia ka jingriew, nangta jied ia ka dur kaba dei.',
      hi: 'आवाज सुनने के लिए स्पीकर दबाएं, फिर उस वस्तु का चित्र चुनें।'
    }
  }
];

export function getGameById(id?: string): CognitiveGame {
  if (!id) return COGNITIVE_GAMES[0];
  const found = COGNITIVE_GAMES.find((g) => g.id === id);
  return found || COGNITIVE_GAMES[0];
}
