import { Direction } from '../../types/direction';
import { ElementStates } from "../../types/element-states";
import { TSortingResult } from "../../types/results";

const MIN_ARRAY_LEN = 3;
const MAX_ARRAY_LEN = 17;

const MIN_VALUE = 0;
const MAX_VALUE = 100;

export const randomArr = (): number[] => {
  const newArrayLength =
    Math.floor(Math.random() * (MAX_ARRAY_LEN - MIN_ARRAY_LEN)) + MIN_ARRAY_LEN;
  const newArray = new Array(newArrayLength)
    .fill(0)
    .map(
      (item) =>
        item + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE
    );

  return newArray;
};

export const bubbleSorting = (arr: TSortingResult, direction: Direction): TSortingResult[] => {
  let res = [...arr].map((item) => { return {...item} });
  let steps: TSortingResult[] = [];

  for (let i = 0; i < res.length; i++) {
    res[i].state = ElementStates.Changing;

    for (let j = i + 1; j < res.length; j++) {
      res[j].state = ElementStates.Changing;
      steps.push([...res].map((item) => { return {...item} }));

      if (compare(res[i].value, res[j].value, direction)) {
        swap(i, j, res);
        steps.push([...res].map((item) => { return {...item} }));
      }

      res[j].state = ElementStates.Default;
    }

    res[i].state = ElementStates.Modified;
    if(i === arr.length - 1) {
      steps.push([...res].map((item) => { return {...item} }));
    }
  }

  return steps;
};

function compare(currentElement: number, comparedElement: number, direction: Direction) {
  if(direction === Direction.Ascending) {
    return currentElement > comparedElement;
  } else {
    return currentElement < comparedElement;
  }
}

function swap(currentIndex: number, comparedIndex: number, array: TSortingResult) {
  let tmp = {...array[currentIndex]};
  array[currentIndex] = {...array[comparedIndex]};
  array[comparedIndex] = tmp;
}
