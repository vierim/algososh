import { FC, useEffect, useRef, useState } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { ReverseRange } from './utils';

import { ElementStates } from '../../types/element-states';
import type { TReverseRangeResult } from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './string.module.css';

export const StringComponent: FC = () => {
  const range = useRef(new ReverseRange<string>());

  const [value, setValue] = useState('');
  const [result, setResult] = useState<TReverseRangeResult>([]);
  const [step, setStep] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const getElementState = (itemIndex: number): ElementStates => {
    if (
      itemIndex === range.current.startPosition() ||
      itemIndex === range.current.endPosition()
    ) {
      if (range.current.isReversed) {
        return ElementStates.Modified;
      } else {
        return ElementStates.Changing;
      }
    }

    if (
      itemIndex < range.current.startPosition() ||
      itemIndex > range.current.endPosition()
    ) {
      return ElementStates.Modified;
    }

    return ElementStates.Default;
  };

  const showCurrentResult = () => {
    setResult(
      range.current.getState().map((item, index) => {
        return {
          value: item,
          state: getElementState(index),
        };
      })
    );
  };

  const reverseElements = () => {
    range.current.nextStep();
    showCurrentResult();

    setStep((prevStep) => prevStep + 1);
  };

  const displayAlgorithm = () => {
    setLoader(true);
    setValue('');
    setStep(0);
    //window.setTimeout(() => setStep(0), DELAY_IN_MS);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    range.current.setState(value.split(''));

    showCurrentResult();
    displayAlgorithm();
  };

  useEffect(() => {
    if (step !== -1) {
      if (!range.current.isReversed) {
        window.setTimeout(() => reverseElements(), DELAY_IN_MS);
      } else {
        setLoader(false);
        setStep(-1);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          type={'text'}
          maxLength={11}
          isLimitText={true}
          value={value}
          onChange={handleChange}
        />
        <Button
          type={'submit'}
          text={'Развернуть'}
          onClick={handleClick}
          isLoader={loader}
          disabled={value.length === 0}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={item.value} state={item.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
