import React, {Component} from 'react';

// Define and export the Input field component
export default class EditableTextField extends Component {

  constructor(props){
    super(props);
    this.state = {
      focused: false,
      editing: false,
    };
    this._handleActivateEditing = this._handleActivateEditing.bind(this);
    this._handleSubmitEditing = this._handleSubmitEditing.bind(this);
  }

  render(){
    // destructure props from this.props
    let { index,
          active,
          defaultfieldValue,
          fieldName,
          fieldType      ='text',
          labelText     = 'label',
          fieldValue     = 'value',
          error,
          multiline = false,
          onChangeText = () => {console.log(`editing`)},
          onSubmitEditing = () => {console.log(`submited`)}, } = this.props;


    // Create Error text for input fields
    const displayError = (
      error && <Text style={[styles.errorMessage]}>{error}</Text>
    );

    const displayMode = (
      <div ref={(text) => {this['text_' + index] = text; }}
                                onClick = {this._handleActivateEditing.bind(null, index)}>

          <span   style = {styles.editableText}>
            {/* Field */}
            {fieldValue || defaultfieldValue}
          </span>


      </div>
    );

    const editingMode = (
      <input  autoFocus={true}
              type = {fieldType}
              ref={(input) => {this['input_' + index] = input; }}
              onChange = {onChangeText}
              onSubmit = {this._handleSubmitEditing.bind(null, index)}
              style = {styles.editableInput}
              value = {fieldValue}
              defaultvalue= {defaultfieldValue} />
    );

    // Return the Input field component
    return (
      <div style={styles.editableGroup}>

        <span style = { styles.label }>
          {labelText}
        </span>

        {this.state.editing || this.state.focus? editingMode: displayMode}

        <div style = {styles.errorWrap}>
          {displayError}
        </div>

      </div>
    );
  }

  _handleActivateEditing( index ){
    console.log('log editing')
    this.setState({
      editing: true,
      focused: true,
    });
    // this._handleFocus( index );
  }

  _handleSubmitEditing( index ){
    this.props.onSubmitEditing(index);
    this._handleBlur()
  }

  // Set state to make the input underline change color when input is in focus
  _handleFocus( index ){
    this.setState({
      focused: true
    });
  }

  // revert focused state when the input is out of focus
  _handleBlur( index ){
    this.props.onRevertInputFocus();
    this.setState({
      focused: false,
      editing: false,
    });
  }
}



// Input field specific styles
const styles = {
  editableGroup: {
    margin: 0,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fefefe',
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  editableText: {
    // justifyContent: 'center',
    // backgroundColor: color.lightGray,
    fontWeight: '700',
    height: '24px',
    color: '#fefefe',
    paddingTop: '0',
    paddingLeft: '0',
    paddingBottom: '0',
    paddingRight: 0,
    fontSize: '18px',
    marginTop: 0,
    marginBottom: 0,
  },
  editableInput: {
    // justifyContent: 'center',
    // backgroundColor: color.secondary,
    fontWeight: '700',
    height: 24,
    color: '#fefefe',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingRight: 0,
    fontSize: 18,
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    color: '#fefefe',
    fontSize: 12,
    paddingBottom: 6,
  },
  errorWrap: {
    height: 14,
    marginTop: 2,
  },
  errorMessage: {
    textAlign: 'right',
    color: '#fefefe',
    fontSize: 14,
  },
  editableError: {
    color: '#fefefe',
    paddingTop: 2,
    paddingBottom: 4,
    paddingLeft: 0,
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
  },
};
