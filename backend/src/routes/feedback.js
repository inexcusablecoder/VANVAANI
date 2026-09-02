// Teacher Translation Feedback & Correction Routes
const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/db');

// POST /api/v1/feedback
router.post('/', (req, res) => {
  const { originalText, correctedText, targetLang = 'sat', teacherId = 'TCH-1001' } = req.body;

  if (!originalText || !correctedText) {
    return res.status(400).json({ success: false, error: 'originalText and correctedText are required.' });
  }

  const feedbackEntry = {
    id: 'FB-' + Date.now(),
    teacher_id: teacherId,
    hindi_original: originalText.trim(),
    corrected_target_text: correctedText.trim(),
    lang_code: targetLang,
    status: 'PENDING_LINGUIST_REVIEW',
    submitted_at: new Date().toISOString()
  };

  inMemoryDB.feedback.unshift(feedbackEntry);

  res.status(201).json({
    success: true,
    message: 'Teacher translation correction recorded successfully. Queued for PALASH state linguist review.',
    feedback: feedbackEntry
  });
});

// GET /api/v1/feedback
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: inMemoryDB.feedback.length,
    feedback: inMemoryDB.feedback
  });
});

module.exports = router;
