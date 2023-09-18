export async function getClientLocation(ipAddress) {
    let getLocation;
    try {
        const getLocationData = await fetch(`http://ip-api.com/json/${ipAddress}`);
        getLocation = await getLocationData.json();
    } catch (err) {
        getLocation = {status: 'fail', message: err.message};
    }
    return getLocation;
}

export async function getClientIpAddress() {
    let clientIp;
    try {
        const getClientIpData = await fetch('https://api.ipify.org/?format=json');
        clientIp = await getClientIpData.json();
    } catch (err) {
        clientIp = {ip: undefined, message: err.message};
    }
    return clientIp;
}
