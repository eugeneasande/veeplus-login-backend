const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Define login credentials with roles
const credentials = [
  {
    username: 'admin',
    password: 'Admin@12345',
    role: 'admin'
  },
  {
    username: 'purity',
    password: 'Purity@12345',
    role: 'user'
  }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = credentials.find(
    cred => cred.username === username && cred.password === password
  );

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('✅ VEE-PLUS Login API is live');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
