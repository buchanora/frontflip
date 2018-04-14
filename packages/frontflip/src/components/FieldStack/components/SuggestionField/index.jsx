import    React, { Component } from 'react';
import    PropTypes from 'prop-types';
import Downshift from 'downshift';

export default class SuggestionField extends Component{
  constructor(props){

    super(props);

    this.state = {
      dropdownVisible: false,
      inputValue: '',
      selectIndex: 0,
    }

    this._handleFieldFocus = this._handleFieldFocus.bind(this);
    this._handleFieldBlur = this._handleFieldBlur.bind(this);
    this._handleChangeValue = this._handleChangeValue.bind(this);
    this._handleDropdownOptionClick = this._handleDropdownOptionClick.bind(this);
    this._changeDropdownVisibility = this._changeDropdownVisibility.bind(this);
    this._selectOption = this._selectOption.bind(this);

  }
  render(){
    const { suggestions=[],
            value='',
            onSelect,
            placeholder,
            onChange,
            getSuggestionString,
            className, } = this.props;

    const suggestionsMap = suggestions.length > 0 && suggestions.map((item, index)=>(
        <span className='suggestionField-option'
              key={`selectOption_${index}`}
              onClick={this._handleDropdownOptionClick.bind(null, index, item)}>
                {getSuggestionString(item)}
        </span>
      )
    );

    const showOption = this.state.dropdownVisible === true
                      ? 'suggestionField-show-dropdown'
                      : 'suggestionField-hide-dropdown';

    return(
            <div  ref={elm=>{this.selectRef=elm}}
                  // onBlur={this._handleFieldBlur}
                  className={`${ className } suggestionField`}
                  tabIndex={1}>

                  <input  className='suggestionField-input'
                          value={value|| this.state.inputValue}
                          placeholder={placeholder}
                          onChange={this._handleChangeValue}/>

                  <div  ref={elm=>{this.dropdownRef=elm}}
                        onBlur={this._handleFieldBlur}
                        tabIndex={2}
                        className={`suggestionField-dropdown ${showOption}`}>

                        {suggestionsMap}

                  </div>

            </div>
    );
  }
  _handleChangeValue(event){
    const value = event.target.value;
    const loadSuggestions = (suggestions)=>{
      if(suggestions.length>0){
        this._changeDropdownVisibility(true);
      }else{
        this._changeDropdownVisibility(false);
      }
    }
    this.props.onChange && this.props.onChange(event, loadSuggestions);
    this.setState((curState)=>{
      return{
        inputValue: value
      }
    });
  }
  _handleFieldFocus(){
    this._changeDropdownVisibility(true);
    this.dropdownRef.focus();
  }
  _handleFieldBlur(){
    this._changeDropdownVisibility(false);
  }
  _handleDropdownOptionClick(index, item){
    this._selectOption(index, item);
    this._changeDropdownVisibility(false);
    this.props.onSelect && this.props.onSelect(this.props.suggestions && this.props.suggestions[index] || 0)
  }
  _changeDropdownVisibility(visibility, event){
    this.setState((curState)=>{
      return{
        dropdownVisible: visibility
      }
    });
  }
  _selectOption(index, event){
    this.setState({
      inputValue: this.props.getSuggestionString(this.props.suggestions[index]),
      selectIndex: index
    });
  }
}
SuggestionField.defaultProps={
          suggestions: [],
          onOptionClick: (option) => {console.log('Option: ' +  option.name + ' clicked');},
          placeholder: 'Suggestion',
          onChangeValue: (value) => {console.log(value)},
          className :''
}
