import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { PropTypes } from 'prop-types';
import { imageBackground } from '../../resources/styles.common';

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 0
    }
  }
  componentDidMount(){
    const imageCount = this.props.images.length;
    const { activeImage } = this.state;
    const setState = this.setState;

    this.slider = setInterval(()=>{
      this.setState(curState=>({
        activeImage: curState.activeImage < imageCount-1 ? curState.activeImage+1 : 0
      }))
    }, 10000)
  }
  componentWillUnmount(){
    clearInterval(this.slider)
  }
  render() {
    return (
      <div  className={`hero ${this.props.images || 'hero-gradient'}`}
            style={this.props.images[0] && {backgroundImage: `url(${this.props.images[this.state.activeImage]})`,...imageBackground }}>
            
        <div  className={`${this.props.images  && 'hero-image'}`}
                style={this.props.images[0] && {backgroundImage: `url(${this.props.images[this.state.activeImage]})`,...imageBackground }}>
            <div className='hero-callout'>{this.props.text || ' '}</div>
        </div>
        {
          
          this.props.children && (
            <div className='hero-searchWrapper'>
              {this.props.children}
            </div>
          )
        }
      </div>
    );
  }
}
Hero.propTypes = {
};
