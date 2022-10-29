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
  const timerId = useRef<NodeJS.Timeout>();

  const [value, setValue] = useState('');
  const [result, setResult] = useState<TReverseRangeResult>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const getElementState = (itemIndex: number): ElementStates => {
    const startPosition = range.current.startPosition();
    const endPosition = range.current.endPosition();
    const isReversed = range.current.isReversed;

    if (itemIndex === startPosition || itemIndex === endPosition) {
      if (isReversed) {
        return ElementStates.Modified;
      } else {
        return timerId.current ? ElementStates.Changing : ElementStates.Default;
      }
    }

    if (itemIndex < startPosition || itemIndex > endPosition) {
      return ElementStates.Modified;
    }

    return ElementStates.Default;
  };

  const showCurrentResult = () => {
    setResult(
      range.current.getRange().map((item, index) => {
        return {
          value: item,
          state: getElementState(index),
        };
      })
    );
  };

  const reverseElements = () => {
    if (!range.current.isReversed) {
      range.current.nextStep();

      if (range.current.isReversed && timerId.current) {
        clearInterval(timerId.current);
        timerId.current = undefined;

        setLoader(false);
      }
    }

    showCurrentResult();
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    const lastChar = newValue[newValue.length - 1];

    if (lastChar !== ' ') {
      setValue(evt.target.value);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    range.current.setRange(value.split(''));
    setValue('');
    showCurrentResult();
    
    if (!range.current.isReversed) {
      setLoader(true);

      window.setTimeout(() => {
        timerId.current = setInterval(reverseElements, DELAY_IN_MS);
        showCurrentResult();
      }, DELAY_IN_MS);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

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
