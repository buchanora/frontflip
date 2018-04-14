import React from 'react';

export default function ClickBox(props){
    return(
      <span className={`clickbox ${props.active? 'clickbox-active': ''} ${props.fluid ? 'clickbox-no-wrap' : ''} ${props.className ? props.className : ''}`}
            onMouseDown={props.onClick}
            onMouseUp={props.afterClick}>
            {
              props.children ||
              [
                <i className={`icofont icofont-${props.iconClass || 'settings'}`} key='clicbox-icon'/>,
                <span key='clickbox-label'>{props.label || 'Label'}</span>
              ]
            }
      </span>
    );
  }