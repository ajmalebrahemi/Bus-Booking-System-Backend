// BusCompany.js
const mongoose = require('mongoose');

const BusCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  logo:{
    type:String,
    required: true,
  }
  // Add more fields as needed
});

const BusCompany = mongoose.model('BusCompany', BusCompanySchema);

module.exports = BusCompany;
