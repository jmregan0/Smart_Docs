POST https://language.googleapis.com/v1/documents:analyzeSentiment?key=YOUR_API_KEY

// Imports the Google Cloud client libraries
const Language = require('@google-cloud/language');
const Storage = require('@google-cloud/storage');

// Instantiates the clients
const language = Language();
const storage = Storage();

// The name of the bucket where the file resides, e.g. "my-bucket"
// const bucketName = 'my-bucket';

// The name of the file to analyze, e.g. "file.txt"
// const fileName = 'file.txt';

// Instantiates a Document, representing a text file in Cloud Storage
const document = language.document({
  // The Google Cloud Storage file
  content: storage.bucket(bucketName).file(fileName)
});

// Detects the sentiment of the document
document.detectSentiment()
  .then((results) => {
    const sentiment = results[1].documentSentiment;
    console.log(`Document sentiment:`);
    console.log(`  Score: ${sentiment.score}`);
    console.log(`  Magnitude: ${sentiment.magnitude}`);

    const sentences = results[1].sentences;
    sentences.forEach((sentence) => {
      console.log(`Sentence: ${sentence.text.content}`);
      console.log(`  Score: ${sentence.sentiment.score}`);
      console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
