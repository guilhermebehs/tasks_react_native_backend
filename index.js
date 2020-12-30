const express =  require('express');
const db = require('./config/db')
const consign = require('consign')
const app = express();

consign().include('./config/passport.js')
           .then('./config/middlewares.js')
           .then('./api')
           .then('./config/routes.js')
            .into(app)

app.db = db

app.listen(3000, console.log('Escutando na porta 3000'))


