import React, { useEffect, useState } from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './fibonacci.module.css';
import { DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<string[]>([]);
  const [solution, setSolution] = useState<number[]>([]);
  const [step, setStep] = useState(-1);
  const [runnig, setRunning] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(evt.target.value);
    setValue(val);

    if (val >= 0) {
      if (error) {
        setError(false);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setResult([]);

    if (value < 0) {
      setError(true);
      return;
    } else {
      if (error) {
        setError(false);
      }
    }

    const fib = (n: number): number[] => {
      let arr: number[] = [0, 1];
      for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
      return arr;
    };

    setSolution(fib(Number(value) + 1));
    setResult([]);
    setRunning(true);
    setStep(0);
  };

  const getNextElements = () => {
    if (step > value + 1) {
      setRunning(false);
      return;
    }

    let iteration = [...result];
    let el = solution[step];

    if (el) {
      iteration.push(String(el));
      setResult(iteration);
    }

    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (solution.length > 0) {
      window.setTimeout(() => getNextElements(), DELAY_IN_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          type={'number'}
          style={error ? { borderColor: 'red', color: 'red' } : undefined}
          extraClass={'hasError'}
          max={19}
          isLimitText={true}
          value={value}
          onChange={handleChange}
        />
        <Button
          type={'submit'}
          text={'Рассчитать'}
          onClick={handleClick}
          isLoader={runnig}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={item} index={index} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
