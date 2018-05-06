import React from 'react';
import {Link} from 'react-router-dom';
// import {color, fontScale} from '../../constants/styles';
import {Heading} from '../TypeDeck/';

export default function Pagination(props){

  const { pageCount,
          getPagePath,
          currentPage, } = props;

  // const numberOfPages = (itemCount, itemsPerPage)=>itemCount/itemsPerPage;

  function shouldRender(count, index, active){
    // console.log("count is" + " " +count);
    // console.log("active is" + " " +active);
    // console.log("index is" + " " +index);
    let deck, ceilRange, floorRange;

    if(count === 1){
      return -1;
    }

    if (count > 9){

      if( active<4 ){

        deck = [1,1,1,1,-1,1,1,1,1]
        if(index<=4) return 1;
        if(index>=count-3) return 1;
        if(index === count-4) return 0;
        return -1;

      } else if ( active >=4 && active <= count-3 ){

        deck = [1,-1,1,1,1,1,1,-1,1]
        floorRange = active - 2;
        ceilRange = active + 2;

        if( index === 1 ) return 1;
        if( index >=floorRange && index<= ceilRange ) return 1;
        if( index === count ) return 1;
        if( index === ceilRange+1 || index === floorRange-1 ) return 0;
        return -1

      } else if( active>count-3 ){

        let deck = [1,-1,1,1,1,1,1,1,1]
        if(index<=1) return 1;
        if(index>=count-6) return 1;
        if(index === count-7) return 0;
        return -1;

      }

    } else{
      return 1
    }
  }

  const renderPageButtons = (pageCount, currentPage)=>{
    const pageButtonArray = [];

    currentPage > 1 && pageButtonArray.push(
      <li key={`page_prev`}
          className={`pagination-pageButton  pagination-previous`}>
          <Link to={getPagePath(currentPage-1)}
                aria-label='Previous page'>
            Prev
          </Link>
      </li>
    )

    for (var i = 1; i <= pageCount; i++){
      const isCur = i === currentPage ?true : false;
      const element = shouldRender(pageCount, i, currentPage)
      switch(element){
        case -1:
          break;
        case 0:
          pageButtonArray.push(
            <li key={`page_${i}`}
                className={`ellipsis`}>
            </li>
          );
          break;
        case 1:
          pageButtonArray.push(
            <li key={`page_${i}`}
                className={`pagination-pageButton ${isCur ? 'current' : ''}`}>
                {
                  isCur
                  ? <span><span className='show-for-sr'></span>{i}</span>
                  : <Link to={getPagePath(i)}
                          aria-label={`Page ${i}`}>
                      {i}
                    </Link>
                }
            </li>
          );
          break;
        default:
      }
    }

    currentPage < pageCount && pageButtonArray.push(
      <li key={`page_next`}
          className={`pagination-pageButton pagination-next`}>
          <Link to={getPagePath(currentPage+1)}
                aria-label='Next page'>
            Next
          </Link>
      </li>
    )

    return pageButtonArray;
  }

  return(
    <div className = 'pagination-wrap'>
      <span className = 'first-page'> <i className='icofont iconfont-double-left'></i> </span>
      <ul className='pagination' role='navigation' aria-label='Pagination'>
        {renderPageButtons(pageCount, currentPage)}
      </ul>
      <span className = 'last-page'> <i className='icofont iconfont-simple-right'></i>  </span>
    </div>
  )
  function disableLink(e){
    e.preventDefault();
  }
}

export function PageRange(props){
  let   { count=0,
          limit=10,
          activePage=1,
          singularItem='item',
          pluralItem='items'} = props;

  count = Number(count);
  limit = Number(limit);
  activePage= Number(activePage);
  const pageCount = Math.ceil(count/limit);

  const pageStart = ((activePage-1) * limit) + 1,
        lastPage = pageCount == activePage? true: false,
        lastPageEnd = ((activePage-1) * limit) + (count % limit !== 0? count % limit: limit),
        pageEnd =  lastPage? lastPageEnd: activePage * limit;
  const pageRange = pageStart == pageEnd? `${pageStart}-${lastPageEnd}`: `${pageStart}-${pageEnd}`
  return(
    <Heading textAlign='left'>
      {`Showing ${pageRange} of ${count} ${count===1 ?singularItem :pluralItem}`}
    </Heading>
  )
}

const styles = {
  paginationWrap: {
    width: '100%',
    backgoundColor: '#FFFFFF',
  },

}
