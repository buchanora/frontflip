import React from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader/'
import {Meta} from '../TypeDeck/'

const propTypes = {
    
}

function LoadingPage(props) {
    return (
        <div className='loadingPage'>
            <Loader className='loadingPage-loader'/>
            {
                props.label && <Meta>{props.label}</Meta>
            }
        </div>
    )
}

LoadingPage.propTypes = propTypes

export default LoadingPage
