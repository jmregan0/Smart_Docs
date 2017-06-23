var functions = require('firebase-functions');
var axios = require('axios')
const request = require('request-promise');


//this import below not working exactly. Gotta figure out how to import secrets correctly, or just .gitignore this file too.
// var secrets = require('APP/secrets')

// // Start writing Firebase Functions
// // https://firebase.google.com/preview/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

// exports.findResources = functions.https.onRequest((request, response) => {

//     // var text = request.body

//     // even when rosetteApi is hardcoded in below, this cloud function doesn't hit rosette api. Getting Error: getaddrinfo ENOTFOUND api.rosette.com api.rosette.com:443
//     var instance = axios.create({
//       headers: {
//         'X-RosetteAPI-Key': secrets.rosetteApi,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Cache-Control': 'no-cache'
//       }
//     });

//     instance.post('https://api.rosette.com/rest/v1/entities',{
//       content: 'this is some sample text about Steve Jobs',
//       options: {
//       discoveryMode: true,
//       },
//     })
//     .then(data=>{
//       res.send(data.data);
//     })
//     .catch(error=>console.error('error:',error));
//   })


const WEBHOOK_URL = 'https://api.rosette.com/rest/v1/entities';

// Reads the content of the node that triggered the function and sends it to the registered Webhook
// URL.
exports.findTextResources = functions.database.ref('/users').onWrite(event => {
  return request({
    uri: WEBHOOK_URL,
    method: 'POST',
    json: true,
    body: event.data.val(),
    resolveWithFullResponse: true,
    headers: {
      'X-RosetteAPI-Key': 'bc619b77063938ba5fadd43449c68e04',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then(response => {
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    res.send(response.data)
  });
});
