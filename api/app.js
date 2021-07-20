const express = require('express');
const bodyParser = require('body-parser');
const { Board } = require('./mongoEx');
const app = express();

app.use(bodyParser.json());
app.get('/query', (req, res) => res.send(req.query));
app.get('/board', async (req, res, next) => {
  const query = req.query;

  try {
    const results = await Board.pagingFind(query)
    res.json(results);
  } catch (err) { next(err) }
})
app.post('/board', async (req, res, next) => {
  const body = req.body;
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