import {dayFour} from './main.js';

const testDataPath = './day_4/testData.txt';

test('Part 2: Duplicate Matching cards', () => {
  expect(dayFour({ pathFile: testDataPath }).totalCards).toBe(30);
});