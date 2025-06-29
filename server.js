const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable or fallback to a hardcoded key
const SECRET_KEY = process.env.SECRET_KEY || '9d557a59939a3e0731a7b87029d5f5df';

// Dummy login credentials (replace with DB in production)
const credentials = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'purity', password: 'purity123', role: 'user' }
];

// 🔐 LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = credentials.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ success: true, token, role: user.role });
});

// 🔒 PROTECTED TEST ROUTE (optional)
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    res.json({ message: `Welcome ${decoded.username}`, role: decoded.role });
  });
});

// 🟢 Health check
app.get('/', (req, res) => {
  res.send('✅ VEE-PLUS Login API is live');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
