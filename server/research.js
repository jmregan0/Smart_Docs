const axios = require('axios')

module.exports = require('express').Router()

.post('/', (req, res, next) => {

  let tags = req.body.tags.slice(0,13)

  console.log('tags', tags)

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
