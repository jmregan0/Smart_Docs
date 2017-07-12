import {findMatches,addEntitiesToEditorState} from 'APP/app/draftjsscratchpad/draftDecorator';
import {expect} from 'chai';

import {EditorState,convertToRaw,convertFromRaw} from 'draft-js';

describe('draftDecorator tests',function(){
  describe('findMatches',function(){
    let haystack; 

    before('set test needle and haystack',function(){
      haystack = 'Russia says it is "outrageous" that the US has not yet handed back two Russian intelligence compounds seized in the US under the Obama administration.' +
      'Foreign Minister Sergei Lavrov said he was "considering specific measures" in response, but did not elaborate.' + 
      'Earlier, unnamed Russian officials said Moscow was ready to expel about 30 US diplomats and seize US state property.' +
      'In December the Obama administration expelled 35 Russian diplomats and shut down two intelligence compounds.' +
      'Ex-President Barack Obama acted against Russia after US intelligence sources had accused Russian state agents of hacking into Democratic Party computers to undermine Hillary Clinton\'s presidential campaign.' +
      'Mr Lavrov told Russian media it was "simply shameful for such a great country as the United States, a champion of international law, to leave the situation in such a state of suspended animation".' +
      '"Justice and international law must be restored," he said, accusing the US Congress of being "charged up with Russophobia".';
    });

    it('correctly finds the number of entities',function(){
      expect(findMatches(haystack,'Russian','Russian')).to.have.length(5);
      expect(findMatches(haystack,'Obama','Obama')).to.have.length(3);
      expect(findMatches(haystack,'Pikachu','Pikachu')).to.have.length(0);
    });
    it('returns an array',function(){
      expect(findMatches(haystack,'Russian','Russian')).to.be.an('array');
      expect(findMatches(haystack,'Pikachu','Pikachu')).to.be.an('array');
    });
    it('returns results in the expected format',function(){
      let result = findMatches(haystack,'Sergei','Sergei')[0];
      //should return: { offset: 167, length: 6, key: 'Sergei' }
      expect(result).to.be.an('object');
      expect(result).to.have.keys('offset','length','key');
      expect(result.offset).to.equal(167);
      expect(result.length).to.equal(6);
      expect(result.key).to.equal('Sergei');
    });
  });

  describe('addEntitiesToEditorState tests',function(){
    let rawResult;

    before('create starting editorState',function(){
      let rawContent = {
        blocks: [
          {
            text: (
              'Foreign Minister Sergei Lavrov said he was "considering specific measures" in response, but did not elaborate.' 
            ),
            type: 'unstyled',
            entityRanges: [],
          },
          {
            text: (
              'Earlier, unnamed Russian officials said Moscow was ready to expel about 30 US diplomats and seize US state property.'
            ),
            type: 'unstyled',
            entityRanges: [],
          },
          {
            text: (
              'In December the Obama administration expelled 35 Russian diplomats and shut down two intelligence compounds.'
            ),
            type: 'unstyled',
            entityRanges: [],
          },
        ],
        entityMap: {},
      };
      let blocks = convertFromRaw(rawContent);
      let startEditor = EditorState.createWithContent(blocks); 

      let entity = [
        {
          count: 1,
          entityId: "T0",
          mention: "Sergei",
          normalized: "Sergei",
          type: "PERSON",
        },
      ];

      let result = addEntitiesToEditorState(startEditor,entity);
      rawResult = convertToRaw(result.getCurrentContent());
    });

    it('adds the entity to the entityMap',function(){
      expect(rawResult.entityMap).to.have.keys('0');
    });

    it('adds the entity to the entityMap in the correct form',function(){
      const checkMutability = (str) => 
        str == "IMMUTABLE" || str == "MUTABLE" || str == "SEGMENTED" ? true : false;

      expect(rawResult.entityMap['0']).to.have.keys('type','mutability','data');
      expect(rawResult.entityMap['0'].type).to.equal('Sergei');
      expect(checkMutability(rawResult.entityMap['0'].mutability)).to.be.true;
    });

    it('adds the entity to the correct block',function(){
      expect(rawResult.blocks[0].entityRanges).to.have.length(1);
      expect(rawResult.blocks[1].entityRanges).to.have.length(0);
      expect(rawResult.blocks[2].entityRanges).to.have.length(0);
    });

    it('adds the entity to the block in the correct form',function(){
      expect(rawResult.blocks[0].entityRanges[0]).to.have.keys('offset','length','key');
      expect(rawResult.blocks[0].entityRanges[0].offset).to.equal(17);
      expect(rawResult.blocks[0].entityRanges[0].length).to.equal(6);
      expect(rawResult.blocks[0].entityRanges[0].key).to.equal(0);
    });
  });
});
