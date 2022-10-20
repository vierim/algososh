import { ElementStates } from "../../types/element-states"
import { TReverseStringResult } from "../../types/results";

export const swapElements = (array: TReverseStringResult, step: number) => {
  let res = [...array];

  let tmp = res[step];
  res[step] = res[res.length - step - 1];
  res[res.length - step -1] = tmp;

  res[step].state = ElementStates.Modified;
  res[res.length - step -1].state = ElementStates.Modified;

  if(step + 1 < res.length - step - 2) {
    res[step + 1].state = ElementStates.Changing;
    res[res.length - step - 2].state = ElementStates.Changing;
  }

  if(step + 1 === res.length - step - 2) {
    res[step + 1].state = ElementStates.Modified;
  }
  
  return res;
}
