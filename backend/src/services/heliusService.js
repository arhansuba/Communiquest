const axios = require('axios');
const config = require('../config/default.json');

const heliusApi = axios.create({
    baseURL: config.heliusApiUrl,
    headers: {
        'Authorization': `Bearer ${config.heliusApiKey}`,
    },
});

exports.getUserNFTs = async (userPublicKey) => {
    try {
        const response = await heliusApi.get(`/v1/nfts?owner=${userPublicKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user NFTs from Helius:', error);
        throw error;
    }
};