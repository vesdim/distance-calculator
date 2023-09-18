import React, { useEffect } from 'react';
import Input from '../Input';
import Button from '../Button';
import PropTypes from 'prop-types';
import './style.css';

export default function LocationInfo({ipAddress, country, timezone, distance}) {
    return (
        <div className='content'>
            <div className='row'>
                <p>Country:</p>
                <p name='country'>{country}</p>
            </div>
            <div className='row'>
                <p>Time zone:</p>
                <p>{timezone && timezone.replace(/\//, ', ')}</p>
            </div>
            <div className='row'>
                <p>Distance to Cayetano's office:</p>
                <p>{distance && `${distance} km`}</p>
            </div>
        </div>
    );
};

LocationInfo.propTypes = {
    country: PropTypes.string,
    timezone: PropTypes.string,
    distance: PropTypes.string
};
