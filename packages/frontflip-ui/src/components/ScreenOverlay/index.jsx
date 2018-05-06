import React, {Component} from 'react';

export default class ScreenOverlay extends Component{
  render(){
    const { children,
            visible,
            style,
            onClick = ()=>{console.log('Hide Overlay')}, } = this.props;

    return(
        visible && <div className={`overlay-backdrop ${style==='light' ?'light' :'dark'}`} onClick={this._handleOverlayClick.bind(this)}></div>
    );
  }
  _handleOverlayClick(){
    this.props.onClick();
  }
}
