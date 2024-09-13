const Quest = require('../models/Quest');
const dscvrApi = require('../services/dscvrApi');

exports.createQuest = async (req, res) => {
    try {
        const newQuest = new Quest(req.body);
        await newQuest.save();
        res.status(201).json(newQuest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllQuests = async (req, res) => {
    try {
        const quests = await Quest.find();
        res.json(quests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
