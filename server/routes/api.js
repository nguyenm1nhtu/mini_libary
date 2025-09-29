const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const authController = require('../controllers/auth.controller');
const CategoryController = require('../controllers/category.controller');
const BookController = require('../controllers/book.controller');
const BorrowController = require('../controllers/borrow.controller');
const LogController = require('../controllers/log.controller');
const FavouriteController = require('../controllers/favourite.controller');

// Router cho dang ky, dang nhap, dang xuat
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// danh muc
router.post('/categories', CategoryController.create);
router.get('/categories', CategoryController.get);
router.put('/categories', CategoryController.update);
router.delete('/categories', CategoryController.delete);

// sach
router.post('/books', upload.single('image'), BookController.create);
router.get('/books', BookController.get);
router.put('/books', upload.single('image'), BookController.update);
router.delete('/books', BookController.delete);

// cho muon va tra sach
router.post('/borrow', BorrowController.borrow);
router.post('/borrow/return', BorrowController.returnBook);

// Log
router.get('/logs', LogController.getAll);

// Yeu thich
router.post('/favourites', FavouriteController.add);
router.post('/favourites/remove', FavouriteController.delete);

module.exports = router;
