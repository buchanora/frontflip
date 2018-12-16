import React from 'react';
import {Link} from 'react-router';

function Header (props) {
  const { children,
          fixed,
          backgroundColor = ''} = props;
  return (
    <header className ={`content-header ${fixed ? 'fixedHeader' :''}`}
            style = { {backgroundColor} }>
        {children}
    </header>
  );
};


export default Header;
