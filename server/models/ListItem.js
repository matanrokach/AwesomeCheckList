const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const listItem = new Schema({
  title: String,
  time_added: {type: Date, default: Date.now},
  done: {type: Boolean, default: false},
  archived: {type: Boolean, default: false},
  imageurl: {type: String, default: ''}
});

mongoose.model('listItems', listItem);
