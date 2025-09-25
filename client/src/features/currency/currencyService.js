import axios from 'axios';
const API_URL = '/api/currency/rates';

const getRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const currencyService = { getRates };
export default currencyService;