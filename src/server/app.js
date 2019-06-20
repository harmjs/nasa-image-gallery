import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import axios from 'axios';

import { NASA_API_KEY } from './config';

const NASA_API_BASE = "https://images-api.nasa.gov"

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/search', async function(req, res) {
  const { q } = req.query;
  try {
    const response = await axios.get('/search', {
      baseURL: NASA_API_BASE,
      params: { 
        q: q,
      }
    })
    res.json(response.data);
  }
  catch(err) {
    console.log(err);
    res.send('error');
  }
});

app.listen(3000, function() {
  console.log('app running on port 3000');
})