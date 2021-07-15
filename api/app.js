const express = require('express');
const bodyParser = require('body-parser');
const { query } = require('mongoose');
const { Board } = require('./mongoEx');
const app = express();

app.use(bodyParser.json());
app.get('/query', (req, res) => res.send(req.query));
app.get('/board', async (req, res, next) => {
  const { page, limit, sort } = req.query;
  if (!page || !limit || !sort) res.redirect('http://localhost:4500/board?page=1&limit=10&sort=-_id')
  else {
    try {
      const skip = (page - 1) * limit;
      const results = await Board.find().skip(+skip).limit(+limit).sort(sort);
      res.json(results);
    } catch (err) { next(err) }
  }
})
app.post('/board', async (req, res, next) => {
  const { body } = req;
  try {
    const createdPost = await Board.create(body);
    res.json(createdPost);
  }
  catch (e) {
    next(e);
  }
})
app.get('/:id', (req, res) => res.json(req.params));
app.get('/', (req, res) => res.json('hello'));
app.use((req, res) => res.send('error'));
module.exports = app;