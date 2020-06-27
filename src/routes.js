const express = require('express');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const DeclineController = require('./controllers/DeclineController');
const multer = require('multer'); // To use 'multipart form'
const uploadConfig = require('./config/upload'); // set by Multer
const upload = multer(uploadConfig); // set by Multer
const routes = express.Router();

routes.post('/sessions', SessionController.store);
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/declines', DeclineController.store);

module.exports = routes;
