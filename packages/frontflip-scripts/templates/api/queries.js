import server, {serverRaw} from '../../config/server';
import {createArrayFromObj} from '../../lib/utils';

export function serverGet(...args){
  return fetcher(...args, 'get')
}

export function serverAll(...args){
  return fetchAll(...args)
}

export function serverPart(endpoint, baseUrl, type){
  return server(baseUrl)[type || 'get'](endpoint)
}


export function serverList(...args){
  return fetcher(...args, 'get')
}

export function serverPost(...args){
  return fetcher(...args, 'post')
}

export function serverUpdate(...args){
  return fetcher(...args, 'put')
}

export function serverDelete(...args){
  return fetcher(...args, 'delete')
}

export function serverUpload(...args){
  return fetcher(...args, 'upload')
}

export function serverReplaceUpload(...args){
  return fetcher(...args, 'replaceUpload')
}

function fetcher(callback, options, baseUrl, fetchType){
  
  let extraOptions = {
    validateStatus: status=>{
      return status;
    }
  };

  if(['upload', 'replaceUpload'].indexOf(fetchType) !== -1){
    extraOptions.headers = {
          'content-type': 'multipart/form-data'
      }
    fetchType === 'upload'
    ? fetchType = 'post'
    : fetchType = 'put'
  }

  try{
    server(baseUrl)[fetchType](...options, extraOptions)
    .then(response=>{
      // console.log(response);
      if (response.data){
        // console.log(response);
        
        callback(null, response.data);
      }else{
        callback(null, {responseCode: 0, ...response})
      }
    })
    .catch((error)=>{
      // console.log(error);
      callback(error)
    })
  } catch(error){
    // console.log(error);
    
    callback(error);
  }
}

function fetchAll(callback, args){
  serverRaw.all(args)
  .then(serverRaw.spread((...responses)=>{
    callback(null, responses.map(r=>r.data))
  }))
  .catch(error=>{
    callback(error)
  })
}
