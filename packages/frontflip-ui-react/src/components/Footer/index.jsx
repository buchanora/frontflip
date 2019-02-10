import React from 'react';

export default function Footer ({children, visible=true, align}){
  return(
    <div className={`footer-wrap ${align==='right' ?'footer-right' : 'footer-left'} ${visible ? '': 'hideFooter'}`}>
      {children}
    </div>
  );
}
