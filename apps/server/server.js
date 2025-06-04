const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // middleware to parse JSON

// Sample user data
const users = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
  { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
  { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com' },
  { id: 4, name: 'Patricia Lebsack', email: 'patricia@example.com' },
  { id: 5, name: 'Chelsey Dietrich', email: 'chelsey@example.com' },
  { id: 6, name: 'Dennis Schulist', email: 'dennis@example.com' },
  { id: 7, name: 'Kurtis Weissnat', email: 'kurtis@example.com' },
  { id: 8, name: 'Nicholas Runolfsdottir', email: 'nicholas@example.com' },
  { id: 9, name: 'Glenna Reichert', email: 'glenna@example.com' },
  { id: 10, name: 'Clementina DuBuque', email: 'clementina@example.com' },
  { id: 11, name: 'John Smith', email: 'johnsmith@example.com' },
  { id: 12, name: 'Jane Doe', email: 'janedoe@example.com' },
  { id: 13, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 14, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 15, name: 'Charlie Black', email: 'charlie@example.com' },
  { id: 16, name: 'Diana White', email: 'diana@example.com' },
  { id: 17, name: 'Ethan Green', email: 'ethan@example.com' },
  { id: 18, name: 'Fiona Blue', email: 'fiona@example.com' },
  { id: 19, name: 'George Red', email: 'george@example.com' },
  { id: 20, name: 'Hannah Yellow', email: 'hannah@example.com' },
];


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// GET /users?name=...
app.get('/users', async (req, res) => {
  const { name } = req.query;
  await delay(500)

  if (name) {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filteredUsers);
  }

  res.json(users);
});

// POST /users
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  delay(700)

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1, // simple auto-increment
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
