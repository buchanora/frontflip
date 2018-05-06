// Import React and React-Native modules
import  React, {
  Component,
}       from  'react';

import  Icon from '../Icon/';
import {computeColor, computeFontSize} from '../../utils/styleHelpers';




// Define and Module Exports

export  function Screamer (props){
  return  <Text {...props} size='6' element='h3' fontWeight='bold' className='screamer'>{ props.text || props.children}</Text>
}

export  function Title (props){
  return  <Text {...props} size={props.size || '5'} leading={props.leading || '2'} element={props.element || 'h2'} fontWeight={props.fontWeight || 'bold'}>{ props.text || props.children}</Text>
}

export  function SectionHead (props){
  return  <Text {...props} size={props.size || '4'} leading={props.leading || '2'} element={props.element || 'h3'} fontWeight={props.fontWeight || 'bold'}>{ props.text || props.children}</Text>
}


export  function   Heading (props){
  return <Text {...props} size={props.size || '3'} leading={props.leading || '2'} element={props.element || 'h4'} fontWeight={props.fontWeight || 'bold'}>{ props.text || props.children}</Text>
}

export  function   SubHeading (props){
  return  <Text {...props} size={props.size || '2'} leading={props.leading || '2'} element={props.element || 'h5'}>{ props.text || props.children}</Text>
}


export  function Kicker (props){
  return  <Text {...props} size={props.size || '2'} leading={props.leading || '2'}>{ props.text || props.children}</Text>
}


export  function Deck (props){
  return  <Text {...props} size={props.size || '2'} leading={props.leading || '2'}>{ props.text || props.children}</Text>
}


export  function Meta (props){
  return  <Text {...props} size={props.size || '2'} leading={props.leading || '2'}>{ props.text || props.children}</Text>
}

export  function Text (props){
const {   textAlign = '',
      iconClass,
      size,
      className='',
      color = '',
      children,
      label,
      element='span',
      leading=1,
      inline,
      text = '',
      fontWeight = '',
      fontColor,
      fontShade,
      style = {}, }   = props;

const fontSize = (size)=>{ // Support for legacy type scale
  switch (size){
    case 'small':
      return '0.8rem';
    break;
    case 'medium':
      return '1.2rem';
    break;
    case 'large':
      return '1.8rem';
    break;
    case 'xl':
      return '2.4rem';
    break;
    default:
      return computeFontSize(size);
    }
  }

  let classes = '';
  classes += computeColor(fontColor, fontShade, 'color') + ' '
  classes += fontSize(size) + ' '
  classes += inline ? 'inline-type ' : 'block-type '
  classes += leading ? `leading-${leading} ` : ''
  classes += iconClass ? 'iconText ': ''
  classes += className
  classes += 'type-deck text'

  const Body = [
    iconClass && <Icon className={`${iconClass}`} key='icon'/>,
    label && <em className = 'label-text-label' key='label'>{label}</em>,
    text || children,
  ];

  const Element = React.createElement(
    element, 
    {
      className: classes,
      style: {  textAlign: textAlign,
                fontWeight: fontWeight,
                color, ...style 
          }
    },
    Body

  );
  return Element;
}
