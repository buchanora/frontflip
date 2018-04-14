import    React, {Component} from 'react';

export default class SelectFieldSet extends Component{
  constructor(props){
    super(props);

    this.state = {
      dropdownVisible: false
    }

    this._handleDropdownTriggerClick = this._handleDropdownTriggerClick.bind(this);
    this._handleDropdownOptionClick = this._handleDropdownOptionClick.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  render(){
    const { name = ' ',
            disabled = false,
            selection={},
            type = 'select-box',
            value = '',
            style='box',
            options = [],
            onChange = ()=>{},
            onSubmitEditing = ()=>{},
            label = ' ',
            required = false  } = this.props;
            // console.log(selection);


    const optionList = options.map( (option, index)=>{
      // console.log(option.value);
      if (style==='dropdown'){
        return <SelectListItem    key={`check-${index}`}
                                  checkerType='sphere'
                                  value={option.value}
                                  disabled={disabled}
                                  checked={selection[option.value]? true: false}
                                  parent={name}
                                  content={option.name}
                                  onChange={this._handleDropdownOptionClick.bind(null, option)}/>
      }
      if(style==='button'){
          return <SelectBox  key={`check-${index}`}
                                checkerType='sphere'
                                value={option.value}
                                iconClass={option.iconClass}
                                disabled={disabled}
                                checked={selection.value === option.value? true: false}
                                parent={name}
                                name={option.name}
                                onChange={onChange.bind(null, option)}/>
      }
      return <SelectOption    key={`check-${index}`}
                              checkerType='sphere'
                              value={option.value}
                              disabled={disabled}
                              checked={selection[option.value]? true: false}
                              parent={name}
                              name={option.name}
                              onChange={onChange.bind(null, option)}/>
    });

    function renderField(style, dropdownVisible, handleDropdownTriggerClick){
      if (style === 'dropdown'){
        return(
          <div>

            { !dropdownVisible &&
              <div onClick={handleDropdownTriggerClick}>
                <span className='select-field'>{value ? value : 'Not Selected'}</span>
                <span className='select-caret icofont icofont-rounded-down'></span>
              </div>
            }

            {dropdownVisible && optionList}

          </div>
        )
      }

      return optionList
    }

    return (
      <fieldset className={`select-group ${style==='dropdown' ?'select-list' :'select-grid'}`}>
        <legend className='select-label'>{label}</legend>
        {renderField(style, this.state.dropdownVisible, this._handleDropdownTriggerClick)}
      </fieldset>
    );

  }
  _handleDropdownTriggerClick(){
    this.toggleDropdown()
  }
  _handleOptionClick(value, event){

    this.props.onChange(value);
    this.props.style === 'dropdown' && this.toggleDropdown()
  }
  _handleDropdownOptionClick(value, event){

    this.props.onChange(value);
    this.toggleDropdown()
  }
  toggleDropdown(){
    this.setState((curState)=>{
      return {
        dropdownVisible: !curState.dropdownVisible,
      }
    })
  }
}

export class MultiSelectFieldSet extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const {options=[], values={}} = this.props;
    let optionState = {};
    options.forEach((option)=>{
      optionState[option.name] = values[option.name] || false
    })
    this.setState(optionState)
    // console.log(values);
  }
  componentWillReceiveProps(newProps){
    let options = {};
    // console.log(newProps)
    for (let value in newProps.values){
      options[newProps.values[value]] = true
    }
    this.setState(options)
  }

  _handleCheckStateChange = (optionValue)=>{
    this.setState((curState)=>({
      [optionValue]: !curState[optionValue]
    }))
    this.props.onChange(optionValue)
    // console.log(optionValue);
  }
  render(){
    const { name = ' ',
            disabled = false,
            style='check', //one of check, dropdown or button
            values={},
            options = [],
            onChange = ()=>{},
            onSubmitEditing = ()=>{},
            label = ' ',
            required = false  } = this.props;

    const optionList = options.map( (option, index)=>{
      // console.log(this.state[option.value]+ ' for '+option.name)
      if(style==='dropdown'){
          return <SelectListItem  key={`check-${index}`}
                                  checkerType='tick'
                                  value={option.value}
                                  disabled={disabled}
                                  checked={this.state[option.name]}
                                  parent={name}
                                  content={option.value}
                                  onChange={this._handleCheckStateChange.bind(null, option.name)}/>
      }
      if(style==='button'){
          return <SelectBox     key={`check-${index}`}
                                checkerType='tick'
                                value={option.value}
                                iconClass={option.iconClass}
                                disabled={disabled}
                                checked={this.state[option.name]}
                                parent={name}
                                name={option.name}
                                onChange={this._handleCheckStateChange.bind(null, option.name)}/>
      }
      return(
        <SelectOption     key={`check-${index}`}
                          checkerType='tick'
                          value={option.value}
                          disabled={disabled}
                          checked={this.state[option.name]}
                          parent={name}
                          name={option.name}
                          onChange={this._handleCheckStateChange.bind(null, option.name)}/>
      );
    })
    return (
      <fieldset className={`select-group ${style==='dropdown' ?'select-list' :'select-grid'}`}>
        <legend className = 'select-label'>{label}</legend>
        {
          optionList
        }
      </fieldset>
    );
  }

}


export function SelectOption(props){

  const { disabled,
          checkerType,
          value,
          name,
          parent,
          checked,
          onChange } = props;

  const disabledStateClass = disabled && 'select-option-disabled',
        checkedStateClass = checked && 'select-option-checked';
  return(
    <span     className={`select-option ${checkedStateClass} ${disabledStateClass}`}
              onClick={disabled || onChange}>

        <Checker style={checkerType} checked={checked} disabled={disabled}/>
        {name}

    </span>
  )
}

export function SelectBox(props){

  const { disabled,
          checkerType,
          value,
          name,
          iconClass,
          parent,
          checked,
          onChange} = props;

  const disabledStateClass = disabled? 'select-button-disabled' : '',
        checkedStateClass = checked? 'select-button-checked' : '';

  return(
    <span     className={`select-button ${checkedStateClass} ${disabledStateClass} `}
              onClick={disabled || onChange}>

        <i className={iconClass}></i>
        {name}

    </span>
  );

}
export function SelectListItem(props){

  const { disabled,
          checkerType,
          content,
          parent,
          checked,
          onChange} = props;

  const disabledStateClass = disabled && 'select-list-item-disabled',
        checkedStateClass = checked && 'select-select-list-checked';

  return(
    <div     className={`select-list-item ${checkedStateClass} ${disabledStateClass}`}
             onClick={disabled || onChange}>

        <span className='select-list-item-checker'>
          <Checker style={checkerType} checked={checked} disabled={disabled}/>
        </span>

        <span className='select-list-item-content'>
          {content}
        </span>

    </div>
  );

}

export function Checker(props){
  const { disabled,
          onChange,
          checked=false,
          style='sphere' } = props;

  const disabledStateClass = disabled && 'checker-disabled',
        checkedStateClass = checked && 'checker-checked';

  function setStyleClass(style, checked){
    if(style==='tick'){
      return checked? 'checker-box icofont icofont-check' :'checker-box icofont icofont-close';
    }
    if(style==='sphere'){
      return checked? ' checker-sphere checker-sphere-checked' :'checker-sphere checker-sphere-checked';
    }
  }

  return(
    <span  className={`checker ${checkedStateClass} ${disabledStateClass} ${setStyleClass(style, checked)}`}
            onClick={_handleCheckedStateChange.bind(null, checked)}>
    </span>
  );
  function _handleCheckedStateChange(checkedState){
    if(onChange){
      onChange(!checkedState);
    }
  }

}
