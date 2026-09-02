// Language & FLN Domain Definitions for VANVAANI (SIH26042)

export const SUPPORTED_LANGUAGES = [
  {
    id: 'sat',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    isoCode: 'sat',
    speakerCount: '7.3+ Million',
    resourceLevel: 'High Baseline (Ol Chiki Digital Corpus)',
    status: 'Primary Available Target',
    badgeColor: '#10B981'
  },
  {
    id: 'mun',
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱨᱤ / मुंडारी',
    script: 'Devanagari / Warang Citi',
    isoCode: 'mun',
    speakerCount: '1.6+ Million',
    resourceLevel: 'Medium Baseline',
    status: 'Phase 2 Language Pack',
    badgeColor: '#F59E0B'
  },
  {
    id: 'ho',
    name: 'Ho',
    nativeName: 'ᱦᱚ / हो',
    script: 'Warang Citi (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)',
    isoCode: 'hoc',
    speakerCount: '1.4+ Million',
    resourceLevel: 'Low Resource Baseline',
    status: 'Phase 3 Language Pack',
    badgeColor: '#EC4899'
  }
];

export const FLN_SUBJECTS = [
  { id: 'math', name: 'Foundational Mathematics', icon: 'Calculator', description: 'Numbers 1-100, counting, basic addition & spatial concepts' },
  { id: 'lang', name: 'Foundational Language & Literacy', icon: 'BookOpen', description: 'Phonemes, letter identification, classroom directions & storytelling' },
  { id: 'evs', name: 'Environmental Studies (EVS)', icon: 'Sun', description: 'Animals, body parts, family, seasonal nature & local surroundings' }
];

export const MOCK_FLN_DICTIONARY = [
  {
    id: 1,
    hindi: 'बच्चों, आज हम 1 से 10 तक की संख्याएँ सीखेंगे।',
    santhali: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱟ᱾',
    mundari: 'होन को, तिङि आबु 1 ऐते 10 धरि सेड़ाएया।',
    ho: 'होन् को, तेसिं आबु 1 एते 10 धरि सेड़ाएया।',
    category: 'Mathematics',
    grade: 'Grade 1',
    confidence: '98%',
    audioSample: 'math_nums_1_10.wav'
  },
  {
    id: 2,
    hindi: 'अपनी किताब निकालिए और पृष्ठ संख्या 5 खोलिए।',
    santhali: 'ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱚᱰᱚᱠ ᱯᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱕ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
    mundari: 'आपना पुथी ओंडोक पे और पृष्ठ 5 खोल पे।',
    ho: 'आपना पुथी ओंडोक पे ओड़ोः पृष्ठ 5 खोल पे।',
    category: 'Classroom Instruction',
    grade: 'Grade 1-3',
    confidence: '95%',
    audioSample: 'instr_open_book.wav'
  },
  {
    id: 3,
    hindi: 'पानी स्वच्छ रखना चाहिए।',
    santhali: 'ᱫᱟᱜ ᱫᱚ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱪᱟᱹᱦᱤᱛᱟ᱾',
    mundari: 'दाः दो साफ राखब चाहिए।',
    ho: 'दाः दो साफ राखब चाहिए।',
    category: 'EVS',
    grade: 'Grade 2',
    confidence: '96%',
    audioSample: 'evs_clean_water.wav'
  }
];
