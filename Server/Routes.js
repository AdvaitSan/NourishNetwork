// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const Campaign = require('../Server/models');

// Create a new campaign
router.post('/campaigns', async (req, res) => {
  try {
    const { title, description, qty, loc, img } = req.body;
    const newCampaign = new Campaign({ title, description, qty, loc, img });
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

// Update the expired field in the database for a specific campaign by id
router.put('/campaigns/:id/updateExpired', async (req, res) => {
  const { id } = req.params;
  const { expired } = req.body;

  try {
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { $set: { expired } }, // Set the 'expired' field based on the provided value
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    return res.json({ message: 'Campaign expired status updated', campaign });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
router.get('/campaigns/:loc', async (req, res) => {
  try {
    const { loc } = req.params;
    const campaigns = await Campaign.find({ loc });
    res.json(campaigns);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

router.put('/campaigns/updateExpired/:title', async (req, res) => {
  try {
    const { expired } = req.params;
    await Campaign.findOneAndUpdate({ title, endDate: { $lt: currentDate } }, { $set: { expired: true } });
    res.json({ message: 'Campaign updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
router.get('/campaigns/:loc', async (req, res) => {
  try {
    const { loc } = req.params;
    const campaigns = await Campaign.find({ loc });
    res.json(campaigns);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
