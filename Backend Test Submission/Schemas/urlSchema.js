const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    origin: { type: String, required: true },
    shortId: { type: String , unique: true, required: true},
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    expiry: { 
        type: Date, 
        default: function() { 
            return new Date(Date.now() + 30 * 60 * 1000); 
        }
    },
    clickDetails:[{
        timeStamp: { type: Date, default: Date.now },
        referrer: { type: String, default: '' },
        geo: { type: String, default: '' },
    }]
});

module.exports = mongoose.model('Url', urlSchema);