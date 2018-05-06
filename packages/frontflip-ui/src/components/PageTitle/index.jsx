import React from 'react';

export default function PageTitle({title, children}){
  return(
    <div className='page-title'>
      {title || children}
    </div>
  )
}
