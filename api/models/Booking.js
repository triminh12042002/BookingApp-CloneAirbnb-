const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Types.ObjectId, ef:'Place', require: true},
    checkIn: {type:Date, require: true},
    checkOut: {type:Date, require: true},
    numberOfGuests: {type:Number, require: true},
    name: {type:String, require: true},
    phone: {type:String, require: true},
    price: Number,
})

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;