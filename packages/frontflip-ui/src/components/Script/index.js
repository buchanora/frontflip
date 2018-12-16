import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

class Script extends Component {

    componentDidMount(){
        this.script = document.createElement('SCRIPT');
        this.props.src && (this.script.src = this.props.src)
        this.props.async && (this.script.async = this.props.async)
        this.script.text = this.props.run || (()=>{console.log('runing inserted script tag')})()
        this.body = document.getElementsByTagName('body')[0];
        this.body.insertBefore(this.script, this.body.childNodes[0])
    }
    componentWillUnmount(){
        this.body.removeChild(this.script)
    }
    render() {
        return null;
    }
}

Script.propTypes = {
    src: PropTypes.string,
    text: PropTypes.string,
    async: PropTypes.bool
}

export default  Script;
