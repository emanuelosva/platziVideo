import express from 'express';
import config from '../config';

const PORT = config.port;
const app = express();


app.get('*', (req, res) => {
  res.send({ hello: 'express' });
});

app.listen(PORT, (err) => {
  if (err) console.log(`ServerError -> ${err}`);
  else console.log(`Server running on http://localhost:${PORT}`)
});
