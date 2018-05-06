import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Meta, Text } from '../TypeDeck/';
import { Section, Block } from '../Scaffold';
import Price from '../Price/';
import { getTicketPriceArray } from '../../lib/utils';


import { ListingImage, DateDeck, BuyTicket } from './common';

export default function ListingListItem(props){
  const { imageURL,
          name='Event Name',
          id='event',
          ticketPriceRange,
          tickets=[],
          startDate,
          startTime = '',
          venue='Venue',
          location='Address',
          onBuyTicketClick } = props;

  return(

      <div className='listing-wrap'>
        <div className='buyTicket-wrapper'>
          <BuyTicket  onClick={onBuyTicketClick}
                      prices={ticketPriceRange}/>
        </div>

          <Link to={`/event?id=${id}`} className='listing-list'>

            <ListingImage src={imageURL}/>

            <div className='listing-info-wrap'>

              <div className='listing-info'>
                <Heading size='3'>{name}</Heading>
                <Text size='2'
                      leading={false}
                      className='listing-location'
                      iconClass='location-pin'>

                      {`${venue}, ${location}`}
                      
                </Text>
              </div>

              <div className='listing-date'>
                <DateDeck time={startTime} date={startDate}/>
              </div>

            </div>
        </Link>

      </div>
  );
}
