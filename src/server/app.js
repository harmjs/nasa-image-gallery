import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import axios from 'axios';

const NASA_API_BASE = "https://images-api.nasa.gov"

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/search', async function(req, res) {
  const { query, page } = req.query;
  try {
    const response = await axios.get('/search', {
      baseURL: NASA_API_BASE,
      params: { 
        q: query,
        page: page,
        media_type: 'video,image'
      }
    })
    res.json(response.data);
  }
  catch(err) {
    res.status(500);
    res.send('server error');
  }
});

app.listen(process.env.PORT, function() {
  console.log('app running on port ' + process.env.PORT);
})