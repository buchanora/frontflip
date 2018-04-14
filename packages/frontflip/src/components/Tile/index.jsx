import React from 'react';
import { PropTypes } from 'prop-types';

// import {centerBackgroundImage} from '../../'

export default function Tile(props) {
  const {className=''} = props;
  return (
    <div className={`tile-wrap ${className}`}>
      <div className="tile-title">
        <i className={`icofont ${props.iconClass}`}></i>
        <div>{props.name}</div>
      </div>
      <div className={`tile-image`} style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.image})`, ...styles.imageBackground}}>
      </div>
    </div>
  );
}
Tile.propTypes = {
};

const styles = {
  imageBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  }
}
