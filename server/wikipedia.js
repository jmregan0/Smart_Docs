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
    res.json(searchResults);
  })
  .catch(error => console.error('/api/wikipedia'));
})
/*
.post('/', (req, res, next) => {
  console.log('tags', req.body)
  // make sure tags for cross ref come across in array
  let tags = req.body.tags

  // following algorithm to construct proper url query with users tags appended
  var query = '';
  tags.forEach((tag,index) => {
    var s = tag.split(' ');
    if(s.length > 1){
      s.forEach((word, index) => {
        query += word
        if(index < s.length -1){
          query += '%20'
        }
      })
    } else {
      query += tag
    }
    if(index < tags.length -1){
      query += '+'
    }
  })

  axios.get('https://api.crossref.org/works?query='+query)
  .then(data => {
    console.log('made it back from crossref with this ', data.data)
    // gonna have to do some cutting down of data set returned
    // lots of results
    // also choosing what to return. ex: article name, publication, author, data, DOI tag
    // for now...
    res.send(data.data)
  })


  .catch(error => {
    next(console.error('looks like an error:',error))
  });
})
*/
