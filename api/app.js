const express = require('express');
const app = express();


app.get('/query', (req, res) => res.send(req.query));
app.get('/:id', (req, res) => res.json(req.params));
app.get('/', (req, res) => res.json('hello'));
app.use((req, res) => res.send('error'));
module.exports = app;