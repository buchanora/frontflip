import React from 'react';

function Loader(props){
  const {fillColor='', fillShade='', size, className=''} = props;
  let loaderSize = 'fa-3x';
  if(size==='small'){
    loaderSize = ''
  }
  if(size==='medium'){
    loaderSize='fa-3x'
  }
  return(
    <div className='loader'>
      <i className={`loader-icon fa fa-circle-o-notch fa-pulse ${loaderSize} ${fillColor} ${fillShade} fa-fw ${className}`}></i>
    </div>
  );
}

export default Loader;
