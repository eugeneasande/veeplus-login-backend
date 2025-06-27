const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [
  { username: 'purity', password: 'Purity@12345' },
  { username: 'admin', password: 'Admin@12345' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/', (req, res) => {
  res.send('VEE-PLUS Login API is live');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
