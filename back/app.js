const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
    { id: 1, content: 'hello' },
  ]);
});

app.post('/api/post', (req, res) => {
  res.json([{ id: 1, content: 'hello' }]);
});

app.delete('/api/post', (req, res) => {
  res.json([{ id: 1, content: 'hello' }]);
});

app.listen(4000, () => {
  console.log('4000 port run');
});
