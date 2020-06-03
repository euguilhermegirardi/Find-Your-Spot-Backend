const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params; // Come from the routes.
    const { date }= req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    // Get all the info from the user and from the spot in the request.
    await booking.populate('spot').populate('user').execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if(ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking);
    };

    return res.json(booking);
  }
};


