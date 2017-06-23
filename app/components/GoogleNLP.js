const Language = require('@google-cloud/language')

// Your Google Cloud Platform project ID
const projectId = 'smartdocs@smartdocs-171319.iam.gserviceaccount.com'

// Instantiates a client
const language = Language({
  projectId: projectId
})

// The text to analyze
const text = 'In an exclusive interview with ABC News, a juror in the Bill Cosby sexual assault case said that after dozens of hours of grueling deliberations in a tiny room, 10 of the 12 jurors agreed he was guilty on two counts. On a third count, only one of the jurors believed he was guilty. The final, intractable votes on the first of the three counts was 10 to two to find Cosby guilty of digitally penetrating accuser Andrea Constand without her consent, the juror said. On the second count, that she was unconscious or unaware during the incident, the juror said the vote was 11 to one to acquit. On the third count, that the alleged assault occurred after Cosby gave Constand drugs or intoxicants without her knowledge, substantially impairing her for the purpose of preventing her resistance, the jury was deadlocked at 10 to two, in favor of a guilty verdict, according to the juror. On counts one and three, the two holdouts against finding Cosby guilty were “not moving, no matter what,” said the juror, who agreed to speak to ABC News only on the condition of anonymity. Other jurors contacted by ABC News declined to comment. Cosby, 79, had been charged in 2015 with three counts of felony aggravated indecent assault stemming from a 2004 incident involving Constand at his home in Pennsylvania. Constand testified during the six-day trial that the comedian gave her a drug that rendered her incapable of stopping his alleged assault, though she said she tried. Though Cosby did not take the stand, he said in a decade-old deposition that he gave Benadryl to Constand to "relax" her, and then the two had a consensual sexual encounter. He pleaded not guilty to the felony charge, and denied wrongdoing in other accusations made against him. The juror said that accusations by dozens of other women against Cosby were not factored into the deliberations at all, and when someone tried to discuss anything outside the boundaries of the trial testimony and evidence, the others would swiftly end the discussion. “We never brought anything outside in,” the juror explained. “Never. Not once. If somebody would mention something, we would cut them off.” The jurors initially voted overwhelmingly, in a non-binding poll, to find the entertainer not guilty on all three counts of aggravated indecent assault, the juror told ABC News on Monday. Deliberations effectively ended after the jury first deadlocked after 30 hours of deliberations, but the jury pressed on for 22 more hours before giving up hope of unanimous resolutions on any of the three counts. “There was no budging” after the first deadlock, the juror told ABC News, “and there was none from there on out.” Though the jurors were unable to reach a unanimous verdict on any of the counts, District Attorney Kevin Steele has said that he plans to retry the case. Dan Abrams, ABC News’ chief legal affairs anchor, found it "astonishing" that the juror said so many of the jurors changed their vote from innocent to guilty, and said he\'s never heard of a similar situation in such a high-profile case. However, he added, taking an initial vote is merely part of the deliberation process. "A verdict is reached only when the jurors send back the completed verdict form and inform the judge they have reached a verdict. That did not happen here," he said. Jurors\' names in Bill Cosby trial will be released Bill Cosby\'s lawyer \'confident\' in acquittal if case is retried Bill Cosby\'s sexual assault case ends in a mistrial. The juror, who declined to identify the holdouts or specify how any individual juror voted, told ABC News that tensions inside the deliberation room were exacerbated by the size of the room, after the 12 had to be moved from a larger conference room after sheriff’s deputies realized that reporters could see into the room through the window. “People couldn’t even pace” in the smaller room, the juror said. “They were just literally walking in circles where they were standing because they were losing their minds. People would just start crying out of nowhere, we wouldn’t even be talking about [the case] -- and people would just start crying.” Tensions reached a fever pitch at one point when a male juror punched the concrete wall of the jury room, according to the juror who spoke to ABC News. “I think he broke his pinky knuckle,” the juror said. “If we kept going, there was definitely going to be a fight. They had five sheriff’s deputies at the door and they could hear us and they kept coming in because they thought we were already fighting.” Abrams believes that the conditions in which the jurors deliberated could allow the defense to file a motion seeking to avoid a retrial. "The defense could argue, for example, that if the jurors had not been forced into a different, small cramped room, they could have come back with a not-guilty verdict. But that motion would almost certainly fail," he said. "Appellate courts are loath to start second guessing what jurors could have, or might have done." While declining to detail the other jurors’ internal jury room discussions, the juror expressed a purely personal belief that while Constand may not have known precisely what Cosby was giving her “she did take them, and he didn’t force them on her.” The juror also thinks that Cosby didn’t act with premeditation, but took advantage of the situation. “I think that he gave [the pills] to her, and then later when he saw what was up, maybe he figured, ‘Maybe I’ll do something.’” Despite the extraordinary pressure inside the jury room, the juror said, the experience ultimately brought the group of seven men and five women closer together -- and that most jurors now speak to each other by text and phone regularly.'

// Detects the sentiment of the text
language.detectSentiment(text)
  .then((results) => {
    console.log('sentiment results', results[0])
    const sentiment = results[0]

    console.log(`Text: ${text}`)
    console.log(`Sentiment score: ${sentiment.score}`)
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`)
  })
  .catch((err) => {
    console.error('ERROR:', err)
  })

language.detectEntities(text)
  .then(results => {
    // console.log('entity results', results)
    const entities = results[0]
    entities.forEach(entity => {
      console.log(entity.name)
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`)
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`)
      }
    })
  })
  .catch(err => {
    console.error('ERROR: ', err)
  })

// RETURNS A LOT OF '_UNKNOWN' PROPERTIES, SO NOT USEFUL
// language.detectSyntax(text)
//   .then((results) => {
//     // console.log('syntax results', results)
//     const syntax = results[0]

//     console.log('Parts of speech:')
//     syntax.forEach((part) => {
//       console.log(`${part.partOfSpeech.tag}: ${part.text.content}`)
//       console.log(`Morphology:`, part.partOfSpeech)
//     })
//   })
//   .catch((err) => {
//     console.error('ERROR:', err)
//   })

// ERROR: ANALYZEENTITYSENTIMENT WASN'T A FUNCTION; MAYBE NEED TO SPECIFY V1BETA2?
// language.analyzeEntitySentiment(text)
//   .then((results) => {
//     console.log('entity sentiment results', results)
//     const entities = results[0].entities

//     console.log(`Entities and sentiments:`)
//     entities.forEach((entity) => {
//       console.log(`  Name: ${entity.name}`)
//       console.log(`  Type: ${entity.type}`)
//       console.log(`  Score: ${entity.sentiment.score}`)
//       console.log(`  Magnitude: ${entity.sentiment.magnitude}`)
//     })
//   })
//   .catch((err) => {
//     console.error('ERROR:', err)
//   })
