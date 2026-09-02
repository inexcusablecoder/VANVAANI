-- VANVAANI Master PostgreSQL Database Schema (SIH26042)
-- Organization: Govt. of Jharkhand — Department of Education / PALASH MTB-MLE

-- 1. TEACHERS TABLE
CREATE TABLE IF NOT EXISTS teachers (
    id VARCHAR(64) PRIMARY KEY,
    dise_code VARCHAR(32) NOT NULL,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    school_name VARCHAR(256),
    district VARCHAR(128) DEFAULT 'Ranchi',
    primary_language VARCHAR(32) DEFAULT 'hi',
    target_language VARCHAR(32) DEFAULT 'sat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. LANGUAGE PACKS TABLE
CREATE TABLE IF NOT EXISTS language_packs (
    id VARCHAR(32) PRIMARY KEY, -- e.g. sat_OLCK, mun_DEVA, ho_WCRT
    lang_code VARCHAR(16) NOT NULL,
    lang_name VARCHAR(64) NOT NULL,
    script_name VARCHAR(64) NOT NULL,
    version VARCHAR(32) NOT NULL,
    phrase_count INTEGER DEFAULT 0,
    size_bytes BIGINT DEFAULT 0,
    download_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. MASTER FLN PHRASE BANK (TRANSLATIONS)
CREATE TABLE IF NOT EXISTS fln_phrases (
    id SERIAL PRIMARY KEY,
    hindi_text TEXT NOT NULL,
    target_text TEXT NOT NULL,
    lang_code VARCHAR(16) NOT NULL, -- sat, mun, hoc
    script_name VARCHAR(64),
    category VARCHAR(64) DEFAULT 'General FLN',
    grade_level VARCHAR(32) DEFAULT 'Grade 1',
    confidence_score NUMERIC(3, 2) DEFAULT 0.95,
    audio_sample_url VARCHAR(512),
    validated_by_linguist BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. LESSON PLANS TABLE
CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(64) PRIMARY KEY,
    teacher_id VARCHAR(64) REFERENCES teachers(id) ON DELETE SET NULL,
    grade_level VARCHAR(32) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    topic VARCHAR(256) NOT NULL,
    lang_code VARCHAR(16) NOT NULL,
    content_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TEACHER FEEDBACK & CORRECTIONS TABLE
CREATE TABLE IF NOT EXISTS teacher_feedback (
    id VARCHAR(64) PRIMARY KEY,
    teacher_id VARCHAR(64) REFERENCES teachers(id) ON DELETE SET NULL,
    phrase_id INTEGER REFERENCES fln_phrases(id) ON DELETE SET NULL,
    hindi_original TEXT NOT NULL,
    corrected_target_text TEXT NOT NULL,
    lang_code VARCHAR(16) NOT NULL,
    status VARCHAR(32) DEFAULT 'PENDING_LINGUIST_REVIEW', -- PENDING_LINGUIST_REVIEW, APPROVED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. SYNC LOGS TABLE
CREATE TABLE IF NOT EXISTS sync_logs (
    id VARCHAR(64) PRIMARY KEY,
    teacher_id VARCHAR(64) REFERENCES teachers(id) ON DELETE SET NULL,
    sync_action VARCHAR(64) NOT NULL,
    payload_json JSONB NOT NULL,
    records_processed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED INITIAL LANGUAGE PACK METADATA
INSERT INTO language_packs (id, lang_code, lang_name, script_name, version, phrase_count, size_bytes, download_url)
VALUES 
('sat_OLCK', 'sat', 'Santhali', 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)', '1.0.4', 2850, 47185920, '/api/v1/languages/packs/sat_OLCK/download'),
('mun_DEVA', 'mun', 'Mundari', 'Devanagari / Warang Citi', '1.0.1', 1600, 31457280, '/api/v1/languages/packs/mun_DEVA/download'),
('ho_WCRT', 'hoc', 'Ho', 'Warang Citi (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)', '1.0.0', 1400, 26214400, '/api/v1/languages/packs/ho_WCRT/download')
ON CONFLICT (id) DO NOTHING;
