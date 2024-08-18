const mongoose = require('mongoose');

const addBusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capicity: {
    type: Number, // Corrected type to Number
    required: true,
  },
  buscompany:{
    type:String,
    required: true,
  },
  // Add more fields as needed
});

const AddBus = mongoose.model('AddBus', addBusSchema);

module.exports = AddBus;
