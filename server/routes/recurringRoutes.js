const express = require('express');
const router = express.Router();
const { getRecurring, addRecurring, applyRecurring, applySingleRecurring  } = require('../controllers/recurringController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRecurring).post(protect, addRecurring);
router.post('/apply', protect, applyRecurring);
router.post('/apply/:id', protect, applySingleRecurring);

module.exports = router;