const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const tokenSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},
{
    timestamps: true,
})

module.exports = model('Token', tokenSchema)