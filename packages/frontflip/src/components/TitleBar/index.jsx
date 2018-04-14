import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';


class TitleBar extends Component{
  constructor(props){
    super(props);
  }


  render(){

    // console.log(this.context)

    const { title = ' My Account',
            children,
            logo,
            noBackArrow, } = this.props;

    const backArrow = (
      <button   className = 'icon-button'
                onClick = {this._handleBackNav.bind(this)}>

        <i className = 'icofont icofont-rounded-left title-bar-nav'> </i>

      </button>
    );

    const logoArea = (
      <Link to='/'><div className='logo-area'></div></Link>
    )

    // console.log(this.context.router);
    return (
      <div className = 'title-bar'>

        <div className='titlebar-left'>
          {logo && logoArea}
          {noBackArrow? null: backArrow}
          <span className = 'title-bar-text'>{title}</span>
        </div>

        <div className='titlebar-right'>
          {children}
        </div>
      </div>
    );
  }

  _handleBackNav(){
    this.context.router.goBack();
  }
}

TitleBar.contextTypes = {
  router: PropTypes.object.isRequired,
}


export default TitleBar;
