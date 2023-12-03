// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const Campaign = require('../Server/models');

// Create a new campaign
router.post('/campaigns', async (req, res) => {
  try {
    const { title, description,qty,loc,img } = req.body;
    const newCampaign = new Campaign({ title, description,qty,img });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add routes for updating, deleting, and fetching a single campaign by title

// Update a campaign by title
router.put('/campaigns/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const { description, goal } = req.body;
    const updatedCampaign = await Campaign.findOneAndUpdate({ title }, { description, goal }, { new: true });
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a campaign by title
router.delete('/campaigns/:title', async (req, res) => {
  try {
    const { title } = req.params;
    await Campaign.findOneAndDelete({ title });
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch a single campaign by title
router.get('/campaigns/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const campaign = await Campaign.findOne({ title });
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
