import axios from 'axios';

// @desc    Get latest currency exchange rates
// @route   GET /api/currency/rates
// @access  Public
const getRates = async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exchange rates' });
  }
};

export { getRates };