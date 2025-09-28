const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Router cho dang ky, dang nhap, dang xuat
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
