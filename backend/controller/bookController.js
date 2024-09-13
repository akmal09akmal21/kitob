const bookModel = require("../model/bookModel");
const mongoose = require("mongoose");
const addBook = async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const existbook = await bookModel.findOne({ title });
    if (existbook) {
      return res
        .status(401)
        .json({ success: false, message: "Bu kitob tizimda mavjud" });
    }
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: "Invalid category ID." });
    }
    const newBook = await bookModel.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "kitob qo'shildi", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "addBook apidan xatolik",
      error: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookModel
      .find()
      .populate("author")
      .populate("category");
    if (!books) {
      return res
        .status(404)
        .json({ success: false, message: "kitoblar mavjud emas" });
    }
    res.status(200).json({
      success: true,
      message: "kitoblar success",
      Kitoblas_SONI: books.length,
      books,
    });
  } catch (error) {}
};

const singleBook = async (req, res) => {
  try {
    const singleID = req.params.id;
    const oneBook = await bookModel
      .findById(singleID)
      .populate("author")
      .populate("category");
    res
      .status(200)
      .json({ success: true, message: "one book success", oneBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "singleBokk api dan xatolik",
      error: error.mesage,
    });
  }
};

const updateBook = async (req, res) => {
  const ID = req.params.id;
  const updateBook = await bookModel.findById(ID);

  if (!updateBook) {
    return res
      .status(401)
      .json({ success: false, message: "bu id da category topilmadi" });
  }
  const newUpBook = await bookModel
    .findByIdAndUpdate(updateBook, req.body, {
      new: true,
    })
    .populate("author")
    .populate("category");
  res
    .status(200)
    .json({ success: true, message: "kitob o'zgartirildi", newUpBook });
};

const deletBook = async (req, res) => {
  try {
    const ID = req.params.id;
    const deletB = await bookModel.findById(ID);
    if (!deletB) {
      return res
        .status(404)
        .json({ success: false, message: "bu id dagi kitob topilmadi" });
    }
    await bookModel.findByIdAndDelete(deletB);
    res.status(200).json({ success: true, message: "kitob o'chiril" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "deletbook apidan error",
      error: error.message,
    });
  }
};
const searchBook = async (req, res) => {
  try {
    let dataB = await bookModel.find({
      $or: [
        { title: { $regex: req.params.key } },
        { summary: { $regex: req.params.key } },
        { name: { $regex: req.params.key } },
      ],
    });
    res.send(dataB);
  } catch (error) {
    console.log(error);
  }
};

const getBooksByCategory = async (req, res) => {
  try {
    const booksCategory = await bookModel
      .find({ category: req.params.categoryId })
      .populate("category");
    res
      .status(200)
      .json({ success: true, message: "category success", booksCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getBooksByAuthors = async (req, res) => {
  try {
    const booksAuthors = await bookModel
      .find({ author: req.params.authorId })
      .populate("author");
    res
      .status(200)
      .json({ success: true, message: "author success", booksAuthors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  singleBook,
  updateBook,
  deletBook,
  searchBook,
  getBooksByCategory,
  getBooksByAuthors,
};
