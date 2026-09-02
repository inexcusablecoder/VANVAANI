// Database configuration & PostgreSQL connection pool manager
// Includes in-memory database fallback for local dev/demo without requiring an active PostgreSQL instance.

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let isConnected = false;

// Seed data for in-memory fallback
const inMemoryDB = {
  teachers: [
    {
      id: 'TCH-1001',
      dise_code: '20010508102',
      name: 'Ramesh Kumar Sharma',
      email: 'ramesh.sharma@jharkhand.edu.in',
      password_hash: 'hashed_pass_123',
      school_name: 'Government Primary School, Kanke',
      district: 'Ranchi',
      primary_language: 'hi',
      target_language: 'sat'
    }
  ],
  language_packs: [
    {
      id: 'sat_OLCK',
      lang_code: 'sat',
      lang_name: 'Santhali',
      script_name: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
      version: '1.0.4',
      phrase_count: 2850,
      size_bytes: 47185920,
      download_url: '/api/v1/languages/packs/sat_OLCK/download'
    },
    {
      id: 'mun_DEVA',
      lang_code: 'mun',
      lang_name: 'Mundari',
      script_name: 'Devanagari / Warang Citi',
      version: '1.0.1',
      phrase_count: 1600,
      size_bytes: 31457280,
      download_url: '/api/v1/languages/packs/mun_DEVA/download'
    },
    {
      id: 'ho_WCRT',
      lang_code: 'hoc',
      lang_name: 'Ho',
      script_name: 'Warang Citi (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)',
      version: '1.0.0',
      phrase_count: 1400,
      size_bytes: 26214400,
      download_url: '/api/v1/languages/packs/ho_WCRT/download'
    }
  ],
  fln_phrases: [
    {
      id: 1,
      hindi_text: 'बच्चों, आज हम 1 से 10 तक की संख्याएँ सीखेंगे।',
      santhali: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱟ᱾',
      mundari: 'होन को, तिङि आबु 1 ऐते 10 धरि सेड़ाएया।',
      ho: 'होन् को, तेसिं आबु 1 एते 10 धरि सेड़ाएया।',
      category: 'Mathematics',
      grade_level: 'Grade 1',
      confidence_score: 0.98
    },
    {
      id: 2,
      hindi_text: 'अपनी किताब निकालिए और पृष्ठ संख्या 5 खोलिए।',
      santhali: 'ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱚᱰᱚᱠ ᱯᱮ ᱟᱨ ᱥᱟᱠᱟᱢ ᱕ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
      mundari: 'आपना पुथी ओंडोक पे और पृष्ठ 5 खोल पे।',
      ho: 'आपना पुथी ओंडोक पे ओड़ोः पृष्ठ 5 खोल पे।',
      category: 'Classroom Instruction',
      grade_level: 'Grade 1-3',
      confidence_score: 0.95
    },
    {
      id: 3,
      hindi_text: 'पानी स्वच्छ रखना चाहिए।',
      santhali: 'ᱫᱟᱜ ᱫᱚ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱪᱟᱹᱦᱤᱛᱟ᱾',
      mundari: 'दाः दो साफ राखब चाहिए।',
      ho: 'दाः दो साफ राखब चाहिए।',
      category: 'EVS',
      grade_level: 'Grade 2',
      confidence_score: 0.96
    }
  ],
  feedback: [],
  sync_queue: []
};

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    pool.on('connect', () => {
      isConnected = true;
      console.log('Connected to PostgreSQL Database.');
    });

    pool.on('error', (err) => {
      console.error('PostgreSQL Pool Error:', err.message);
      isConnected = false;
    });
  } catch (e) {
    console.log('Using in-memory database mode.');
  }
}

module.exports = {
  query: async (text, params) => {
    if (pool && isConnected) {
      return pool.query(text, params);
    }
    // Return empty result or handle queries via fallback memory store
    return { rows: [], rowCount: 0 };
  },
  inMemoryDB,
  isPostgresConnected: () => isConnected
};
