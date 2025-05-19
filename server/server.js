const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = './users.json';


const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
};


const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};


app.post('/signup', async (req, res) => {
  console.log(JSON.stringify(req.body))
  const { username, email, role, password } = req.body;

  
  if (username.length < 4 || username.length > 10) return res.status(400).send("Username must be 4–10 characters.");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) return res.status(400).send("Invalid email format.");
  if (password.length < 6) return res.status(400).send("Password must be at least 6 characters.");

  const users = readUsers();
  if (users.find((user) => user.email === email)) return res.status(409).send("User already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, role, password: hashedPassword });
  writeUsers(users);
  res.status(201).send("User created successfully.");
});


app.post('/login', async (req, res) => {
  console.log(JSON.stringify(req.body))
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(401).send("Invalid credentials.");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Invalid credentials.");

  res.json({ message: "Login successful", user });
});


app.get('/external-users', async (req, res) => {
  const response = await axios.get('https://reqres.in/api/users?page=1', {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  })
  res.json(response.data);
});


app.post('/add-user', async (req, res) => {
  const { Fname, role, Lname } = req.body;
  const response = await axios.post('https://reqres.in/api/users', {
    "Fname":Fname, "role":role, "Lname":Lname
  },{ headers: {
    'x-api-key': 'reqres-free-v1'
  }});
  res.status(201).json(response.data);
});


app.post('/api/queries', (req, res) => {
  const { name, department, query } = req.body;

  if (!name || !department || !query) {
    return res.status(400).json({ message: "All fields are required." });
  }

  
  const queries = fs.existsSync('queries.json')
    ? JSON.parse(fs.readFileSync('queries.json'))
    : [];

  const newQuery = { id: Date.now(), name, department, query };
  queries.push(newQuery);
  fs.writeFileSync('queries.json', JSON.stringify(queries, null, 2));

  res.status(201).json({ message: 'Query submitted successfully', query: newQuery });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));