const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  services: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

  // Send the IMG t the frontend
}, {
  toJSON: {
    virtuals: true,
  },
});

// Send the IMG t the frontend
SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);
