import React from 'react';
import { Heading, Meta, Text } from '../TypeDeck/';
import Price from '../Price/';
import { imageBackground } from '../../resources/styles.common';
import { dateMapper, timeMapper, mapPricesToString, maskPrice } from '../../lib/utils';
import { getURLBase } from "../../utils/urlMappers";



export function Feature({feature}){
  return(
    <li className='listing-feature'>
      <Meta textAlign='left'>{feature.key+': '} <em>{feature.value}</em></Meta>
    </li>
  )
}

export function BuyTicket({prices, onClick}){
  const priceString = mapPricesToString(prices);
  
  return(
    <div className='buyTicket-button' onClick={onClick}>
      <i className={ prices? 'icofont icofont-cart' : 'icofont icofont-cart' }></i>
      <Price amount={priceString}/>
    </div>
  );
}

export function ListingImage({src}){
  return(
    <div  className='listing-image' 
          style={{  backgroundImage:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${getURLBase() +'thumb/'+ src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition:  'center',
                    backgroundSize: 'cover'
    }}>
      <img src = {getURLBase() + 'thumb/'+src} />
    </div>
  )
}

export function DateDeck({date, time}){
  const dateMap = [...dateMapper(date).split(' ')];
  const timeMap = timeMapper(time);
  return(
    <div className='date-deck'>
      <Text size='2' leading='1'>{dateMap[0]}</Text>
      <Text size='3' leading='1'>{dateMap[1] && dateMap[1].toUpperCase() + ' ' + dateMap[2]}</Text>
      <Text size='2' leading='1'>{timeMap}</Text>
      {/* <Text size='small' leading={false}>{time.slice(0,3).concat(time.slice(6)).join('')}</Text> */}
    </div>
  );
}
