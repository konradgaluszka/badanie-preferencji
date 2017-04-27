import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(8000, () => console.log('Server listening at localhost:8000'));
