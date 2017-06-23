var functions = require('firebase-functions');
var axios = require('axios')

//this import below not working exactly. Gotta figure out how to import secrets correctly, or just .gitignore this file too.
var secrets = require('APP/secrets')

// // Start writing Firebase Functions
// // https://firebase.google.com/preview/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.findResources = functions.https.onRequest((request, response) => {

    // var text = request.body

    // even when rosetteApi is hardcoded in below, this cloud function doesn't hit rosette api. Getting Error: getaddrinfo ENOTFOUND api.rosette.com api.rosette.com:443
    var instance = axios.create({
      headers: {
        'X-RosetteAPI-Key': secrets.rosetteApi,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    instance.post('https://api.rosette.com/rest/v1/entities',{
      content: 'this is some sample text about Steve Jobs',
      options: {
      discoveryMode: true,
      },
    })
    .then(data=>{
      res.send(data.data);
    })
    .catch(error=>console.error('error:',error));
  })
