// Batch Sync Manager Routes (Connectivity Recovery & Offline Queue Sync)
const express = require('express');
const router = express.Router();
const { inMemoryDB } = require('../config/db');

// POST /api/v1/sync
router.post('/', (req, res) => {
  const { teacherId = 'TCH-1001', syncQueue = [], deviceMetadata = {} } = req.body;

  if (!Array.isArray(syncQueue)) {
    return res.status(400).json({ success: false, error: 'syncQueue must be an array of queued records.' });
  }

  const processedRecords = [];

  syncQueue.forEach((item) => {
    const record = {
      id: item.id || 'SYNC-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      teacher_id: teacherId,
      hindi_original: item.originalText || item.hindi,
      corrected_target_text: item.correctedText || item.target,
      lang_code: item.targetLang || 'sat',
      status: 'PENDING_LINGUIST_REVIEW',
      received_at: new Date().toISOString()
    };

    inMemoryDB.feedback.push(record);
    processedRecords.push(record.id);
  });

  const syncLog = {
    id: 'LOG-' + Date.now(),
    teacher_id: teacherId,
    sync_action: 'BATCH_OFFLINE_QUEUE_SYNC',
    records_processed: processedRecords.length,
    timestamp: new Date().toISOString()
  };

  inMemoryDB.sync_queue.push(syncLog);

  res.json({
    success: true,
    message: `Batch sync completed successfully. ${processedRecords.length} records processed and queued for PALASH linguist review.`,
    syncLogId: syncLog.id,
    processedRecordIds: processedRecords,
    masterUpdatesAvailable: {
      sat_OLCK: { newVersion: '1.0.5', updatedPhrases: 12 },
      mun_DEVA: { newVersion: '1.0.2', updatedPhrases: 4 },
      ho_WCRT: { newVersion: '1.0.1', updatedPhrases: 2 }
    }
  });
});

module.exports = router;
