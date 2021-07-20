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
const searchPlugin = () => schema =>
  schema.statics.pagingFind = async function (condition) {
    const page = +(condition.page || 1);
    const limit = +(condition.limit || 10);
    const skip = (page - 1) * limit;
    sort = condition.sort || sort || undefined;
    const result = await this.find().skip(+skip).limit(+limit).sort(sort);
    return result;
  };
board.plugin(searchPlugin());

models.Board = connection.model('Board', board, 'board');

module.exports = models