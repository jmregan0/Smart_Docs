const axios = require('axios');
const Encoder = require('node-html-encoder').Encoder;

module.exports = require('express').Router()

.post('/search', (req,res,next) => {
  console.log('query:', req.body.tag);

  const query = req.body.tag;

  axios.get('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch='+query)
  .then(res => res.data)
  .then(searchResults => {
    console.log('wiki search results:',searchResults);
    console.log('result 0:',searchResults.query.search[0]);
    res.json(searchResults.query);
  })
  .catch(error => console.error('/api/wikipedia'));
})
