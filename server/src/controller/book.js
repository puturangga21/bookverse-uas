import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await prisma.book.findMany();

  res.send(products);
});

router.get('/:id', async (req, res) => {
  const reqId = req.params.id;

  try {
    const product = await prisma.book.findUnique({
      where: {
        id: reqId,
      },
    });

    res.send({
      message: 'Data berhasil ditemukan',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal ditemukan',
      data: error,
    });
  }
});

router.post('/', async (req, res) => {
  const reqBody = req.body;

  try {
    const product = await prisma.book.create({
      data: {
        authorName: reqBody.authorName,
        imgUrl: reqBody.imgUrl,
        category: reqBody.category,
        bookDescription: reqBody.bookDescription,
        bookTitle: reqBody.bookTitle,
        bookPdfUrl: reqBody.bookPdfUrl,
      },
    });

    res.send({
      message: 'Data berhasil ditambahkan',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal ditambahkan',
      data: error,
    });
  }
});

router.patch('/:id', async (req, res) => {
  const reqId = req.params.id;
  const reqBody = req.body;

  try {
    const product = await prisma.book.update({
      where: {
        id: reqId,
      },
      data: {
        authorName: reqBody.authorName,
        imgUrl: reqBody.imgUrl,
        category: reqBody.category,
        bookDescription: reqBody.bookDescription,
        bookTitle: reqBody.bookTitle,
        bookPdfUrl: reqBody.bookPdfUrl,
      },
    });

    res.send({
      message: 'Data berhasil diedit',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal diedit',
      data: error,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const reqId = req.params.id;

  try {
    const product = await prisma.book.delete({
      where: {
        id: reqId,
      },
    });

    res.send({
      message: 'Data berhasil dihapus',
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Data gagal dihapus',
      data: error,
    });
  }
});

export default router;
