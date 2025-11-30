const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    examType: {
        type: String,
        required: true,
        enum: ['jee', 'neet', 'board'],
        trim: true
    },
    currentClass: {
        type: String,
        required: true,
        enum: ['11', '12', 'dropper'],
        trim: true
    },
    consentForUpdates: {
        type: Boolean,
        required: true,
        default: false
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted', 'rejected'],
        default: 'new'
    },
    notes: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Lead', leadSchema);
