import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from "../Icon/";

class Notice extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    const {close} = this.props;
    this.timer = setTimeout(()=>{
      close(null);
    },5000)
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  render(){
    const { children,
            close,
            message,
            shrink,
            style,
            time,
            type  } = this.props;
    const noticeWidth = shrink && 'shrink-Notice';
    const classes = `notice-${style || 'alert'} notice-${type || 'default'}`
    // console.log(message);
    return(
      <div className = {'notice' + ' ' + noticeWidth + ' ' + classes}>
        <span><Icon className='close-line' onClick={close.bind(null,null)}/></span>
        <span className='notice-message'>{message ||children}</span>
      </div>
    );
  }
}

Notice.proptypes = {
  message: PropTypes.string,
  close: PropTypes.func,
  duration: PropTypes.number,
  type: PropTypes.oneOf(['toast', 'flank', 'peep', 'default']),
  style: PropTypes.oneOf(['success', 'failure', 'alert', 'warning', 'notice'])
}

export default Notice;
