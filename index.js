const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config/index');

const routes = require('./routers/index.router')
app.use(cors())

const port = process.env.PORT || 3000;

function listen() {
  app.listen(port);
  console.log('app started on port ' + port);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

  return mongoose.connect(config.db, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);
app.get('*', (req, res) => {
  res.send("working")
})

connect();