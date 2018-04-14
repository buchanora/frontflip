import React from 'react';

export default function QuantityPicker(props){
  const { onChange = ()=>{},
          onIncrement = ()=>{}, 
          onDecrement = ()=>{},
          quantity = 1 } = props;

  return(
    <span className='quantity-picker'>


      <span className='quantity-decrement fa fa-minus' onMouseDown={onDecrement}></span>
      <input type='text' className='quantity' value={quantity} onChange={onChange}/>
      <span className='quantity-increment fa fa-plus' onMouseDown={onIncrement}></span>
    </span>
  );
}
