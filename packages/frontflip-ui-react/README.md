> WARNING this document is a work in progress and ight not accurately reflect the state of this package.
# Overview
Frontflip-ui-react is a collection of React components that map to all the ui elements and widgets found in the [Frontflip-ui](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-ui) CSS framework. It also contains several higher order functions and other render utilities that help speed up your [React](https://facebook.github.io/react) frontend development workflow.

## Instalation
`npm install frontflip-ui-react`

## Components

### Button
#### Usage
```
...
    import {Button} from frontflip-ui-react;

    <Button  label='Discover More'
            onClick={ event=>{} }
            style='SOLID_PRIMARY' />
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

## Development
### Local Installation Steps
1. Clone the mono repo
```bash
git clone git@github.com:buchanora/frontflip.git
```
2. Link frontflip-ui package
```bash
cd <path/to/frontflip>/packages/frontflip-ui
npm install
npm link
```
3. Link frontflip-ui-react package to frontflip-ui
```bash
cd <path/to/frontflip>/packages/frontflip-ui-react
npm install
npm link frontflip-ui
```
4. Compile src and watch 
```bash 
npm run watch
```

4. Launch Story Book 
```bash 
npm run storybook
```

