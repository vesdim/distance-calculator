import React from 'react';
import Input from '../Input';
import Button from '../Button';
import PropTypes from 'prop-types';
import './style.css';

export default function SearchLocation({ipAddress, handleChange, handleClear, handleLocationClick, errorMessage}) {
    const errorStyle = errorMessage ? 'input-error' : 'input';
    return (
        <div className='input-wrapper'>
            <Input
                ipAddress={ipAddress}
                handleChange={handleChange}
                handleClear={handleClear}
                errorMessage={errorMessage}
            />
            <Button handleLocationClick={handleLocationClick} />
        </div>
    );
};

SearchLocation.propTypes = {
    ipAddress: PropTypes.string,
    handleChange: PropTypes.func,
    handleClear: PropTypes.func,
    errorMessage: PropTypes.string,
    handleLocationClick: PropTypes.func
};
