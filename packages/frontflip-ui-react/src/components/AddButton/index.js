import React from 'react';
import { PropTypes } from 'prop-types';
export default function AddButton(props) {
  const {onClick, label} = props;
  return (
    <div className="addButton-wrap">
      <div  className='addButton'
            onClick={onClick}>
          <i className='icofont icofont-plus'></i>
          {label}
      </div>
    </div>
  );
}
AddButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string
};
