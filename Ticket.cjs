// Ticket.cjs

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  route: { type: String, required: true },
  busName: { type: String, required: true },
  seatNumber: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
