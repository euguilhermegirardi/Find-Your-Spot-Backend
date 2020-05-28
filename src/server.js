const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// Connect the application with the database.
mongoose.connect('mongodb+srv://findyourspot:findyourspot@cluster0-oceem.mongodb.net/findyourspot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // Tell to express to use json.
app.use(routes); // Always after 'express.json'.
app.listen(3333);

// Express = Node framework.

// Insomnia = Tool to test API.
// req.query = Access query params (filter)
// req.params = Access route params (edit, delete...)
// req.body = Access the body of the request (create, edit...)

// Mongoose = Library that facilitates the work in the MongoDB.
