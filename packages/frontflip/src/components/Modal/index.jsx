import React from 'react';

import ScreenOverlay from '../ScreenOverlay/';


export default function Modal (props){

  const { children,
          onOpen=()=>{},
          onClose=()=>{},
          visible, } = props;

  onOpen();
  return(
    <div className={`modal-wrapper ${visible ?'modal-visible' :'modal-hidden'}`}>

      <div className='modal' >
        <CloseButton onClick={_handleCloseModal}/>
        {children}
      </div>

      <ScreenOverlay visible={true} onClick={_handleCloseModal} />

    </div>
  );

  function _handleCloseModal(){
    onClose()
  }
}

function CloseButton({onClick, showText}){
  return(
    <span className='close-button-wrap' onClick={onClick} >
      <span className='close-button fa fa-close'></span>
      {showText && Close}
    </span>
  )
}
