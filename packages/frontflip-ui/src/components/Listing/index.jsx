import React from 'react';

import ListingListItem from './ListingListItem';
import ListingGridItem from './ListingGridItem';

export default function Listing({type='list', ...props}){
  function getListingComponent(_type){
    switch(_type){
      case 'list':
        return <ListingListItem {...props}/>
        break;
      case 'grid':
        return <ListingGridItem {...props}/>
        break;
      default:
        return <ListingListItem {...props}/>
    }
  }

  return getListingComponent(type)
}
