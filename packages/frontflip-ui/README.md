# Overview
Frontflip-ui is a collection of high level widgets, low level components/elements and render utilities that help speed up your [React](https://facebook.github.io/react) frontend development workflow.

##Instalation
`npm install frontflip-ui`

## Components/Elements

### Button
#### Basic Example
```
...
    import {Button} from frontflip-ui;

    Button  label='Discover More'
            onClick={ event=>{} }
            style='SOLID_PRIMARY' />

    <Button label='Discover More'  
            type='LINK' 
            to={`events/all`}
            style='HOLLOW_PRIMARY' />
```

#### props
```
  className: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  pair: PropTypes.bool,
  type: PropTypes.oneOf(['LINK', 'SUBMIT']),
  to: PropTypes.string,
  style: PropTypes.oneOf([
    'SOLID_PRIMARY', 
    'SOLID_SECONDARY', 
    'SOLID_NEUTRAL', 
    'HOLLOW_PRIMARY', 
    'HOLLOW_SECONDARY', 
    'HOLLOW_NEUTRAL'
  ]),
  label: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  size: PropTypes.oneOf(['SMALL', 'MEDIUM', 'LARGE']),
  expand: PropTypes.bool,
  margin: PropTypes.bool,
  onClick: PropTypes.func
```

## Widgets

## Render Utilities

