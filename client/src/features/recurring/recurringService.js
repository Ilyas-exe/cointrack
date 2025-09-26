import axios from 'axios';
const API_URL = '/api/recurring/';

const getRecurring = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addRecurring = async (data, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

const applyRecurring = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL + 'apply', {}, config);
  return response.data;
};

const applySingleRecurring = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL + 'apply/' + id, {}, config);
  return response.data;
};

const recurringService = { getRecurring, addRecurring, applyRecurring, applySingleRecurring };
export default recurringService;