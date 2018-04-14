// Button Component

import  React, {
        Component,
}       from 'react';

import {Link} from 'react-router-dom';

import Loader from '../Loader/'


export default function Button (props){
  const {
        className = '',
        disabled = false,
        loading,
        pair, //boolean
        type, // link submit
        to,
        style, // solidPrimary hollowPrimary
        text, // <string>
        iconLeft, // <icon class string>
        iconRight, // <icon class string>
        size, // large, medium, small
        expanded, //boolean
        expand,
        margin,
        onClick, //function
        children } = props;

  const generalStyle = getGeneralStyle(style);

  const stretchStyle = (expanded || expand) ? 'stretch-button' : '';

  const pairStyle = pair && 'button-group';

  const sizeStyle = getSizeStyle(size);
  const marginStyle = computeMargins(margin, iconLeft, iconRight)
  const disabledClass = disabled? 'button-disabled' : ''

  const defaultButton = (
    <button   className={generalStyle + ' ' + 'button' + ' ' + stretchStyle +' '+ sizeStyle+' '+ pairStyle + ' ' +disabledClass + marginStyle + className}
              type='button'
              onClick={disabled? ()=>{}: onClick}>
        {
          loading && <Loader size='small' className='button-icon .button-icon-center'/>
        }
        {!loading && iconLeft && <i className={`${iconLeft} button-icon button-icon-left`}></i> }
        {!loading && text && text.toUpperCase()||children}
        {!loading && iconRight && <i className={`${iconRight} button-icon button-icon-right`}></i> }
    </button>
  );

  const linkButton = (
    <Link     className={generalStyle + ' ' + 'button' + ' ' + stretchStyle +' '+ sizeStyle+' '+ pairStyle + ' ' +disabledClass}
              to={ `/${to}` }>
        {iconLeft && <i className={`${iconLeft} button-icon button-icon-left`}></i> }
        <span>{text && text.toUpperCase()||children}</span>
        {iconRight && <i className={`${iconRight} button-icon button-icon-right`}></i> }
    </Link>
  );

  const submitButton = (
    <input    className={generalStyle + ' ' + 'button submit-button' + ' ' + stretchStyle +' '+ sizeStyle+ ' '+ pairStyle + ' ' +disabledClass}
              type='submit'
              disabled={disabled}
              value={text && text.toUpperCase()||children}/>
  );

  const renderButton = (type) =>{
    switch(type){
      case 'link':
        return linkButton;
        break;
      case 'submit':
        return submitButton;
        break;
      default:
        return defaultButton;
    }
  }

  return  renderButton(type);

}

export function ButtonGroup({children, className=''}){
  return(
    <div className={'button-group-wrapper' +' ' +className}>
      {children}
    </div>
  );
}

function computeMargins(margin, iconLeft, iconRight){
  let classes = ''
  if(margin){
    classes += 'button-margin'
  }
  if(iconLeft){
    classes += ' button--iconLeft'
  }
  if(iconRight){
    classes += ' button--iconRight'
  }
  return classes
}

function getSizeStyle(size){
  switch (size) {
    case 'small':
      return 'button-small';
      break;
    case 'medium':
      return 'button-medium';
      break;
    case 'large':
      return 'button-large';
      break;
    default:
      return 'button-medium';
  }
}

function getGeneralStyle (style){
  switch (style){
    case 'solidNeutral':
      return 'solid-neutral';
      break;
    case 'hollowNeutral':
      return 'hollow hollow-neutral';
      break;
    case 'solidPrimary':
      return 'solid-primary';
      break;
    case 'hollowPrimary':
      return 'hollow hollow-primary';
      break;
    case 'solidSecondary':
      return 'solid-secondary';
      break;
    case 'hollowSecondary':
      return 'hollow hollow-secondary';
      break;
    default:
      return 'solid-secondary'
  }
}
