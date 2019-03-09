import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Button} from '../src/index';
import DisplayDecorator from './DisplayDecorator';

storiesOf('Button', module)
  .addDecorator(DisplayDecorator)
  .add('Default', () => (
    <Button  text='Solid Primary' 
              onClick={action('clicked')}/>
  ))
  .add('With Icon', () => (
    <Button  text='Solid Primary'
              icon='pen'
              onClick={action('clicked')}/>
  ))
  .add('Loading', () => (
    <Button  text='Solid Primary'
              loading={true}
              onClick={action('clicked')}/>
  ))
  .add('Disabled', () => (
    <Button  text='Solid Primary'
              disabled={true}
              onClick={action('clicked')}/>
  ))