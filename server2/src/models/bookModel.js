const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
  },
  bookPdfUrl: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
