import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavLinks({links = [], className=''}) {

  const navigation = links.map((item, index)=>(
    <Link to={`${item.link}`} className='navLink' key={`navLink_${index}`}>
      {item.name}
    </Link>
  ));

  return(
    <nav className={`${className} navLinks`}>
      {navigation}
    </nav>
  );
}
NavLinks.propTypes = {
};
