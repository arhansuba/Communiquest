const Proposal = require('../models/Proposal');
const solanaHelpers = require('../utils/solanaHelpers');

exports.createProposal = async (req, res) => {
    try {
        const newProposal = new Proposal(req.body);
        await newProposal.save();
        res.status(201).json(newProposal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.voteOnProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const { vote, userPublicKey } = req.body;
        
        // Implement voting logic using Solana program
        const result = await solanaHelpers.castVote(id, vote, userPublicKey);
        
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
