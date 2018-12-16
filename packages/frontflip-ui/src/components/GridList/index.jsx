import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    
}

function GridList(props) {
    return (
        <ul className='gridList'>
            {
                props.heading && <li className='gridList-heading'>{props.heading}</li>
            }
            {
                props.data
                ?   props.data.map((d, i)=>(
                    <GridListItem  key={`grid-item-${i}`} label={d.key} value={d.value}/>
                    ))
                :   props.children
            }
            {
                props.footer && <li className='gridList-footer'>{props.footer}</li>
            }
        </ul>
    )
}

GridList.propTypes = propTypes

export function GridListItem(props){
    return(
        <li className='gridList-item'>
            <span className='gridList-item-key'>{props.label}</span>
            <span className='gridList-item-value'>{props.value}</span>
        </li>
    )
}

export default GridList
