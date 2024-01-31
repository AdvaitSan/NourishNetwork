// models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  qty: Number,
  loc: String,
  expired: { type: Boolean, default: false },
  img: String, // Adding date field
});
  

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
