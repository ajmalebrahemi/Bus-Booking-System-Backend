const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  busname: { type: String, required: true },
  image: { type: String, required: true },
  buscompany: { type: mongoose.Schema.Types.ObjectId, ref: 'BusCompany' }, // اضافه کردن ارجاع به BusCompany
  usageCount: { type: Number, default: 0 }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
