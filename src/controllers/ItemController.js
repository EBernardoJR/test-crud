const Item = require('../models/Item')

module.exports = {
    async create(req, res){
        const {
            userId,
            name,
            price,
        } = req.body

        const { path: url = '' } = req?.file

        if(!name) return res.status(400).json({
            Error: "incomplete data"
        })

        Item.create({
            name,
            price, 
            userId,
            image: url,
        })
        .then((item) => {
            return res.status(200).json({
                item
            })
        }).catch(e => {
            return res.status(500).json({
                Error: "Database error - Model: User"
            })
        })

    },

    async getByUser(req, res) {
        const {
            userId
        } = req.params

        if (!userId) {
            return res.status(400).json({
                Error: "incomplete data"
            })
        }

        Item.find({
            userId
        }).then((items) => {
            return res.status(200).json({
                items
            })
        }).catch(e => {
            return res.status(500).json({
                Error: "Database error - Model: User"
            })
        })
    },

    async getByNotUser(req, res) {
        const {
            userId
        } = req.params

        if (!userId) {
            return res.status(400).json({
                Error: "incomplete data"
            })
        }

        Item.find({
            userId: {
                $ne: userId
            }
        }).then((items) => {
            return res.status(200).json({
                items
            })
        }).catch(e => {
            return res.status(500).json({
                Error: "Database error - Model: User"
            })
        })
    }
}