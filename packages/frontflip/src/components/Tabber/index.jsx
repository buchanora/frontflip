import React, {Component} from 'react';

export default class Tabber extends Component{

  constructor(props){
    super(props);
    this.state = {
      activeTab: 0
    }
    this._handleSwitchTab = this._handleSwitchTab.bind(this);
  }

  render(){

    const { tabMenus=[],
            tabContent=[],
            style = 'side'} = this.props;

    const activeTab = this.state.activeTab;

    const tabs = tabMenus.map((item,index)=>(
      <li className={`${activeTab === index && 'tabber-tab-active'} tabber-tab`}
          onClick={this._handleSwitchTab.bind(null, index)}
          key={`tab_${index}`}>
        <span className='tabber-tab-content'>
          <i className={`${item.iconClass || ''} tabber-tab-icon`}></i>
          <div className={`${activeTab == index ?'show-tab-shield' :'hide-tab-shield'} tab-shield`}></div>
          <span >{item.text}</span>
        </span>
      </li>
    ));

    return(
      <div className={`tabber clearfix ${style}-tabber`}>
        <ul className='tabber-menu'>{tabs}</ul>
        <div className='tabber-content'>{tabContent[activeTab]}</div>
      </div>
    );
  }

  _handleSwitchTab(index){
    this.setState({
      activeTab: index
    })
  }
}
