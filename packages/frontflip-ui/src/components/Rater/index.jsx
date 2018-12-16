import React from 'react';

import Button from '../Button/'

// Exports Rating Component as default export
// Defines default props for ratings component
export default function Rating(props){
  const {
    rate = 1,
    onStarClick    = (index)=> console.log('star ' + index + ' was clicked'),
    onStarHover    = ()=> console.log('star was Hovered'),
    onSubmitRating } = props;

  return(
    <div>
      <div className='star-wrap'>
        <Star index={1} onStarClick={onStarClick} onStarHover={onStarHover} isActive={rate>=1}/>
        <Star index={2} onStarClick={onStarClick} onStarHover={onStarHover} isActive={rate>=2}/>
        <Star index={3} onStarClick={onStarClick} onStarHover={onStarHover} isActive={rate>=3}/>
        <Star index={4} onStarClick={onStarClick} onStarHover={onStarHover} isActive={rate>=4}/>
        <Star index={5} onStarClick={onStarClick} onStarHover={onStarHover} isActive={rate>=5}/>
      </div>
      {onSubmitRating &&<RatingButton onSubmitRating={onSubmitRating}/>}
    </div>
  );
}
// Defines private stateless Star component that is
// used in the Rating Component
function Star({index, onStarClick, onStarHover, isActive}){
  const starClass = isActive ?'star-active' : 'star-dormant';
  return(
    <span className={`star ${starClass}`}>
      <i className='icofont icofont-star fa-2x' id={`star-${index}`} onClick={onStarClick.bind(null, index)}></i>
    </span>
  );
}
// Defines private stateless Button component that
// submits the value of the ratings when clicked
function RatingButton({onSubmitRating}){
  return(
    <Button text='submit rating' type='button' onClick={onSubmitRating}/>
  );
}
