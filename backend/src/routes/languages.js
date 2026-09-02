// Language Pack Management Routes
const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/db');

// GET /api/v1/languages/packs
router.get('/packs', (req, res) => {
  res.json({
    success: true,
    count: inMemoryDB.language_packs.length,
    packs: inMemoryDB.language_packs
  });
});

// GET /api/v1/languages/packs/:packId
router.get('/packs/:packId', (req, res) => {
  const { packId } = req.params;
  const pack = inMemoryDB.language_packs.find(p => p.id === packId);

  if (!pack) {
    return res.status(404).json({ success: false, error: `Language pack '${packId}' not found.` });
  }

  res.json({
    success: true,
    pack
  });
});

// GET /api/v1/languages/packs/:packId/download
router.get('/packs/:packId/download', (req, res) => {
  const { packId } = req.params;
  const pack = inMemoryDB.language_packs.find(p => p.id === packId);

  if (!pack) {
    return res.status(404).json({ success: false, error: `Language pack '${packId}' not found.` });
  }

  res.json({
    success: true,
    message: `Language pack '${pack.lang_name}' (${pack.script_name}) ready for offline sync download.`,
    manifest: {
      packId: pack.id,
      langCode: pack.lang_code,
      version: pack.version,
      phraseCount: pack.phrase_count,
      sizeBytes: pack.size_bytes,
      phrases: inMemoryDB.fln_phrases
    }
  });
});

module.exports = router;
