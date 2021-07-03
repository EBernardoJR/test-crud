const User = require('../models/User')
const Token = require('../models/Token')
const bcrypt = require('bcrypt-nodejs')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    async create(req, res){
        const {
            name,
            email,
            password,
            phones
        } = req.body

        if(!name || !email || !password ) return res.status(400).json({
            Error: "incomplete data"
        })

        const user = await User.findOne({
            email
        })
        if(user) return res.status(403).json({
            Error: "e-mail already registered"
        })
        const passwordEncrypted = encryptPassword(password)
        User.create({
            name,
            email, 
            password: passwordEncrypted,
            phones
        })
        .then((user) => {
            Token.create({
                userId: user._id
            })
            .then((token) => {
                return res.json({
                    userId: user._id,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    lastLogin: token.createdAt,
                    token: token._id
                })

            })
            .catch(e => {
                return res.status(500).json({
                    Error: "Database error - Model: Token"
                })
            })
        }).catch(e => {
            return res.status(500).json({
                Error: "Database error - Model: User"
            })
        })

    },

    async index(req, res){
        const { authorization } = req.headers
        const { user_id } = req.params
        if(!authorization || !user_id ) return res.status(400).json({
            Error: "incomplete data"
        })

        const token = await Token.findOne({
            _id: authorization,
            userId: user_id
        })

        if(!token)  return res.status(401).json({
            Error: "Token not exists"
        })

        function validateTokenTime(token){
            const now = new Date()
            const date = {
                day: now.getDate(),
                month: now.getMonth(),
                year: now.getFullYear(),
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            }
            const tokenDate = new Date(token.createdAt)
            const createdAt  = {
                day: tokenDate.getDate(),
                month: tokenDate.getMonth(),
                year: tokenDate.getFullYear(),
                hour: tokenDate.getHours(),
                minute: tokenDate.getMinutes(),
                second: tokenDate.getSeconds()
            }
            if(date.year !== createdAt.year || date.month !== createdAt.month ||date.date !== createdAt.date ) return false
            else{
                if(date.hour !== createdAt.hour && date.hour - createdAt.hour > 1) return false 
                else{

                    const difference = date.hour == createdAt.hour? date.minute - createdAt.minute : (60 - createdAt.minute) + date.minute
                    if(difference < 30) return true
                    else return false
                }
            }
        }

        const tokenIsValid = validateTokenTime(token)
        if(!tokenIsValid) return res.status(401).json({
            Error: "expired token"
        })
        else{

            User.findOne({
                _id: user_id
            }).then(user => {
                return res.json(user)
            }).catch(e => {
                return res.status(500).json({
                    Error: "Database error - Model: User"
                })
            })
        }
    },
    async login(req, res){
        const { email, password } = req.body
        if( !email || !password ) return res.status(400).json({
            Error: "incomplete data"
        })
        const user = await User.findOne({
            email
        })

        if(!user) return res.status(401).json({
            Error: "E-mail or password is invalid"
        })
        else {
            const matchPasswords = bcrypt.compareSync(password, user.password)
            if(!matchPasswords) return res.status(401).json({
                Error: "E-mail or password is invalid"
            })
            else {
                Token.create({
                    userId: user._id
                }).then((token) => {
                    return res.json({
                        userId: user._id,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        lastLogin: token.createdAt,
                        token: token._id
                    })
                }).catch(e => {
                    return res.status(500).json({
                        Error: "Database error - Model: Token"
                    })
                })
            }
        }
    }
}