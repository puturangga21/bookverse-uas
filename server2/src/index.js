const express = require('express');
const database = require('./db');
const cors = require('cors');

// controller
const bookController = require('./controller/book');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Selamat datang di API BookVerse');
});

app.use('/api/book', bookController);

// connection
database();
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT} ...`);
});
