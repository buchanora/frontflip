const writer = require('fs').writeFile;

function createAction(){
  const actionName = process.argv[2];
  writer(`${actionName}Action.js`, '"actionFile"', (err)=>{
    if (err) throw err;
    // console.log(process);
  })
}
createAction();
