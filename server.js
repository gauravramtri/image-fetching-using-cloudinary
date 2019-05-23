const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')
const bodyParser = require('body-parser')
require('dotenv').config()
const cloudinary = require('cloudinary')
const upload = require('./handlers/multer')
const mongoose = require('mongoose')

const port = process.env.PORT || 2000;
const app = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }))

require('./model/Date')


require('./handlers/cloudinary')

const Date = mongoose.model('Date')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/lol',upload.single('image'), async  (req,res)=>{
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  res.send(result)
})

const server = http.createServer(app);

server.listen(port);