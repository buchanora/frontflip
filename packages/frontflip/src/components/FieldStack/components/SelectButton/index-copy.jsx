import    React, { Component } from 'react';
import    PropTypes from 'prop-types';

export default class SelectButton extends Component{
  constructor(props){

    super(props);

    this.state = {
      dropdownVisible: false,
      selectValue: 0,
    }

    this._handleSelectButtonFocus = this._handleSelectButtonFocus.bind(this);
    this._handleSelectButtonBlur = this._handleSelectButtonBlur.bind(this);
    this._handleDropdownOptionClick = this._handleDropdownOptionClick.bind(this);
    this._changeDropdownVisibility = this._changeDropdownVisibility.bind(this);
    this._selectOption = this._selectOption.bind(this);
  }
  render(){
    const { label='label',
            options = [{name: 'Option One', value: 'option1'}],
            onOptionClick = (option)=>{console.log('Option: ' +  option.name + ' clicked');}} = this.props;

    const optionsMap = options.map((item, index)=>{
      return(
        <span className='selectButton-option'
              key={`selectOption_${index}`}
              onClick={this._handleDropdownOptionClick.bind(null,index)}>
                {item.name}
        </span>
      )
    });

    const getSelectButtonText = (selectValue, optionsArray)=>{return optionsArray[selectValue].name};
    const showOption = this.state.dropdownVisible === true
                      ? 'selectButton-show-dropdown'
                      : 'selectButton-hide-dropdown';

    return(
      <div  className='selectButton'
            ref={elm=>this.selectRef=elm}
            tabIndex={1}>

          {this.state.dropdownVisible===true
            &&  <button className='selectButton-buttonMask' onClick={this._handleSelectButtonBlur}>
                  {getSelectButtonText(this.state.selectValue, options)}
                  <i className='icofont icofont-simple-up'></i>
                </button>}

          <button   className='selectButton-button'
                    onClick={this._handleSelectButtonFocus}>
            {getSelectButtonText(this.state.selectValue, options)}
            <i className='icofont icofont-simple-down'></i>
          </button>

        <div  className={`selectButton-dropdown ${showOption}`}
              ref={elm=>this.dropdownRef=elm}
              onBlur={this._handleSelectButtonBlur}
              tabIndex={2}>

          {optionsMap}

        </div>

      </div>
    )
  }
  _handleSelectButtonFocus(event){
    event.preventDefault()
    this._changeDropdownVisibility(true);
    this.dropdownRef.focus();
  }
  _handleSelectButtonBlur(){
    this._changeDropdownVisibility(false);
  }
  _handleDropdownOptionClick(val){
    this._selectOption(val);
    this._changeDropdownVisibility(false);
  }
  _changeDropdownVisibility(visibility, event){

    this.setState((curState)=>{
      return{
        dropdownVisible: visibility
      }
    });

  }
  _selectOption(val, event){

    this.setState({
      selectValue: val
    });
    this.props.onOptionClick && this.props.onOptionClick(this.props.options && this.props.options[val] || 0)

  }
}
