import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Meta, Text } from '../TypeDeck/';
import { Section, Block } from '../Scaffold';
import Price from '../Price/';
import { getTicketPriceArray, truncateString } from '../../lib/utils';


import { ListingImage, DateDeck, BuyTicket } from './common';

export default function ListingGridItem(props){
  const { imageURL,
          name='Event Name',
          id='event',
          ticketPriceRange,
          tickets=[],
          startDate='',
          startTime = '',
          location='Address',
          venue='Venue',
          onBuyTicketClick } = props;

  return(

      <div className='listing-grid listing-wrap'>
        <div className='buyTicket-wrapper'>
          <BuyTicket  onClick={onBuyTicketClick}
                      prices={ticketPriceRange}/>
        </div>

        <Link to={`/event?id=${id}`}>

        <ListingImage src={imageURL}/>

        <div className='listing-info-wrap'>

          <div className='listing-info'>
            <Heading size='3' leading='1'>{truncateString(name, 50)}</Heading>
            <Text size='2'
                  leading={false}
                  className='listing-location'
                  iconClass='location-pin'>
                  {' ' + truncateString(`${venue}, ${location}`, 31)}
            </Text>
          </div>

          <div className='listing-date'>
            <DateDeck date={startDate} time={startTime} />
          </div>

        </div>
        </Link>

      </div>
  );
}
