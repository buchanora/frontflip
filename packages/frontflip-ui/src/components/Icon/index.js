import React from 'react';
import { PropTypes } from 'prop-types';
import {computeColor, computeFontSize} from '../../utils/styleHelpers';

export default function Icon({library='icofont', className='star', size, textAlign, align, fillColor, fillShade, style, onClick=()=>{}}) {
  let classes = '';
  classes += `${align ? 'align-block-' + align : ''} `// **** NEVER remove trailing whitespace
  library !== 'icofont' ? classes+= `iconClass ${library} ${library}-${className}` : classes+= `iconClass icofont icofont-${className} `// **** NEVER remove trailing whitespace
  classes += computeColor(fillColor, fillShade, 'color') + ' '
  classes += computeFontSize(size)
  
  return (
    <i  className={classes}
        onClick={onClick}
        style = {{  textAlign: textAlign,
                    ...style }} />
  );
}
Icon.propTypes = {
};
