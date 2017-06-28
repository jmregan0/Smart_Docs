module.exports.strategy = (contentBlock,callback,contentState) => {
}

/*
module.exports.entitySpan = props => (
  <span
    data-offset-key={props.offsetKey}
    className="entitySpan"
  >{props.children}
  </span>
)
*/

// name: findMatches
// description:
//   given a block of text and a keyword,
//   return an array of entityRanges
// input:
//   1. string: str       - block of text to search
//                          (e.g. from a contentBlock)
//   2. string: word      - search keyword
//   3. number: entityKey - entity key to associate with
// output: Array: [entityRanges]
//   a. entityRange: {
//     number: offset,
//     number: length,
//     number: key,
//   }
// 
const findMatches = (str,word,entityKey) => {
  if(!word || typeof word != "string" || word.length === 0) return [];
  let modstr = str;
  let buffer = [];
  let r = new RegExp(`\\b${word}\\b`,'i');
  let searchResult = r.exec(modstr);
  let start = 0;
  while(searchResult) {
    buffer.push({
      offset: start + searchResult.index,
      length: word.length,
      key: entityKey,
    });
    start += searchResult.index + word.length;

    modstr = modstr.slice(searchResult.index + word.length);
    searchResult = r.exec(modstr);
  }
  return buffer;
}

module.exports.entityDecorate = (entityState,entities) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());

  //for each contentBlock,
  //  search the text for each entity [via findMatches]
  //  and set contentBlock.entityRanges to the result
  rawContent.blocks.forEach( contentBlock => {
    contentBlock.entityRanges = 
      entities.reduce( (_newEntityRanges,entity) => 
        _newEntityRanges.concat(
          findMatches(contentBlock.text,entity,entity) )
      ,[]);
  });

  // re-build entityMap based on entities
  rawContent.entityMap = entities.reduce( (map,entity) => {
      map[entity] = {
        type: entity,
        mutability: 'IMMUTABLE',
      };
      return map;
  },{});

  console.log('entityDecorate result:',rawContent);

  const newContentState = convertFromRaw(rawContent);
  const newEditorState = EditorState.push(editorState,newContentState);

  return newEditorState;
}
