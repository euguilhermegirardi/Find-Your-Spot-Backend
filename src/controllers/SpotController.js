const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async index(req, res) {
    const { service } = req.query;
    const spots = await Spot.find({ services: service });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, price, services  } = req.body;
    const { user_id } = req.headers;

    // Check if the user exists.
    const user = await User.findById(user_id);
    if(!user) {
      return res.status(400).json({ error: 'User not found!' })
    };

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      services: services.split(',').map(service => service.trim())
    });

    return res.json(spot);
  }
};
