const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nftController');

router.post('/mint', nftController.mintNFT);
router.get('/user/:userId', nftController.getUserNFTs);
router.put('/:id/upgrade', nftController.upgradeNFT);

module.exports = router;