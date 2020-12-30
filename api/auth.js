
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs')
require('dotenv/config')

module.exports = app =>{
    const secret = process.env.AUTH_SECRET
    const signin = async(req,res) => {
        if(!req.body.email)
          return res.status(400).json('Dados incompletos')
        const user = await app.db('users').whereRaw("LOWER(email) = LOWER(?)", req.body.email).first()
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
                if(err || !isMatch)
                   return res.status(401).json('Senha informada inválida!')
                
                const payload = {id: user.id}
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, secret)
                })
            })
        }
        else{
            return res.status(400).json('Usuário não cadastrado!')
             
        }
    }

    return {signin}
}
