import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {TextField} from '../src/index';

storiesOf('TextField', module)
  .add('without value (uncontrolled)', () => (
    <TextField  label='My Text Field' 
                onChange={action('changed')}/>
  ))
  .add('with value (controlled)', () => (
    <TextField  label='My Text Field' 
                value="We are taking control"
                onChange={action('changed')}/>
  ));  