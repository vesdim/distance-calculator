import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchLocation from './components/SearchLocation';
import LocationInfo from './components/LocationInfo';
import Line from './components/Line';
import { getClientIpAddress, getClientLocation } from './api';
import { inputValidations, getDistanceFromLatLonInKm } from './utils';
import './App.css';

function App() {
    const [location, setLocation] = useState({country: null, timezone: null, distance: null});
    const [ipAddress, setIpAddress] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setIpAddress(event.target.value);
        setError('');
    };

    const handleClear = event => {
        if (event.target.value === '') {
            setLocation({country: null, timezone: null, distance: null});
            setError('');
        }
    };

    const handleLocationClick = async() => {
        const validateInput = inputValidations(ipAddress);
        if (validateInput) {
            setError(validateInput);
            setLocation({country: null, timezone: null, distance: null});
            return;
        }
        let getLocation = await getClientLocation(ipAddress);
        if (getLocation.status === 'fail') {
            setError(getLocation.message);
            setLocation({country: null, timezone: null, distance: null});
            return;
        }

        const { lat, lon, country, timezone } = getLocation;
        const distanceKm = getDistanceFromLatLonInKm(lat, lon);
        setLocation({
            latitude: lat,
            longitude: lon,
            country: country,
            timezone: timezone,
            distance: distanceKm?.toFixed(2)
        });
    };

    useEffect(() => {
        const getClientIp = async() => {
            const clientIp = await getClientIpAddress();
            if (!clientIp.ip) {
                setError(clientIp.message);
                setLocation({country: null, timezone: null, distance: null});
                return;
            }
            setIpAddress(clientIp.ip);
        };
        getClientIp();
    }, []);

    return (
        <div className='app'>
            <Header />
            <SearchLocation
                ipAddress={ipAddress}
                handleChange={handleChange}
                handleLocationClick={handleLocationClick}
                handleClear={handleClear}
                errorMessage={error}
            />
            <Line />
            <LocationInfo
                ipAddress={ipAddress}
                country={location.country}
                timezone={location.timezone}
                distance={location.distance}
            />
        </div>
    );
};

export default App;
