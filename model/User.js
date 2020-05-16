const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Open:{
        type: Number,
        required: true
    },
    High:{
        type: Number,
        required: true 
    },
    Low:{
        type: Number,
        required: true
    },
    Close:{
        type: Number,
        required: true 
    },
    Time:{
        type: String,
        
    }
});

module.exports = User = mongoose.model('user',UserSchema);