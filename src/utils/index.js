const {OFFICE_LOCATION_LATITUDE, OFFICE_LOCATION_LONGITUDE} = require('./config');

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2 = OFFICE_LOCATION_LATITUDE, lon2 = OFFICE_LOCATION_LONGITUDE) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad above
    const dLon = deg2rad(lon2-lon1); 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

export function inputValidations (input, validateInput = ['ip', 'hostname']) {
    const hostnameValidation = {
        validateHostname: hostname => {
            const checkHostRegEx = /^(?:([a-z0-9-]+|\*)\.)?([a-z0-9-]{1,61})\.([a-z0-9]{2,7})$/gm;
            return checkHostRegEx.test(hostname);
        },
        validateText: input => {
            const checkLetter = /[a-zA-Z]/;
            return checkLetter.test(input);
        },
        errorMessage: 'Invalid Host name'
    }
    const ipValidation = {
        validateIpAddress: ipAddress => {
            const checkIpRegEx = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
            return checkIpRegEx.test(ipAddress);
        },
        errorMessage: 'Invalid IP address'
    }
    
    const validText = hostnameValidation.validateText(input);
    const validHostname = hostnameValidation.validateHostname(input);
    const validIpAddress = ipValidation.validateIpAddress(input);
    if (validateInput.length > 1) {
        // validate Ip Address or Hostname
        if (validateInput.includes('ip') && validateInput.includes('hostname')) {
            if (!validText && !validIpAddress) {
                return ipValidation.errorMessage;
            }
            if (!validHostname && !validIpAddress) {
                return hostnameValidation.errorMessage;
            }
        }
    }
    if (validateInput.length === 1) {
        // validate Ip Address only
        if (validateInput.includes('ip')) {
            if (!validIpAddress) {
                return ipValidation.errorMessage;
            }
        }
        // validate Hostname only
        if (validateInput.includes('hostname')) {
            if (!validHostname) {
                return hostnameValidation.errorMessage;
            }
        }
    }
}
