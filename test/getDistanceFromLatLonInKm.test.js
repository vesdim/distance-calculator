const {getDistanceFromLatLonInKm} = require('../src/utils');

const coords = [
    {lat: 42.672833, lon: 23.278201, name: 'Sofia, BG'},
	{lat: 40.712783, lon: -74.005941, name: 'New York, NY'},
	{lat: 34.052234, lon: -118.243684, name: 'Los Angeles, CA'},
	{lat: 42.659360, lon: 23.379953, name: 'CayetanoOffice, BG'}
];

describe('Distance calculation', () => {
    test('distance from SF/BG to Cayetano to equal 8.45', () => {
        const {lat: SFlat, lon: SFlon} = coords.find(coord => coord.name === 'Sofia, BG');
        const {lat, lon} = coords.find(coord => coord.name === 'CayetanoOffice, BG');
        const distance = getDistanceFromLatLonInKm(SFlat, SFlon, lat, lon);
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(8.453396884387667);
        expect(distance).toBeTruthy();
    });
    test('distance from NY to LA to equal 3935.75', () => {
        const {lat: NYlat, lon: NYlon} = coords.find(coord => coord.name === 'New York, NY');
        const {lat: CAlat, lon: CAlon} = coords.find(coord => coord.name === 'Los Angeles, CA');
        const distance = getDistanceFromLatLonInKm(NYlat, NYlon, CAlat, CAlon);
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(3935.74845029715);
    });
    test('distance from SF/BG to Cayetano with no Cayetano params', () => {
        const {lat: SFlat, lon: SFlon} = coords.find(coord => coord.name === 'Sofia, BG');
        const distance = getDistanceFromLatLonInKm(SFlat, SFlon);
        expect(distance).toBeTruthy();
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(8.453396884387667);
    });
    test('distance with zero lat and lon to CayetanoOffice to equal 8.45', () => {
        const distance = getDistanceFromLatLonInKm(0, 0);
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(5286.730307781954);
    });
    test('distance with all zero arguments', () => {
        const distance = getDistanceFromLatLonInKm(0, 0, 0, 0);
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(0);
    });
    test('distance with no arguments', () => {
        const distance = getDistanceFromLatLonInKm();
        expect(distance).toEqual(expect.any(Number));
        expect(distance).toBe(Number.NaN);
    });
  });