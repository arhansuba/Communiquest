const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    publicKey: { type: String, required: true, unique: true },
    nfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
    completedQuests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
});

module.exports = mongoose.model('User', UserSchema);