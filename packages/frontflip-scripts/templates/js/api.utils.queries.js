import axios, {axiosRaw} from '../../config/server';

export function axioGet(...args){
  return fetcher(...args, 'get')
}

export function axioAll(...args){
  return fetchAll(...args)
}

export function axioPart(endpoint, baseUrl, type){
  return axios(baseUrl)[type || 'get'](endpoint)
}

export function axioList(...args){
  return fetcher(...args, 'get')
}

export function axioPost(...args){
  return fetcher(...args, 'post')
}

export function axioUpdate(...args){
  return fetcher(...args, 'put')
}

export function axioDelete(...args){
  return fetcher(...args, 'delete')
}

export function axioUpload(...args){
  return fetcher(...args, 'upload')
}

export function axioReplaceUpload(...args){
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
    axios(baseUrl)[fetchType](...options, extraOptions)
    .then(response=>{
      if (response.data){
        callback(null, response.data);
      }else{
        callback(null, {responseCode: 0, ...response})
      }
    })
    .catch((error)=>{
      callback(error)
    })
  } catch(error){
    callback(error);
  }
}

function fetchAll(callback, args){
  axiosRaw.all(args)
  .then(axiosRaw.spread((...responses)=>{
    callback(null, responses.map(r=>r.data))
  }))
  .catch(error=>{
    callback(error)
  })
}