const axios = require('axios');
const config = require('../config/default.json');

const dscvrApi = axios.create({
    baseURL: config.dscvrApiUrl,
    headers: {
        'Authorization': `Bearer ${config.dscvrApiKey}`,
    },
});

exports.getUserInfo = async (userId) => {
    try {
        const response = await dscvrApi.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user info from DSCVR:', error);
        throw error;
    }
};
