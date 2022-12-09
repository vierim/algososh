import { ReverseRange } from '../utils';

const evenLengthString = '123456';
const evenLengthResultSteps = [
  ['1', '2', '3', '4', '5', '6'],
  ['6', '2', '3', '4', '5', '1'],
  ['6', '5', '3', '4', '2', '1'],
  ['6', '5', '4', '3', '2', '1'],
];

const oddLengthString = '12345';
const oddLengthResultSteps = [
  ['1', '2', '3', '4', '5'],
  ['5', '2', '3', '4', '1'],
  ['5', '4', '3', '2', '1'],
];

const singleLengthString = 'q';
const singltLengthResultStep = ['q'];

const emptyString = '';
const emptyStringResult = [];

describe('Тестирование алгоритма разворота ряда/строки', () => {
  test('Ряд с четным количество элементов', () => {
    const evenRange = new ReverseRange();
    evenRange.range = evenLengthString.split('');

    expect(evenRange.range).toEqual(
      expect.arrayContaining(evenLengthResultSteps[0])
    );

    evenRange.nextStep();
    expect(evenRange.range).toEqual(
      expect.arrayContaining(evenLengthResultSteps[1])
    );

    evenRange.nextStep();
    expect(evenRange.range).toEqual(
      expect.arrayContaining(evenLengthResultSteps[2])
    );

    evenRange.nextStep();
    expect(evenRange.range).toEqual(
      expect.arrayContaining(evenLengthResultSteps[3])
    );

    expect(evenRange.isReversed).toBe(true);
  });

  test('Ряд с нечетным количество элементов', () => {
    const oddRange = new ReverseRange();
    oddRange.range = oddLengthString.split('');

    expect(oddRange.range).toEqual(
      expect.arrayContaining(oddLengthResultSteps[0])
    );

    oddRange.nextStep();
    expect(oddRange.range).toEqual(
      expect.arrayContaining(oddLengthResultSteps[1])
    );

    oddRange.nextStep();
    expect(oddRange.range).toEqual(
      expect.arrayContaining(oddLengthResultSteps[2])
    );

    expect(oddRange.isReversed).toBe(true);
  });

  test('Ряд с одним элементом', () => {
    const singleElementRange = new ReverseRange();
    singleElementRange.range = singleLengthString.split('');

    expect(singleElementRange.range).toEqual(
      expect.arrayContaining(singltLengthResultStep)
    );
    expect(singleElementRange.isReversed).toBe(true);
  });

  test('Ряд без элементов (пустая строка)', () => {
    const emptyRange = new ReverseRange();
    emptyRange.range = emptyString.split('');

    expect(emptyRange.range).toEqual(expect.arrayContaining(emptyStringResult));
    expect(emptyRange.isReversed).toBe(false);
  });
});
