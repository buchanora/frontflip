
export default function grant(ajaxFunction, ...args){
    return new Promise((resolve, reject)=>{
  
      function callback(error, expectedValue){
        if(error){
          return reject(error);
        }
        return resolve(expectedValue);
      }
  
      try{
        ajaxFunction(callback, ...args);
  
      } catch(error){
        return reject(error)
      }
    })
  }
  