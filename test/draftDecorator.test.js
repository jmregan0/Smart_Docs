import {findMatches} from 'APP/app/draftjsscratchpad/draftDecorator';
import {expect} from 'chai';

describe('draftDecorator tests',function(){
  describe('findMatches',function(){
    let haystack; 

    beforeEach('set test needle and haystack',function(){
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
});
