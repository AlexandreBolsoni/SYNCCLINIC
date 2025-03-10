const express = require('express');
const multer = require('multer');
const configMulter = multer({
        storage: multer.diskStorage({
                destination: (req, file, callback) => {
                        callback(null, './app/public/uploads');
                },
                filename: (req, file, callback) => {
                        callback(null, Date.now() + "-" + file.originalname);
                },
        }),
});
const app = express();
app.upload = configMulter;
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
app.set('view engine', 'ejs');
app.set('views','./app/views');
app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    secret: 'dsfsef23424qwdqwd241356fwdfw45231dd1e1313r2f2323',
    resave: false,
    saveUninitialized: false
}
));
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .then('app/utils')
    .into(app);
module.exports = app;
