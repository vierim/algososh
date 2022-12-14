import { Direction, SortingMethods } from '../../../types';
import { SortableArray } from '../utils';

const emptyArray = [];
const emptyArraySteps = [];

const singleElementArray = [4];
const singleElementSteps = [{ array: [4], current: [], modified: [0] }];

const normalTestArray = [15, 7, 96, 65];
const normalTestStepsChoiceAscending = [
  { array: [ 15, 7, 96, 65 ], current: [ 0, 1, 0 ], modified: [] },
  { array: [ 15, 7, 96, 65 ], current: [ 0, 2, 1 ], modified: [] },
  { array: [ 15, 7, 96, 65 ], current: [ 0, 3, 1 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [ 0, 1 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 1, 2, 1 ], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 1, 3, 1 ], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 1, 1 ], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [], modified: [ 0, 1 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 2, 3, 2 ], modified: [ 0, 1 ] },
  { array: [ 7, 15, 65, 96 ], current: [ 2, 3 ], modified: [ 0, 1 ] },
  { array: [ 7, 15, 65, 96 ], current: [], modified: [ 0, 1, 2 ] },
  { array: [ 7, 15, 65, 96 ], current: [ 3, 3 ], modified: [ 0, 1, 2 ] },
  { array: [ 7, 15, 65, 96 ], current: [], modified: [ 0, 1, 2, 3 ] },
];

const normalTestStepsChoiceDescending = [
  { array: [ 15, 7, 96, 65 ], current: [ 0, 1, 0 ], modified: [] },
  { array: [ 15, 7, 96, 65 ], current: [ 0, 2, 0 ], modified: [] },
  { array: [ 15, 7, 96, 65 ], current: [ 0, 3, 2 ], modified: [] },
  { array: [ 96, 7, 15, 65 ], current: [ 0, 2 ], modified: [] },
  { array: [ 96, 7, 15, 65 ], current: [], modified: [ 0 ] },
  { array: [ 96, 7, 15, 65 ], current: [ 1, 2, 1 ], modified: [ 0 ] },
  { array: [ 96, 7, 15, 65 ], current: [ 1, 3, 2 ], modified: [ 0 ] },
  { array: [ 96, 65, 15, 7 ], current: [ 1, 3 ], modified: [ 0 ] },
  { array: [ 96, 65, 15, 7 ], current: [], modified: [ 0, 1 ] },
  { array: [ 96, 65, 15, 7 ], current: [ 2, 3, 2 ], modified: [ 0, 1 ] },
  { array: [ 96, 65, 15, 7 ], current: [ 2, 2 ], modified: [ 0, 1 ] },
  { array: [ 96, 65, 15, 7 ], current: [], modified: [ 0, 1, 2 ] },
  { array: [ 96, 65, 15, 7 ], current: [ 3, 3 ], modified: [ 0, 1, 2 ] },
  { array: [ 96, 65, 15, 7 ], current: [], modified: [ 0, 1, 2, 3 ] },
];

const normalTestStepsBubbleAscending = [
  { array: [ 15, 7, 96, 65 ], current: [ 0, 1 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [ 0, 1 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [ 0, 2 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [ 0, 3 ], modified: [] },
  { array: [ 7, 15, 96, 65 ], current: [], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 1, 2 ], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 1, 3 ], modified: [ 0 ] },
  { array: [ 7, 15, 96, 65 ], current: [], modified: [ 0, 1 ] },
  { array: [ 7, 15, 96, 65 ], current: [ 2, 3 ], modified: [ 0, 1 ] },
  { array: [ 7, 15, 65, 96 ], current: [ 2, 3 ], modified: [ 0, 1 ] },
  { array: [ 7, 15, 65, 96 ], current: [], modified: [ 0, 1, 2 ] },
  { array: [ 7, 15, 65, 96 ], current: [], modified: [ 0, 1, 2, 3 ] }
];

const normalTestStepsBubbleDescending = [
  { array: [ 15, 7, 96, 65 ], current: [ 0, 1 ], modified: [] },
  { array: [ 15, 7, 96, 65 ], current: [ 0, 2 ], modified: [] },
  { array: [ 96, 7, 15, 65 ], current: [ 0, 2 ], modified: [] },
  { array: [ 96, 7, 15, 65 ], current: [ 0, 3 ], modified: [] },
  { array: [ 96, 7, 15, 65 ], current: [], modified: [ 0 ] },
  { array: [ 96, 7, 15, 65 ], current: [ 1, 2 ], modified: [ 0 ] },
  { array: [ 96, 15, 7, 65 ], current: [ 1, 2 ], modified: [ 0 ] },
  { array: [ 96, 15, 7, 65 ], current: [ 1, 3 ], modified: [ 0 ] },
  { array: [ 96, 65, 7, 15 ], current: [ 1, 3 ], modified: [ 0 ] },
  { array: [ 96, 65, 7, 15 ], current: [], modified: [ 0, 1 ] },
  { array: [ 96, 65, 7, 15 ], current: [ 2, 3 ], modified: [ 0, 1 ] },
  { array: [ 96, 65, 15, 7 ], current: [ 2, 3 ], modified: [ 0, 1 ] },
  { array: [ 96, 65, 15, 7 ], current: [], modified: [ 0, 1, 2 ] },
  { array: [ 96, 65, 15, 7 ], current: [], modified: [ 0, 1, 2, 3 ] }
];

describe('Тестирование алгоритмов сортировки', () => {
  test('Пустой массив, сортировка выбором', () => {
    const emptySortableData = new SortableArray();

    emptySortableData.data = emptyArray;
    emptySortableData.method = SortingMethods.Choice;
    emptySortableData.direction = Direction.Ascending;

    emptySortableData.sortArray();

    expect(emptySortableData.steps).toEqual(
      expect.arrayContaining(emptyArraySteps)
    );
  });

  test('Пустой массив, сортировка пузырьком', () => {
    const emptySortableData = new SortableArray();

    emptySortableData.data = emptyArray;
    emptySortableData.method = SortingMethods.Bubble;
    emptySortableData.direction = Direction.Descending;

    emptySortableData.sortArray();

    expect(emptySortableData.steps).toEqual(
      expect.arrayContaining(emptyArraySteps)
    );
  });

  test('Массив с одним элементом, сортировка выбором', () => {
    const singleSortableData = new SortableArray();

    singleSortableData.data = singleElementArray;
    singleSortableData.method = SortingMethods.Choice;
    singleSortableData.direction = Direction.Descending;

    singleSortableData.sortArray();

    expect(singleSortableData.steps).toEqual(
      expect.arrayContaining(singleElementSteps)
    );
  });

  test('Массив с одним элементом, сортировка пузырьком', () => {
    const singleSortableData = new SortableArray();

    singleSortableData.data = singleElementArray;
    singleSortableData.method = SortingMethods.Bubble;
    singleSortableData.direction = Direction.Ascending;

    singleSortableData.sortArray();

    expect(singleSortableData.steps).toEqual(
      expect.arrayContaining(singleElementSteps)
    );
  });

  test('Массив из нескольких элементов, сортировка выбором, по возрастанию', () => {
    const normalSortableData = new SortableArray();

    normalSortableData.data = normalTestArray;
    normalSortableData.method = SortingMethods.Choice;
    normalSortableData.direction = Direction.Ascending;

    normalSortableData.sortArray();

    expect(normalSortableData.steps).toEqual(
      expect.arrayContaining(normalTestStepsChoiceAscending)
    );
  });

  test('Массив из нескольких элементов, сортировка выбором, по убыванию', () => {
    const normalSortableData = new SortableArray();

    normalSortableData.data = normalTestArray;
    normalSortableData.method = SortingMethods.Choice;
    normalSortableData.direction = Direction.Descending;

    normalSortableData.sortArray();

    expect(normalSortableData.steps).toEqual(
      expect.arrayContaining(normalTestStepsChoiceDescending)
    );
  });
  test('Массив из нескольких элементов, сортировка пузырьком, по возрастанию', () => {
    const normalSortableData = new SortableArray();

    normalSortableData.data = normalTestArray;
    normalSortableData.method = SortingMethods.Bubble;
    normalSortableData.direction = Direction.Ascending;

    normalSortableData.sortArray();

    expect(normalSortableData.steps).toEqual(
      expect.arrayContaining(normalTestStepsBubbleAscending)
    );
  });

  test('Массив из нескольких элементов, сортировка пузырьком, по убыванию', () => {
    const normalSortableData = new SortableArray();

    normalSortableData.data = normalTestArray;
    normalSortableData.method = SortingMethods.Bubble;
    normalSortableData.direction = Direction.Descending;

    normalSortableData.sortArray();

    expect(normalSortableData.steps).toEqual(
      expect.arrayContaining(normalTestStepsBubbleDescending)
    );
  });
});
