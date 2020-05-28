const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body; // const email = req.body.email;

    // Check if there is the same email registered, if not, create.
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
// controller receives the request, work on it and send an answer

// index return a list of sessions.
// show list only 1 session.
// store creates a session.
// update updates a session.
// destroy removes a session.
