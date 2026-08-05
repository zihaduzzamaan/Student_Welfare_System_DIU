/* ============================================
   Acadex Backend Server (Express + MySQL / XAMPP)
   ============================================ */

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ── MySQL Connection Pool Config ── */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'acadex_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* ── Format MySQL DB User row to Frontend camelCase ── */
function formatUserFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    fullName: row.full_name || row.fullName || 'Student User',
    email: row.email,
    studentId: row.student_id || row.studentId || null,
    role: row.role || 'student',
    department: row.department || 'SWE',
    batch: row.batch || null,
    semester: row.semester || null,
    contactNumber: row.contact_number || row.contactNumber || null,
    alternateEmail: row.alternate_email || row.alternateEmail || null,
    bloodGroup: row.blood_group || row.bloodGroup || null,
    address: row.address || null,
    bio: row.bio || null,
    avatarUrl: row.avatar_url || row.avatarUrl || null,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
  };
}

/* ── Health Check ── */
app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ status: 'ok', mysql: 'connected', result: rows });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/* ── Auth: Login ── */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email.trim()]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, error: 'No user account found with this email.' });
    }

    res.json({ success: true, user: formatUserFromDb(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database login error: ' + err.message });
  }
});

/* ── Auth: Register ── */
app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, studentId, password, role = 'student' } = req.body;

  if (!fullName || !email || !studentId) {
    return res.status(400).json({ success: false, error: 'Full Name, Email, and Student ID are required.' });
  }

  /* DIU Email Domain Enforcement */
  if (!email.toLowerCase().endsWith('@diu.edu.bd') && !email.toLowerCase().endsWith('@daffodilvarsity.edu.bd')) {
    return res.status(400).json({ success: false, error: 'Student registration requires an official DIU email (@diu.edu.bd).' });
  }

  try {
    const id = `usr-${Date.now()}`;
    await pool.query(
      `INSERT INTO users (id, full_name, email, student_id, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
      [id, fullName.trim(), email.trim().toLowerCase(), studentId.trim(), role]
    );

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json({ success: true, user: formatUserFromDb(rows[0]) });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: 'Account with this email or Student ID already exists.' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── Profile: Update User Profile ── */
app.put('/api/users/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { contactNumber, alternateEmail, bloodGroup, address, bio, avatarUrl, semester } = req.body;

  try {
    await pool.query(
      `UPDATE users SET 
        contact_number = COALESCE(?, contact_number),
        alternate_email = COALESCE(?, alternate_email),
        blood_group = COALESCE(?, blood_group),
        address = COALESCE(?, address),
        bio = COALESCE(?, bio),
        avatar_url = COALESCE(?, avatar_url),
        semester = COALESCE(?, semester),
        updated_at = NOW()
       WHERE id = ?`,
      [contactNumber, alternateEmail, bloodGroup, address, bio, avatarUrl, semester, id]
    );

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json({ success: true, user: formatUserFromDb(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── Tickets: Create Ticket ── */
app.post('/api/tickets', async (req, res) => {
  const { userId, guestName, guestEmail, category = 'general', subject, description, priority = 'medium' } = req.body;
  
  if (!subject || !description) {
    return res.status(400).json({ success: false, error: 'Subject and description are required.' });
  }

  const id = `tkt-${Date.now()}`;
  const ticketCode = `HD-${Math.floor(1000 + Math.random() * 9000)}`;
  const accessPin = `${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    await pool.query(
      `INSERT INTO help_tickets (id, ticket_code, access_pin, user_id, guest_name, guest_email, category, subject, description, priority, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [id, ticketCode, accessPin, userId || null, guestName || null, guestEmail || null, category, subject, description, priority]
    );

    res.json({
      success: true,
      ticket: { id, ticketCode, accessPin, category, subject, description, priority, status: 'open' }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── Tickets: Guest Lookup by Ticket Code & PIN ── */
app.post('/api/tickets/lookup', async (req, res) => {
  const { ticketCode, accessPin } = req.body;
  if (!ticketCode || !accessPin) {
    return res.status(400).json({ success: false, error: 'Ticket Code and Access PIN are required.' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM help_tickets WHERE UPPER(ticket_code) = UPPER(?) AND access_pin = ?',
      [ticketCode.trim(), accessPin.trim()]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, error: 'No ticket found matching this Code and Access PIN.' });
    }

    res.json({ success: true, ticket: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Acadex Backend API running at http://localhost:${PORT}`);
});
