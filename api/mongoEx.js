const mongoose = require('mongoose');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
}


const connection = mongoose.createConnection('mongodb://localhost/test', options);


const models = {};

const board = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: true,
    index: true,
  },
  content: {
    type: String,
    require: true,
  },
  writer: {
    type: mongoose.Types.ObjectId, //나중에 populate로 다른 스키마 연계
  }
})

models.Board = connection.model('Board', board, 'board');

module.exports = models