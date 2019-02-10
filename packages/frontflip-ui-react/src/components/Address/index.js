import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {TextField, FieldGroup, OptionTextField} from '../FieldStack/';
import {Section, Padding, Block} from '../Scaffold';
import Button from '../Button/';
import {countries} from '../../data/country';

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount(){
    this.setState({
        name: this.props.values.name ||'',
        street1: this.props.values.street1 ||'',
        street2: this.props.values.street2 ||'',
        country: this.props.values.country ||'',
        state: this.props.values.state ||'',
        city: this.props.values.city ||'',
        zip: this.props.values.zip ||'',
    })
  }
  state = {
      name: '',
      street1: '',
      street2: '',
      country: '',
      state: '',
      city: '',
      zip: '',
  }

  render() {

    const { label={},
            type='',
            values={},
            onCancel,
            onSave, } = this.props;

    return (
      <Section>
        <Padding>

          {
            type === 'place'
            && <TextField label='Location Name'
                          value={ this.state.name}
                          onChange={this._handleChangeValue.bind(this, 'name')}/>
          }
          <FieldGroup>
            <TextField  label='Street'
                        value={this.state.street1}
                        onChange={this._handleChangeValue.bind(this, 'street1')}/>
            <TextField  label='Street Line 2 (Optional)'
                        value={this.state.street2}
                        onChange={this._handleChangeValue.bind(this, 'street2')}/>
          </FieldGroup>
          <FieldGroup>
            <TextField  label='City or Province'
                        value={this.state.city}
                        onChange={this._handleChangeValue.bind(this, 'city')}/>
            <TextField  label='State'
                        value={this.state.state}
                        onChange={this._handleChangeValue.bind(this, 'state')}/>
            <TextField  label='ZIP code'
                      value={this.state.zip}
                      type='number'
                      onChange={this._handleChangeValue.bind(this, 'zip')}/>
          </FieldGroup>
          <OptionTextField  label='Country'
                      options={countries.map(c=>c.name)}
                      value={this.state.country}
                      onChange={this._handleChangeValue.bind(this, 'country')}/>
          
        </Padding>

        <Padding top30>
          <div>
            {onCancel && <Button    pair={onSave? true : false}
                                    text='Cancel'
                                    style='hollowSecondary'
                                    onClick={onCancel}/>}
            {onSave && <Button    pair={onCancel? true : false}
                                  text='Save Address'
                                  onClick={this._handleSaveAddress.bind(this)} />}
          </div>
          
        </Padding>

      </Section>
    );
  }
  _handleChangeValue(key, event){
    // console.log(key);
    // console.log(this.state);
    const value = event.target.value
    this.props.onChange && this.props.onChange(key, value)
    this.setState({
      [key]: value
    });
  }
  _handleSaveAddress(){
    this.props.onSave(this.state)
  }
}

Address.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.string,
  values: PropTypes.object,
  labels: PropTypes.shape({
    locationName: PropTypes.string,
    streetLine1: PropTypes.string,
    streetLine2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    zip: PropTypes.string,
    save: PropTypes.string,
  }) 
};
