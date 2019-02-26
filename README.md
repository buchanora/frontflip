# Frontflip
> This repo and all it sub-packages are undergoing active development. As a result APIs are likely to change without any prior notification.

Frontflip is a collection of CLI utilities, UI components & architectural conventions for developing modern frontend applications with [React](https://facebook.github.io/react).

This serves as a mono repo for the following packages:
1. [**frontflip-cli**](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-cli)
2. [**frontflip-ui**](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-ui)
3. [**frontflip-ui-react**](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-ui-react)
4. [**frontflip-scripts-react**](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-scripts-react)
5. [**frontflip-utils**](https://github.com/buchanora/frontflip/tree/master/packages/frontflip-utils)
## Overview
## Frontflip CLI
Frontlip framework is made up of several inter-dependent repos as well as several standlone ones. The easiest way to get started with Frontflip is using the CLI. If you are starting a new project you can use the *Frontflip-cli* to configure and generate custom boilerplates for your project, modules, pages, components and many more. 
Frontflip can develop project boilerplates for the following frameworks/libraries.
1. **ReactJS** 
> *We have plans for more boilerplate generators in the development Roadmap*.
### Installation
`npm install -g frontflip-cli`
### Usage
run `flip init <project name>` and follow the prompt to generate the project boilerplate

## Development
### Local Installation Steps
1. Clone the mono repo
```bash
Git clone git@github.com:buchanora/frontflip.git
```
2. Link frontflip-scripts
```bash
cd <path/to/frontflip>/packages/frontflip-scripts
npm install
npm link
```
3. Link frontflip-cli package
```bash
cd <path/to/frontflip>/packages/frontflip-cli
npm install
npm link
```
4. You can now use the cli by running 
```bash 
flip create <projectname> -d
```
### Repo Structure
All frontflip repos can be found in the *packages* directory.

