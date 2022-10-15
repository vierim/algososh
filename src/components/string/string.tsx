import React, { useEffect, useState } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { swapElements } from './utils';

import { ElementStates } from '../../types/element-states';
import type { TReverseStringResult } from '../../types/results';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<TReverseStringResult>([]);
  const [step, setStep] = useState<number>(-1);
  const [runnig, setRunning] = useState<boolean>(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (value.length > 0) {
      setResult([]);
      let chars = value.split('');

      if (chars.length === 1) {
        setResult([{ char: chars[0], state: ElementStates.Modified }]);
        return;
      }

      setResult(
        chars.map((item, index) => {
          let elementState =
            index === 0 || index === value.length - 1
              ? ElementStates.Changing
              : ElementStates.Default;

          return {
            char: item,
            state: elementState,
          };
        })
      );

      setRunning(true);
      setStep(0);
    }
  };

  const reverseElements = () => {
    if (step < 0) {
      return;
    }

    if (step >= Math.floor(result.length / 2)) {
      setRunning(false);
      return;
    }

    let iteration = swapElements(result, step);
    setResult(iteration);
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    window.setTimeout(() => reverseElements(), DELAY_IN_MS);
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
          isLoader={runnig}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index}>
                <Circle state={item.state} letter={item.char} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
