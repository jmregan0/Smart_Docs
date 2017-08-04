# 🤔🤔 SmartDocs 🤔🤔

An intelligent note-taking app that finds research as you go. Built as a Capstone project at [Fullstack Academy](https://www.fullstackacademy.com/) in Chicago.

## About SmartDocs

SmartDocs analyzes your writing in the background and finds important subjects (i.e., entities) in your writing for further discovery. It saves these entities in a sidebar so you can keep working on your document distraction-free. Whenever you're ready, SmartDocs will find research results relevant to the entities in your writing and return them for you right within the app, which you can sae for future use.

You can also see what others are writing in real-time, side-by-side your own document.

It's the future of writing...available for you to use today.

Written with React, Redux and DraftJS for the front-end, Firebase for the back-end, and utilizing Rosette & Crossref APIs.

## Screenshots

![alt text](https://github.com/jmregan0/Smart_Docs/blob/master/screenshots/smartdocs1.png?raw=true)
![alt text](https://github.com/jmregan0/Smart_Docs/blob/master/screenshots/smartdocs2.png?raw=true)
![alt text](https://github.com/jmregan0/Smart_Docs/blob/master/screenshots/smartdocs3.png?raw=true)

## Contributors

* [Bryan Kao](https://www.linkedin.com/in/bryanwkao/)
* [Will McCracken](https://www.linkedin.com/in/will-mccracken/)
* [Jacob Regan](https://www.linkedin.com/in/jacob-regan-b2b76013a/)
* [Rob Tong](https://www.linkedin.com/in/rob-tong-86531a1/)


## 1. Install me

Clone this repo into an empty directory on your machine.

```sh
git clone https://github.com/jmregan0/Smart_Docs
```

[fire(base)](https://firebase.google.com)


## 2. Run me

You'll need to run two separate commands:

```sh
npm run dev
npm run nlp
```

## 3. Launch me

To fire up SmartDocs, point your browser to:

```sh
http://localhost:5000
```

## 4. Use me

Click the `Start SmartDocs` link in the upper-left.

If you're working solo, click the `Start Blank Note` button.

If you want to share notes with others, create a new topic or click an existing topic.

Once you start composing your document, SmartDocs will return your note's entities after you've written 200 words and after every 150 additional words.

Entities higher in the list are prioritized when SmartDocs finds research for you, so move your preferred entities up and your less important entities down using the arrow buttons next to each entity. If you want to exclude entities from being researched, click the delete button next to each entity to remove.

Whenever you're ready, click the `Show Research` button and SmartDocs will analyze your document. You'll be presented with the Dashboard, which gives a digest view of research results and primary entities as well as access to more detailed analysis.

Detailed results include the actual research results, entity detail, sentiment detail and relationship detail. `Research results` are in the big blue box on the Dashboard. `Entity detail` is in the big green box, listing all the important entities in your document and possible definitions. `Relationship detail` is in the big red box and shows if the subjects in your writing are connected and how. This is very useful in discovering relationships to further research that you may not have forseen. And `Sentiment detail` in the big orange box reveals whether your emotion towards the subejcts in your writing are positive, negative or neutral, and how confident it is in its analysis of your emotion towards the subjects.


## License

This software is protected under the standard MIT License.
