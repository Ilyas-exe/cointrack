import express from 'express';
const router = express.Router();
import { getRates } from '../controllers/currencyController.js';

router.get('/rates', getRates);

export default router;