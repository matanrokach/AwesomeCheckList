const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/ListItem');
const ListItem = mongoose.model('listItems');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT);

require('./socketio/broadcast')(server);
