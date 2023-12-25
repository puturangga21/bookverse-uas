-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bookDescription" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "bookPdfUrl" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
