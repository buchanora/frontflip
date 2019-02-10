import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Button} from '../src/index';

storiesOf('Button', module)
  .add('Default', () => (
    <Button  label='Solid Primary' 
                onClick={action('clicked')}/>
  ))
  .add('With Icon', () => (
    <Button  label='Solid Primary' 
                onClick={action('clicked')}/>
  ))
  .add('Loading', () => (
    <Button  label='Solid Primary' 
                onClick={action('clicked')}/>
  ))
  .add('Disabled', () => (
    <Button  label='Solid Primary' 
                onClick={action('clicked')}/>
  ))