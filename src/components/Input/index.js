import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Input({ipAddress, handleChange, handleClear, errorMessage}) {
    const errorStyle = errorMessage ? 'input-error' : 'input';
    return (
        <div className='label-wrap'>
            <span className='label'>IP Address / host name</span>
            <input
                className={errorStyle}
                type='search'
                id='ipAddress'
                name='ipAddress'
                onChange={handleChange}
                onInput={handleClear}
                value={ipAddress}
            />
            <div className='error-wrap'>{errorMessage && <div className='errorMessage'>{errorMessage}</div>}</div>
        </div>
    );
};

Input.propTypes = {
    ipAddress: PropTypes.string,
    handleChange: PropTypes.func,
    handleClear: PropTypes.func,
    errorMessage: PropTypes.string
};
