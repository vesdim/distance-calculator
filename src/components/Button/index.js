import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Button({handleLocationClick}) {
    return (
        <button className='button-wrapper' onClick={handleLocationClick}>Calculate</button>
    );
};

Button.propTypes = {
    handleLocationClick: PropTypes.func
};
