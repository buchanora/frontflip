import {  RichUtils,
          getDefaultKeyBinding
}         from 'draft-js';

const inlineTextStylePlugin = {
  keyBindingFunction(event){
    return getDefaultKeyBinding(event)
  },
  handleKeyCommand(command, staticEditorState, actions){
    // console.log(actions);
    const {
      getEditorState,
      setEditorState
    } = actions;
    const editorState = getEditorState()
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if(newEditorState){
      setEditorState(newEditorState);
      return 'handled'
    }
    return 'not-handled';
  }
}

export default inlineTextStylePlugin;
