import React, { useEffect, useState, useRef } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { Stack } from './utils';

import {
  ActionStates as Actions,
  ElementStates,
  TStackResult,
} from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './stack.module.css';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<TStackResult>([]);
  const [action, setAction] = useState<Actions>(Actions.Waiting);
  const [instant, setInstant] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const stackRef = useRef(new Stack());

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleAddClick = (evt: React.MouseEvent) => {
    setLoader(true);
    setValue('');

    stackRef.current.push(value);
    setAction(Actions.AddToTail);
  };

  const handleRemoveClick = () => {
    setLoader(true);

    stackRef.current.pop();
    setAction(Actions.DeleteFromTail);
  };

  const handleCleanClick = () => {
    stackRef.current.clear();
    showDataFromStack();
  };

  const showIncreaseStack = () => {
    showDataFromStack();

    setAction(Actions.Waiting);
    window.setTimeout(() => setInstant(-1), DELAY_IN_MS);
  };

  const showDecreaseStack = () => {
    if (result.length > 0) {
      setResult((prev) =>
        prev.map((item, index) => {
          return {
            value: item.value,
            state:
              index === instant
                ? ElementStates.Changing
                : ElementStates.Default,
          };
        })
      );
    }

    setAction(Actions.Waiting);

    window.setTimeout(() => setInstant(-1), DELAY_IN_MS);
  };

  const showDataFromStack = () => {
    const stack = stackRef.current.getAllItems();

    if (stack && stack.length > 0) {
      setResult(
        stack.map((item, index) => {
          return {
            value: item,
            state:
              index === instant
                ? ElementStates.Changing
                : ElementStates.Default,
          };
        })
      );
    } else {
      setResult([]);
    }
  };

  useEffect(() => {
    if (action === Actions.AddToTail) {
      showIncreaseStack();
    } else if (action === Actions.DeleteFromTail) {
      showDecreaseStack();
    } else {
      showDataFromStack();
      setLoader(false);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant]);

  useEffect(() => {
    if (action === Actions.AddToTail) {
      setInstant(stackRef.current.getLastIndex());
    } else if (action === Actions.DeleteFromTail) {
      if (stackRef.current.getSize() > 0) {
        setInstant(stackRef.current.getLastIndex() + 1);
      } else {
        setInstant(stackRef.current.getLastIndex());
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            maxLength={4}
            isLimitText={true}
            value={value}
            onChange={handleChange}
          />
          <Button
            type={'button'}
            text={'Добавить'}
            onClick={handleAddClick}
            isLoader={loader}
            disabled={!loader && value.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить'}
            onClick={handleRemoveClick}
            isLoader={loader}
            disabled={result.length === 0}
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Очистить'}
          onClick={handleCleanClick}
          disabled={loader || result.length === 0}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  head={index === result?.length - 1 ? 'top' : undefined}
                  state={item.state}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
