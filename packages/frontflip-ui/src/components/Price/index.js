import React from 'react';
import {Text} from '../TypeDeck/';
import {maskPrice} from '../../lib/utils';

export default function Price(props){
  
  const {amount='0', currency='₦', unit} = props;
  const range = String(amount).split('-')
  
  if(range[1]){
    return(
      <div className = 'price' >
        {
          range[0]==0
          ? 'FREE' 
          : `${currency}${maskPrice(range[0], 'brief')}` 
        }
        {
          '-'
        }
        {
          range[1]==0
          ? 'FREE' 
          : `${currency}${maskPrice(range[1], 'brief')}` 
        }
        {
          unit &&  '/' + unit
        }
  
      </div>
    )
  }
  return(
    <div className = 'price' >
      {amount==0
        ? 'FREE' 
        : unit 
          ? `${currency}${maskPrice(amount)}`  + '/' + unit
          : `${currency}${maskPrice(amount)}` 
      }

    </div>
  )
}
