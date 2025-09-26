const express = require('express');
const router = express.Router();
const { getRecurring, addRecurring, applyRecurring, applySingleRecurring, deleteRecurring  } = require('../controllers/recurringController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRecurring).post(protect, addRecurring);
router.post('/apply', protect, applyRecurring);
router.post('/apply/:id', protect, applySingleRecurring);
router.route('/:id').delete(protect, deleteRecurring);

module.exports = router;