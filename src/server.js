const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // from node.js
const socketio = require('socket.io');
const http = require('http'); // from node.js
const routes = require('./routes');
const app = express();
const server = http.Server(app); // Extracting 'http server' from express.
const io = socketio(server); // For now on 'server' listen to the websocket.

// Connect the application with the database.
mongoose.connect('mongodb+srv://findyourspot:findyourspot@cluster0-oceem.mongodb.net/findyourspot?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};
// 'io' is used to register all the user logged in the application.
io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
  // Now, all the routes in this application have connection with 'io' which send and receives msg from the frontend and also to the connected users.
});

app.use((req, res, next) => {
  req.io = io; // send or receive from the frontend.
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors()); // Allow any application to access the api.
app.use(express.json()); // Tell to express to use json.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); // Send the IMG t the frontend
app.use(routes); // Always after 'express.json'.
server.listen(3333);

// Express = Node framework.

// Insomnia = Tool to test API.
// req.query = Access query params (filter)
// req.params = Access route params (edit, delete...)
// req.body = Access the body of the request (create, edit...)

// Mongoose = Library that facilitates the work in the MongoDB.
