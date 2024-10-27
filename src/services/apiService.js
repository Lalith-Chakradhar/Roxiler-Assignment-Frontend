import axios from 'axios';

const API_BASE_URL = 'https://transactiondetails-backend.onrender.com/api';

export const fetchTransactionsCombinedData = async (month, search, page = 1, perPage = 10) => {
    const response = await axios.get(`${API_BASE_URL}/combined-data`, {
        params: { month, search, page, perPage }
    });
    return response.data;
};


 