const express = require('express');
const Book = require('../models/bookModel');

const router = express.Router();

// get data
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

// get by id
router.get('/:id', async (req, res) => {
  try {
    const reqId = req.params.id;
    const product = await Book.findById(reqId);

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

// post data
router.post('/', async (req, res) => {
  try {
    const reqBody = req.body;

    const product = await Book.create(reqBody);

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

// edit data
router.put('/:id', async (req, res) => {
  try {
    const reqId = req.params.id;
    const reqBody = req.body;

    const product = await Book.findByIdAndUpdate(reqId, reqBody, { new: true });

    res.status(200).json({
      message: 'Data berhasil diedit',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal diedit',
      error: error,
    });
  }
});

// delete data
router.delete('/:id', async (req, res) => {
  try {
    const reqId = req.params.id;
    const reqBody = req.body;

    const product = await Book.findByIdAndDelete(reqId, reqBody, { new: true });

    res.status(200).json({
      message: 'Data berhasil dihapaus',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal diedit',
      error: error,
    });
  }
});

module.exports = router;
