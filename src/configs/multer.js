//configurações do multer
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')


const storageTypes = {//duas opções para salvar o arquivo
    local: multer.diskStorage({ 
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            //mudando o nome do arquivo
            crypto.randomBytes(16, (err, hash)=> {
                if(err) cb(err)

                file.key = `${hash.toString('hex')} - ${file.originalname}`//nome do arquivo
                cb(null, file.key)
            })
        }, 
    }),
}



module.exports = {     //pasta config
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),//pra onde os arquivos irão
    storage: storageTypes.local,
    limits: {
        //limites do arquivo
        fileSize: 2 * 1024 * 1024 //2MB
    },                    //função que será chamada assim que terminar a verificação
    fileFilter: (req, file, callback) => {
        //filtrar as extenções
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        //verficar se o arquivo tem as extenções 
        if(allowedMimes.includes(file.mimetype)){
            callback(null, true)
        } else {
            callback(new Error('Invalid file type.'))
        }
    }
}