'use strict'
import  React from 'react';
import PropTypes from 'prop-types';

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
      case 'LINK':
        return linkButton;
        break;
      case 'submit':
      case 'SUBMIT':
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
    case 'SMALL':
      return 'button-small';
      break;
    case 'medium':
    case 'MEDIUM':
      return 'button-medium';
      break;
    case 'large':
    case 'LARGE':
      return 'button-large';
      break;
    default:
      return 'button-medium';
  }
}

function getGeneralStyle (style){
  switch (style){
    case 'solidNeutral':
    case 'SOLID_NEUTRAL':
      return 'solid-neutral';
      break;
    case 'hollowNeutral':
    case 'HOLLOW_NEUTRAL':
      return 'hollow hollow-neutral';
      break;
    case 'solidPrimary':
    case 'SOLID_PRIMARY':
      return 'solid-primary';
      break;
    case 'hollowPrimary':
    case 'HOLLOW_PRIMARY':
      return 'hollow hollow-primary';
      break;
    case 'solidSecondary':
    case 'SOLID_SECONDARY':
      return 'solid-secondary';
      break;
    case 'hollowSecondary':
    case 'HOLLOW_SECONDARY':
      return 'hollow hollow-secondary';
      break;
    default:
      return 'solid-secondary'
  }
}

Button.propTypes = {
  className: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  pair: PropTypes.bool,
  type: PropTypes.oneOf(['LINK', 'SUBMIT']),
  to: PropTypes.string,
  style: PropTypes.oneOf([
    'SOLID_PRIMARY', 
    'SOLID_SECONDARY', 
    'SOLID_NEUTRAL', 
    'HOLLOW_PRIMARY', 
    'HOLLOW_SECONDARY', 
    'HOLLOW_NEUTRAL'
  ]),
  text: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  size: PropTypes.oneOf(['SMALL', 'MEDIUM', 'LARGE']),
  expand: PropTypes.bool,
  margin: PropTypes.bool,
  onClick: PropTypes.func
}
