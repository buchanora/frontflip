import    React, { Component } from 'react';
import    PropTypes from 'prop-types';

export default class SelectButton extends Component{
  constructor(props){

    super(props);

    this.state = {
      dropdownVisible: false,
      selectValue: null,
    }

    this._handleSelectButtonFocus = this._handleSelectButtonFocus.bind(this);
    this._handleSelectButtonBlur = this._handleSelectButtonBlur.bind(this);
    this._handleDropdownOptionClick = this._handleDropdownOptionClick.bind(this);
    this._changeDropdownVisibility = this._changeDropdownVisibility.bind(this);
    this._selectOption = this._selectOption.bind(this);
  }
  render(){
    const { label='label',
            value,
            options = [{name: 'Option One', value: 'option1'}],
            onOptionClick = ()=>{} }= this.props;

    const optionsMap = options.map((item, index)=>{
      return(
        <span className='selectButton-option'
              key={`selectOption_${index}`}
              onClick={this._handleDropdownOptionClick.bind(null,index)}>
                {item.name}
        </span>
      )
    });

    const getSelectButtonText = (selectValue, optionsArray)=>{
      if(selectValue) return optionsArray[selectValue] && optionsArray[selectValue].name
      const saved = optionsArray.find(option=>option[ option.id? 'id' :'value'] === value)
      if(saved) return saved.name || saved.label
    };
    const showOption = this.state.dropdownVisible === true
                      ? 'show-dropdown'
                      : 'hide-dropdown';

    return(
      <div  className='selectButton'
            ref={elm=>this.selectRef=elm}
            tabIndex={1}>


            <button   className={`selectButton-button ${showOption}`}
                        onClick={this._handleSelectButtonFocus}>
                  <div className='selectButton-label'>{label}</div>
                  {getSelectButtonText(this.state.selectValue, options)}
                  <i className='icofont icofont-simple-down'></i>
            </button>

            <div   className={`selectButton-dropdown ${showOption}`}
                      ref={elm=>this.dropdownRef=elm}
                      onBlur={this._handleSelectButtonBlur}
                      tabIndex={2}>

                {optionsMap}

            </div>

      </div>
    );
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
