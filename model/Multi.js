const mongoose = require('mongoose');

const MultiSchema = new mongoose.Schema({
    Subplot:{
        type: Number,
        required: true
    },
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
        type: Date,
        default: Date.now  
    }
});

module.exports = Multi = mongoose.model('multi',MultiSchema);