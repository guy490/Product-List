import React from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './button.css';

function Button(props) {
  const { className, children, condition, errorMessage } = props;
  const alert = useAlert();
  let history = useHistory();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (!condition) {
          alert.show(errorMessage);
        } else {
          history.push('/Order');
        }
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};

export default Button;
