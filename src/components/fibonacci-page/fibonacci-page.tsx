import { FC, useEffect, useState } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './fibonacci.module.css';

export const FibonacciPage: FC = () => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<string[]>([]);
  const [solution, setSolution] = useState<number[]>([]);
  const [step, setStep] = useState(-1);
  const [runnig, setRunning] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(evt.target.value);

    if(val >= 0 && val <= 19) {
      setValue(val);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setResult([]);

    const fib = (n: number): number[] => {
      let arr: number[] = [0, 1];
      for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
      return arr;
    };

    setSolution(fib(Number(value) + 1));
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
          max={19}
          isLimitText={true}
          value={value}
          onChange={handleChange}
        />
        <Button
          type={'submit'}
          text={'Рассчитать'}
          onClick={handleClick}
          disabled={value < 1}
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
