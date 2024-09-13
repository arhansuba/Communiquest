const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    proposer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    yesVotes: { type: Number, default: 0 },
    noVotes: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'approved', 'rejected'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', ProposalSchema);