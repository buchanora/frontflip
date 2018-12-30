import qs from 'query-string';

exports.stringify = function stringify(qp){
  
  if(typeof qp === 'string'){
    return qp;
  }
  return qs.stringify(qp,{arrayFormat: 'index'})
}

exports.parse =  function parse(qp){
  
  if(typeof qp === 'object'){
    return qp;
  }
  return qs.parse(qp,{arrayFormat: 'index'})

}