const {getClientIpAddress} = require('../src/api/index');

const mockResponses = {
    success: {ip: '1.1.1.1'},
    failed: new TypeError('Failed to fetch')
};

describe('API for getting client ip address', () => {
    test('get client ip address', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.success)
        }));
        const distance = await getClientIpAddress();
        expect(distance).toEqual(expect.objectContaining({
            ip: expect.any(String)
        }));
        expect(distance).toBeTruthy();
    });
    test('API failed to respond', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponses.failed)
        }));
        const distance = await getClientIpAddress();
        expect(distance).toEqual(new TypeError('Failed to fetch'));
        expect(distance).toEqual(expect.objectContaining({
            message: expect.any(String)
        }));
        expect(distance).toEqual(expect.objectContaining({
            message: 'Failed to fetch'
        }));
    });
  });