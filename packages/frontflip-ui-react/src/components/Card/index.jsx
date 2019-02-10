import React from 'react';

export default function Card(props){
  const {children, shrink='', className=''} = props;
  const cardWidth = shrink && 'shrink-card';
  return(
    <div className = {`card ${cardWidth} ${className}`}>
      {children}
    </div>
  );
}

export function CardSection({children}){
  return(
    <div className='card-section'>{children}</div>
  );
}
