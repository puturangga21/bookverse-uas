const express = require('express');
const Book = require('../models/bookModel');

const router = express.Router();

// get method
router.get('/', async (req, res) => {
  try {
    const product = await Book.find({});

    res.status(200).send({
      message: 'Data berhasil ditemukan',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal ditemukan',
      error: error,
    });
  }
});

// post method
router.post('/', async (req, res) => {
  try {
    const product = await Book.create(req.body);

    res.status(200).send({
      message: 'Data berhasil ditambahkan',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal ditambahkan',
      error: error,
    });
  }
});

module.exports = router;
