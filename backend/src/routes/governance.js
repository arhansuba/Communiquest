const express = require('express');
const router = express.Router();
const governanceController = require('../controllers/governanceController');

router.post('/proposals', governanceController.createProposal);
router.get('/proposals', governanceController.getAllProposals);
router.get('/proposals/:id', governanceController.getProposalById);
router.post('/proposals/:id/vote', governanceController.voteOnProposal);
router.put('/proposals/:id/finalize', governanceController.finalizeProposal);

module.exports = router;