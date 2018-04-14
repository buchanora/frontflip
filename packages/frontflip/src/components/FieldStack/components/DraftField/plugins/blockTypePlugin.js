import {  RichUtils,
          getDefaultKeyBinding
}         from 'draft-js';

const blockTypes =[
  'paragraph',
  'header-four',
  'unordered-list-item',
  'ordered-list-item'
];

const getBlockComponent = (type)=>(
  ({contentState, entityKey, children})=>{
    const type = contentState.getEntity(entityKey).getType();
    // console.log(type);
    switch (type) {
      case 'header-four':
        return <h4>{children}</h4>
        break;
      case 'paragraph':
        return <p>{children}</p>
        break;
      case 'ordered-list-item':
        return <ol>{children}</ol>
        break;
      case 'unordered-list-item':
        return <ul>{children}</ul>
        break;
      default:

    }
  }
)

function getBlockStrategy(blockType){
  // console.log(blockType);
  return (contentBlock, callback, contentState)=>{
    contentBlock.findEntityRanges(character=>{
      const entityKey = character.getEntity();
      let entityType
      if(entityKey !== null){
        entityType = contentState.getEntity(entityKey).getType()
      }
      return blockType === entityType;
    }, callback)
  }
}

const blockTypePlugin = {
  // keyBindingFunction(event){
  //   return getDefaultKeyBinding(event)
  // },
  // handleKeyCommand(command, staticEditorState, actions){
  //   // console.log(actions);
  //   const {
  //     getEditorState,
  //     setEditorState
  //   } = actions;
  //
  //   const editorState = getEditorState()
  //   const newEditorState = RichUtils.handleKeyCommand(editorState, command);
  //   if(newEditorState){
  //     setEditorState(newEditorState);
  //     return 'handled'
  //   }
  //   return 'not-handled';
  // },

  decorators: computeDecorators(blockTypes)
}


function computeDecorators(_blockTypes){
  const decorators = _blockTypes.map(blockType=>{
    return {
      strategy: getBlockStrategy(blockType),
      component: getBlockComponent(blockType)
    }
  })
  // console.log(decorators);
  return(decorators)
}

export default blockTypePlugin;
