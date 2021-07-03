const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    phones: {
        type: [{
            number: String,
            ddd: String
        }]
    },
},
{
    timestamps: true,
})

module.exports = model('User', userSchema)