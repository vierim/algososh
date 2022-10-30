import { FC, useEffect, useRef, useState } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { getFibonacciNumbers } from './utils';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './fibonacci.module.css';

export const FibonacciPage: FC = () => {
  const fibonacciNumbers = useRef<number[]>([]);
  const timerId = useRef<NodeJS.Timeout>();

  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(0);

  const displayAlgorithm = () => {
    timerId.current = setInterval(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + 1;

        if (nextStep >= fibonacciNumbers.current.length && timerId.current) {
          setLoader(false);
          clearInterval(timerId.current);
        }

        return nextStep;
      });
    }, DELAY_IN_MS);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(evt.target.value);

    if (val >= 0 && val <= 19) {
      setValue(val);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    fibonacciNumbers.current = getFibonacciNumbers(Number(value));
    setStep(0);
    setLoader(true);

    displayAlgorithm();
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

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
          isLoader={loader}
        />
      </form>

      <ul className={styles.results}>
        {fibonacciNumbers.current.length > 0 &&
          fibonacciNumbers.current.slice(0, step).map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
