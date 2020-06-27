// controller receives the request, work on it and send an answer
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

// index return a list of sessions = GET.
// show list only 1 session = GET.
// store creates a session = POST.
// update updates a session = PUT.
// destroy removes a session = DELETE.
