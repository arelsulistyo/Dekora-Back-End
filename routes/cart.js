const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cartController.addItemToCart);
router.get('/:userId', authMiddleware, cartController.getCartItems);

module.exports = router;