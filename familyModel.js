const mongoose = require('mongoose');

const familySchema = new mongoose.Schema( {
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },

    children: {
        type: Array,
        required: true
    },

    childrenImage: {
        type: Array,
        required: true
    }
}, { timestamps: true } )

const familyModel = mongoose.model( 'family', familySchema );

module.exports = familyModel;