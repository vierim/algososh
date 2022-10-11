import React, { useEffect, useState } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { swapElements } from './utils';

import { ElementStates } from '../../types/element-states';
import { TReverseStringResult } from '../../types/results';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<TReverseStringResult>([]);
  const [step, setStep] = useState<number>(-1);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleClick = () => {
    setResult(
      value.split('').map((item, index) => {
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

    setStep(0);
  };

  const reverseElements = () => {
    if (step < 0 || step >= Math.floor(result.length / 2)) {
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
      <div className={styles.container}>
        <Input
          type={'text'}
          style={{ height: '60px' }}
          maxLength={11}
          isLimitText={true}
          value={value}
          onChange={handleChange}
        />
        <Button text={'Развернуть'} onClick={handleClick} />
      </div>

      <div className={styles.results}>
        {result.length > 0 &&
          result.map((item) => {
            return <Circle state={item.state} letter={item.char} />;
          })}
      </div>
    </SolutionLayout>
  );
};
