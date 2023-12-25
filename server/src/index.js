import express from 'express';
import cors from 'cors';

import book from './controller/book.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Selamat datang di API BookVerse');
});

app.use('/api/book', book);

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di port ${PORT}`);
});
