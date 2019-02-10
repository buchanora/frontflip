import React from 'react';

export function ViewWrapper({children, className=''}){
  return(
    <div className={'view-wrapper' + ' ' + className}>
      {children}
    </div>
  );
}

export function Page({children, className=''}){
  return(
    <div className={'page' + ' ' + className}>
      {children}
    </div>
  );
}

export function ContentWrap({children, className=''}){
  return(
    <div className={'content-wrapper' + ' ' + className}>
      {children}
    </div>
  );
}

export function Content({children, className=''}){
  return(
    <div className={'content' + ' ' + className}>
      {children}
    </div>
  );
}

export function Sidebar({children, className=''}){
  return(
    <div className={'sidebar' + ' ' + className}>
      {children}
    </div>
  );
}
