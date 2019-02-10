import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

class Scroller extends Component {

    componentDidMount(){
        window.scrollTo(this.props.v || 0, this.props.h || 0)
    }
    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){
            window.scrollTo(this.props.v || 0, this.props.h || 0)
        }
    }
    render() {
        return (
            this.props.children
            || null
        )
    }
}

Scroller.propTypes ={
    v: PropTypes.number,
    h: PropTypes.number
}

export default  withRouter(Scroller)
