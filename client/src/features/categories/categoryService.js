import axios from 'axios';
const API_URL = '/api/categories/';

const getCategories = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const addCategory = async (name, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, { name }, config);
    return response.data;
};

// ... you can add a delete service function here later ...

const categoryService = { getCategories, addCategory };
export default categoryService;