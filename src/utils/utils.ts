export const setDelay = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

interface IGetRandomArrArgs {
  minLength: number,
  maxLength: number,
  minValue: number,
  maxValue: number,
}

export const getRandomArr = ({
  minLength,
  maxLength,
  minValue,
  maxValue
}: IGetRandomArrArgs): number[] => {
  const newArrayLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;

  const newArray: number[] = new Array(newArrayLength)
    .fill(0)
    .map(
      (item) =>
        item + Math.floor(Math.random() * (maxValue - minValue)) + minValue
    );

  return newArray;
};
