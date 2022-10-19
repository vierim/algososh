const MIN_LEN = 3;
const MAX_LEN = 17;

const MIN_VALUE = 0;
const MAX_VALUE = 100;

export const randomArr = (): number[] => {
  const newArrayLength = Math.floor(Math.random() * (MAX_LEN - MIN_LEN)) + MIN_LEN;
  const newArray = new Array(newArrayLength)
    .fill(0)
    .map(
      (item) =>
        item + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE
    );

  return newArray;
};
