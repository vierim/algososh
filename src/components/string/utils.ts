import { TReverseStringResult } from '../../types/results';

export const swapElements = (array: TReverseStringResult, step: number) => {
  let res = [...array];

  let tmp = res[step];
  res[step] = res[res.length - step - 1];
  res[res.length - step - 1] = tmp;

  return res;
};
