// Import  modules
import  React, {
        Component,
}       from  'react';


//  A generic row section for wrapping content in a scene

const computeColor = function(_color, _shade=0){
  let colorString = '';
  if(_color) {
    colorString +=`bg-${_color}-${_shade}`;
  }
  return colorString;
}


const computePadding = function(_padding){

  const sideShorts = {top:'t', bottom: 'b', left: 'l', right: 'r'};
  let classString = '';
  for(let side in _padding){
    if(_padding.hasOwnProperty(side)){
      classString +=`p${sideShorts[side]+_padding[side]} `
    }
  }
  return classString;
}

const computeElevation = function(_l){
  let lString = '';
  if(_l){
    lString +=`elevation-${_l}`
  }
  return lString;
}

export function Section (props){

  let { justifyContent = '',
        alignItems='',
        stretchContent,
        centerText,
        container,
        axis,
        backgroundColor = null,
        fillColor,
        fillShade,
        className='',
        children,
        expand,
        padded,
        style = {} } = props;

  const setExpansion = expand ?'section-expand' : '',
        setAxis = axis==='x' ? 'section-row' : 'section-column',
        setStretch = stretchContent ? 'section-stretch': '',
        setAlign = justifyContent==='center' ? 'section-centralized' : '',
        padding = padded? 'section-padding' : '',
        contained = container ?'contained-section' :'',
        textCentered = centerText ? 'centered-text-section' : '',
        setBackgroundColor = computeColor(fillColor, fillShade);



  return (
        <div  className={ className + ' ' +
                          'section'+ ' ' +
                          contained+' '+
                          textCentered+' '+
                          setStretch +' '+
                          setExpansion +' '+
                          setBackgroundColor + ' '+
                          setAxis+' '+
                          setAlign+ ' ' +
                          padding }
              style={  {...style, backgroundColor, justifyContent: justifyContent, alignItems: alignItems} }>
            { children }
        </div>
  );
}

export function Block(props){

  let { justifyContent = '',
        alignItems='',
        alignSelf,
        fillColor,
        fillShade,
        elevation,
        padding,
        backgroundColor = null,
        expand,
        divider,
        flex,
        noPadding,
        className='',
        children,
        style = {}, } = props;

  const setExpansion = expand ?'block-expand' : '',
        setCollapse = noPadding ?'' :'block-padded',
        addDivider = divider? 'block-divider' : '',
        setFlex = flex? 'block-flex' : '',
        setBackgroundColor = computeColor(fillColor, fillShade),
        setBlockPadding = computePadding(padding),
        setElevation = computeElevation(elevation);


  return (
        <div  className={'block' + ' ' +
                          className + ' '+
                          setExpansion + ' '+
                          setCollapse + ' ' +
                          addDivider + ' '+
                          setFlex + ' '+
                          setBackgroundColor + ' '+
                          setBlockPadding + ' '+
                          setElevation}
              style={  {...style,  justifyContent: justifyContent, alignItems: alignItems, backgroundColor, alignSelf: alignSelf } }>
            { children }
        </div>
  );

}

export function Row(props){
  const { children,
          className='',
          expand=true,
          padded= false,
          style={} } = props;


  return(
    <div className={`row ${expand ?'expanded' : ''} ${padded ? '' :'collapse'} ${className} small-collapse medium-uncollapse`} style={style}>
      {children}
    </div>
  )
}

export function ContentRow(props){
  const { children,
          className='',
          expand=true,
          padded=false,
          style={} } = props;

  return(
    <div className={`row column ${expand ?'expanded' :''} ${padded ?'' : 'collapse'} ${className} small-collapse`} style={style}>
      {children}
    </div>
  )
}

export function Column(props){

  const { children, size, className='', style={} } = props;

  function generateSizeClass(size){

    switch (size) {
      case '1':
        return 'column small-12 medium-2';
        break;
      case '2':
        return 'column small-12 medium-4';
        break;
      case '3':
        return 'column small-12 medium-6';
        break;
      case '4':
        return 'column small-12 medium-8';
        break;
      case '5':
        return 'column small-12 medium-10';
        break;
      case '6':
        return 'column small-12';
        break;
      case '7':
        return 'column small-12';
        break;
      case '8':
        return 'column small-12';
        break;
      case '9':
        return 'column small-12';
        break;
      case '10':
        return 'column small-12';
        break;
      case '11':
        return 'column small-12';
        break;
      case '12':
        return 'column small-12';
        break;
      default:
        return 'column small-12';
    }
  }

  return(
    <div className={`${generateSizeClass(size)} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function GridSection(props){
  const {children, className='', columns} = props;
  return(
    <div className = {`${className} grid-section grid-section-${columns || 4}` }>
      {children}
    </div>
  )
}

export function GridBlock(props){
  const { children, index } = props;
  return(
    <div  key={`grid_block_${index}`}
          className='grid-section-item'>

      {children}

    </div>
  )
}

export function Wrap(props){
  const {children, className = ''} = props;
  const wrapSize = (props.size || 'large') + '-wrap'
  return(
    <div className={`wrap ${className} ${wrapSize}`}>
      {children}
    </div>
  );
}

export function Padding(props){
  let ChildComponent, ClonedElement;
  const propArray = [];
  for(let prop in props){
    if(props.hasOwnProperty(prop))
    propArray.push(prop)
  }

  const computeClasses = `${
                          (propArray.length > 0 ? '' :'padding ')+
                          (props.top10 ? ' pt1 ' :'')+
                          (props.top20 ? ' pt2 ': '')+
                          (props.top30 ? ' pt3 ': '')+
                          (props.top40 ? ' pt4 ': '')+
                          (props.top50 ? ' pt5 ': '')+
                          (props.top60 ? ' pt6 ': '')+
                          (props.bottom10 ? ' pb1 ' :'')+
                          (props.bottom20 ? ' pb2 ': '')+
                          (props.bottom30 ? ' pb3 ': '')+
                          (props.bottom40 ? ' pb4 ': '')+
                          (props.bottom50 ? ' pb5 ': '')+
                          (props.bottom60 ? ' pb6 ': '')+
                          (props.left10 ? ' pl1 ' :'')+
                          (props.left20 ? ' pl2 ': '')+
                          (props.left30 ? ' pl3 ': '')+
                          (props.left40 ? ' pl4 ': '')+
                          (props.left50 ? ' pl5 ': '')+
                          (props.left60 ? ' pl6 ': '')+
                          (props.right10 ? ' pr1 ' :'')+
                          (props.right20 ? ' pr2 ': '')+
                          (props.right30 ? ' pr3 ': '')+
                          (props.right40 ? ' pr4 ': '')+
                          (props.right50 ? ' pr5 ': '')+
                          (props.right60 ? ' pr6 ': '')}`;

  try {
    ChildComponent = React.Children.only(props.children)
    ClonedElement = React.cloneElement(
      ChildComponent,{
          className: computeClasses + ' ' + (ChildComponent.props.className? ChildComponent.props.className: '')
      }
    );
  } catch (e) {
    ChildComponent = props.children;
  }
  // console.log(ChildComponent.props);

  return(
    ClonedElement
    ? ClonedElement
    : <div {...props} className={computeClasses + ' ' + (props.className? props.className: '')}>
        {props.children}
      </div>
  )
}

export function Space(props){
  let ChildComponent, ClonedElement;
  const propArray = [];
  for(let prop in props){
    if(props.hasOwnProperty(prop) && ['top', 'bottom', 'left', 'right'].indexOf(prop.substring(0, prop.length -1)) !== -1)
    propArray.push(prop)
  }
  let prefix 
  if (props.padding){
    prefix = 'p'
  }else if (props.margin){
    prefix = 'm'
  }

  function  computeClasses(_prefix, _props){
    if(!_prefix) return
    return _props.map(s=>{return _prefix + s.substring(0, 1) + s.substring(s.length-1)}).join(' ')
  }

  try {
    ChildComponent = React.Children.only(props.children)
    ClonedElement = React.cloneElement(
      ChildComponent,{
          className:  (ChildComponent.props.className? ChildComponent.props.className: '')+ ' ' + computeClasses(prefix, propArray)
      }
    );
  } catch (e) {
    ChildComponent = props.children;
  }
  return(
    ClonedElement
    ? ClonedElement
    : <div className={computeClasses(prefix, propArray) + ' ' + (props.className || '')}>
        {props.children}
      </div>
  )
}
