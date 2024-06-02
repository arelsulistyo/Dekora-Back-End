const router = require('express').Router();
const { getFlowers, addFlower } = require('../controllers/flowerController');
const verifyToken = require('../middleware/authMiddleware');

router.route('/').get(getFlowers);
router.route('/add').post(verifyToken, addFlower);

module.exports = router;
