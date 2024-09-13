const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quest', QuestSchema);