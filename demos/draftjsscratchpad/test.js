const staticEntities = [
  {
    count: 1,
    entityId: "T0",
    mentions: "Tuesday",
    normalized: "Tuesday",
    type: "TEMPORAL:DATE",
  },
  {
    count: 1,
    entityId: "T1",
    mentions: "$300",
    normalized: "$300",
    type: "IDENTIFIER:MONEY",
  },
  {
    count: 1,
    entityId: "Q176296",
    mentions: "Ukrainian central",
    normalized: "Ukrainian central",
    type: "ORGANIZATION",
  },
//const staticEntities = [
  {
    count: 1,
    entityId: "T123",
    mentions: "attack",
    normalized: "attack",
    type: "PERSON",
  },
  {
    count: 1,
    entityId: "T2",
    mentions: "test",
    normalized: "test",
    type: "PERSON",
  },
];

const rawContent = {
  blocks: [
    {
      text: 'Security researchers have discovered a "vaccine" for the huge cyber-attack that hit organisations across the world on Tuesday.' +
            'The creation of a single file can stop the attack from infecting a machine' + 
            'However, researchers have not been able to find a so-called kill switch that would prevent the crippling ransomware from spreading to other vulnerable computers.' + 
            "Experts are still unsure about the attack\'s origins or its real purpose." + 
            'Given that the ransom amount - $300 - was relatively small, some are speculating that the attack may be a front for causing wider disruption or making a political statement.' +
            'Among the victims of the attack were the Ukrainian central bank, Russian oil giant Rosneft, British advertising firm WPP and the global law firm DLA Piper.' + 
            'Also caught up in the attack was at least one hospital in the US city of Pittsburgh.',
      type: 'unstyled',
      entityRanges: [],
    },
    {
      text: 'A PERFC SOLUTION',
      type: 'header-two',
      entityRanges: [],
    },
    {
      text: 'But for those concerned about the attack there appears to be fix, albeit one with limited effectiveness.' + 
            'By creating a read-only file - named perfc - and placing it within a computer\'s "C:\Windows" folder, the attack will be stopped in its tracks.' + 
            'An explanation of how to do this has been posted by security news website Bleeping Computer and has been backed up by several other security experts.' + 
            'However, while this method is effective, it only protects the individual computer the perfc file is placed on. Researchers have so far been unable to locate a kill switch that would disable the ransomware attack entirely.',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
  entityMap: {},
};

const rawContentShort = {
  blocks: [
    {
      text: 'test test one two three',
      type: 'unstyled',
      entityRanges: [],
    },
    {
      text: 'test testy',
      type: 'header-two',
      entityRanges: [],
    },
    {
      text: 'not working, perhaps?',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
  entityMap: {},
  /*
  entityMap: {
    pikachu: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE',
    },
  },
  */
};


// BEGIN TESTS
// ##############################################

// findMatches tests
// ------------------------------------
const findMatches = require('./draftDecorator').findMatches;
//console.log('TEST: findMatches result:',findMatches(rawContent.blocks[0].text,'$300','$300'));


// entityDecorate tests
// ------------------------------------
const {EditorState,convertToRaw,convertFromRaw} = require('draft-js');
const entityDecorate = require('./draftDecorator').entityDecorate;
//console.log(entityDecorate.toString());

//const blocks = convertFromRaw(rawContentShort);
const blocks = convertFromRaw(rawContent);
//console.log('test: ',convertToRaw(EditorState.createWithContent(blocks).getCurrentContent()));
const newEditorState = EditorState.createWithContent(blocks);
//console.log(convertToRaw(newEditorState.getCurrentContent()));

console.log(
  "test: entityDecorate results:\n",
  convertToRaw(
    entityDecorate(newEditorState,staticEntities).getCurrentContent()
  )
);














