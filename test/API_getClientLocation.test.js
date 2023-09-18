const {getClientLocation} = require('../src/api/index');

const mockResponses = {
    successIp: {
        status: 'success',
        country: 'Bulgaria',
        countryCode: 'BG',
        region: '22',
        regionName: 'Sofia-Capital',
        city: 'Sofia',
        zip: '1000',
        lat: 42.6951,
        lon: 23.325,
        timezone: 'Europe/Sofia',
        isp: 'A1 Bulgaria EAD',
        org: 'GPON Services',
        as: 'AS29580 A1 Bulgaria EAD',
        query: '92.247.231.50'
    },
    successHostname: {
        status: 'success',
        country: 'Bulgaria',
        countryCode: 'BG',
        region: '22',
        regionName: 'Sofia-Capital',
        city: 'Sofia',
        zip: '1000',
        lat: 42.6977,
        lon: 23.3219,
        timezone: 'Europe/Sofia',
        isp: 'NetInfo Ltd.',
        org: 'NetInfo.BG JSCo',
        as: 'AS13147 Net Info JSCo',
        query: '194.153.145.104'
    },
    failedPrivateAddress: {
        message: 'private range',
        query: '10.1.1.1',
        status: 'fail'
    },
    failedReservedAddress: {
        message: 'reserved range',
        query: '0.0.0.0',
        status: 'fail'
    },
    failedInvalidQuery: {
        status: 'fail',
        message: 'invalid query',
        query: '0.0.0.00000000000'
    }
};

describe('API for getting client location', () => {
    test('get location by ip address', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.successIp)
        }));
        const location = await getClientLocation('92.247.231.50');
        expect(location).toEqual(expect.objectContaining({
            status: 'success',
            country: expect.any(String),
            lat: expect.any(Number),
            lon: expect.any(Number),
            timezone: expect.any(String),
            query: '92.247.231.50'
        }));
        expect(location).toBeTruthy();
    });
    test('get location by host name', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.successHostname)
        }));
        const location = await getClientLocation('abv.bg');
        expect(location).toEqual(expect.objectContaining({
            status: 'success',
            lat: expect.any(Number),
            lon: expect.any(Number),
            country: expect.any(String),
            timezone: expect.any(String),
            query: '194.153.145.104'
        }));
        expect(location).toBeTruthy();
    });
    test('API failed response - private range', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.failedPrivateAddress)
        }));
        const location = await getClientLocation('10.1.1.1');
        expect(location).toEqual(expect.objectContaining({
            status: 'fail',
            message: expect.any(String),
            query: expect.any(String)
        }));
        expect(location).toEqual(expect.objectContaining({
            message: 'private range',
            query: '10.1.1.1'
        }));
    });
    test('API failed response - reserved range', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.failedReservedAddress)
        }));
        const location = await getClientLocation('0.0.0.0');
        expect(location).toEqual(expect.objectContaining({
            status: 'fail',
            message: expect.any(String),
            query: expect.any(String)
        }));
        expect(location).toEqual(expect.objectContaining({
            message: 'reserved range',
            query: '0.0.0.0'
        }));
    });
    test('API failed response - invalid query', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.failedInvalidQuery)
        }));
        const location = await getClientLocation('0.0.0.00000000000');
        expect(location).toEqual(expect.objectContaining({
            status: 'fail',
            message: expect.any(String),
            query: expect.any(String)
        }));
        expect(location).toEqual(expect.objectContaining({
            message: 'invalid query',
            query: '0.0.0.00000000000'
        }));
    });
  });