import React, {Component} from 'react';

export default class ActionSheet extends Component{
  constructor(props){
    super(props);
    this._toggleDropdownVisibility = this._toggleDropdownVisibility.bind(this);
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    this._handleTriggerBlur = this._handleTriggerBlur.bind(this);
    this._handleTriggerFocus =this._handleTriggerFocus.bind(this);
    // this._dropdownRef = this._dropdownRef.bind(this);
  }
  componentWillMount(){
    this.setState({
      dropdownVisible: false,
    })
  }
  render(){
    const { wrapperClass,
            wrapperStyle,
            triggerClass,
            triggerStyle,
            trigger,
            dropdownClass,
            dropdownStyle,
            dropdown} = this.props;
    return(
      <ActionSheetWrapper className={wrapperClass}
                          style={wrapperStyle}>
        {this.state.dropdownVisible && <span className='trigger-mask'></span>}

        <ActionSheetTrigger onTriggerClick={this._handleTriggerClick}
                            visible={this.state.dropdownVisible}
                            className={triggerClass}
                            style={triggerStyle}>
                {trigger}
        </ActionSheetTrigger>

          <ActionSheetDropdown  className={dropdownClass}
                                // onClick={this._handleDropdownClick}
                                onBlur = {this._handleTriggerBlur}
                                visible={this.state.dropdownVisible}
                                style={dropdownStyle}>
            {dropdown}
          </ActionSheetDropdown>


      </ActionSheetWrapper>

    )
  }
  _toggleDropdownVisibility(value){
    this.setState({
      dropdownVisible: value,
    })
    // if (value) this.dropdownRef.focus()
    // console.log(this.dropdownRef);
  }

  _handleTriggerClick(){

    if(!this.state.dropdownVisible){
      // console.log(this.dropdown.focus)
      this._handleTriggerFocus()
      // console.log('trigger Clicked to focus');
    }else{
      this._handleTriggerBlur()
      // console.log('trigger Clicked to blur');
    }
  }
  _handleTriggerFocus(){
    // console.log('focused');
    this._toggleDropdownVisibility(true);
  }
  _handleTriggerBlur(event){
    // event.stopPropagation();
    this._toggleDropdownVisibility(false);
    // console.log('blurring');
  }
}


export class ActionSheetDropdown extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    // this.dropdownRef.focus();
    // console.log(this.dropdownRef.focus());
  }
  componentDidUpdate(){
    this.props.visible && this.dropdownRef.focus();
  }
  render(){
    const { children,
            className,
            onBlur,
            visible,
            style } = this.props;
    return(
      visible
      ?<div  className={`action-sheet-dropdown ${className}`}
                style={style}
                onBlur={onBlur}
                onClick={onBlur}
                tabIndex={1}
                ref={(elm)=>{this.dropdownRef=elm}} >
        {children}
      </div>
      :<span></span>
    )
  }
}

export function ActionSheetTrigger(props){
  const { children,
          className,
          style,
          visible,
          onTriggerClick,
          onBlur } = props;
  return (
    <div className={`action-sheet-trigger ${className}`}
            style={style}
            onFocus={_handleClick}
            onBlur={onBlur}
            tabIndex={1}>
      {children}
    </div>
  )
  function _handleClick(event){
    !visible && onTriggerClick()
  }
}

export function ActionSheetWrapper(props){
  const { children,
          className,
          style } = props;
  return(
    <div  className={`action-sheet-wrapper ${className}`}
          style={style}>
      {children}
    </div>
  )
}
