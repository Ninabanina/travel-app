import { checkCityName } from '../client/js/inputCheck'

describe('testing City Name Checking function', () => {
    test('Sydney is a valid City Name', () => {
        expect(checkCityName('Sydney')).toBeTruthy();
    })
})

describe('testing City Name Checking function', () => {
    test('New York is a valid City Name', () => {
        expect(checkCityName('New York')).toBeTruthy();
    })
})

describe('testing City Name Checking function', () => {
    test('123 is not a valid City Name', () => {
        expect(checkCityName('123')).toBeFalsy();
    })
})