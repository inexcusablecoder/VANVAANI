// Teacher Authentication & Registration Routes
const express = require('express');
const router = express.Router();
const { generateToken } = require('../middleware/auth');
const { inMemoryDB } = require('../config/db');

// POST /api/v1/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const teacher = inMemoryDB.teachers.find(t => t.email.toLowerCase() === email.toLowerCase());

  if (!teacher) {
    // Auto-create teacher for hackathon demo compatibility
    const newTeacher = {
      id: 'TCH-' + Date.now().toString().slice(-4),
      dise_code: '20010508102',
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      school_name: 'Government Primary School, Kanke',
      district: 'Ranchi',
      primary_language: 'hi',
      target_language: 'sat'
    };
    inMemoryDB.teachers.push(newTeacher);

    const token = generateToken({ id: newTeacher.id, email: newTeacher.email, role: 'TEACHER' });
    return res.json({
      success: true,
      message: 'Teacher authenticated successfully.',
      token,
      teacher: newTeacher
    });
  }

  const token = generateToken({ id: teacher.id, email: teacher.email, role: 'TEACHER' });
  return res.json({
    success: true,
    message: 'Teacher logged in successfully.',
    token,
    teacher
  });
});

// POST /api/v1/auth/register
router.post('/register', (req, res) => {
  const { name, email, dise_code, school_name, primary_language, target_language } = req.body;

  if (!name || !email || !dise_code) {
    return res.status(400).json({ success: false, error: 'Name, email, and school DISE code are required.' });
  }

  const newTeacher = {
    id: 'TCH-' + Date.now().toString().slice(-4),
    dise_code: dise_code || '20010508102',
    name,
    email,
    school_name: school_name || 'Government Primary School, Ranchi',
    district: 'Ranchi',
    primary_language: primary_language || 'hi',
    target_language: target_language || 'sat'
  };

  inMemoryDB.teachers.push(newTeacher);
  const token = generateToken({ id: newTeacher.id, email: newTeacher.email, role: 'TEACHER' });

  res.status(201).json({
    success: true,
    message: 'Teacher account registered successfully under PALASH MTB-MLE.',
    token,
    teacher: newTeacher
  });
});

module.exports = router;
