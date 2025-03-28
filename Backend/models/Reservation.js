const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    reserveDate :{
        type: Date,
        required:true,
    },
    user :{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require:true
    },
    coWorkingSpace :{
        type: mongoose.Schema.ObjectId,
        ref: 'CoWorkingSpace',
        required:true
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation',ReservationSchema);