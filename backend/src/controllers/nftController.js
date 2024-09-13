const metaplexService = require('../services/metaplexService');
const heliusService = require('../services/heliusService');

exports.mintNFT = async (req, res) => {
    try {
        const { userPublicKey, questId } = req.body;
        const nft = await metaplexService.mintNFT(userPublicKey, questId);
        res.status(201).json(nft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserNFTs = async (req, res) => {
    try {
        const { userId } = req.params;
        const nfts = await heliusService.getUserNFTs(userId);
        res.json(nfts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
