const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const itemSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
},
{
    timestamps: true,
})

module.exports = model('Item', itemSchema)