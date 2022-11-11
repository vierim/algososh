import { FC, useState, useRef } from 'react';

import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { randomArr, SortableArray } from './utils';
import { setDelay } from '../../utils/utils';

import {
  Direction,
  ElementStates,
  SortingMethods,
  TSortingResult,
} from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';

import styles from './sorting.module.css';

export const SortingPage: FC = () => {
  const sortableData = useRef(new SortableArray());

  const [method, setMethod] = useState<SortingMethods>(SortingMethods.Choice);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [result, setResult] = useState<TSortingResult>({
    array: [],
    current: [],
    modified: [],
  });
  const [loader, setLoader] = useState(false);

  const displayAlgorithm = async () => {
    setLoader(true);

    const steps = sortableData.current.steps;
    let i = 0;

    while (i < steps.length) {
      setResult({ ...(steps[i] as TSortingResult) });

      if (i < steps.length - 1) {
        await setDelay(SHORT_DELAY_IN_MS);
      }

      i++;
    }

    setLoader(false);
  };

  const handleAscendingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (result.array.length > 0) {
      setDirection(Direction.Ascending);

      sortableData.current.method = method;
      sortableData.current.direction = Direction.Ascending;
      sortableData.current.data = result.array;

      sortableData.current.sortArray();

      displayAlgorithm();
    }
  };

  const handleDescendingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (result.array.length > 0) {
      setLoader(true);
      setDirection(Direction.Descending);

      sortableData.current.method = method;
      sortableData.current.direction = Direction.Descending;
      sortableData.current.data = result.array;

      sortableData.current.sortArray();

      displayAlgorithm();
    }
  };

  const handleSetNewArray = () => {
    setResult({
      array: randomArr(),
      current: [],
      modified: [],
    });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <fieldset className={styles.combination}>
          <RadioInput
            name={'sortingMethod'}
            onChange={() => setMethod(SortingMethods.Choice)}
            checked={method === SortingMethods.Choice}
            label={'Выбор'}
            disabled={loader}
          />
          <RadioInput
            name={'sortingMethod'}
            onChange={() => setMethod(SortingMethods.Bubble)}
            checked={method === SortingMethods.Bubble}
            label={'Пузырек'}
            disabled={loader}
          />
        </fieldset>
        <fieldset className={styles.combination}>
          <Button
            type={'submit'}
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            style={{ minWidth: '205px' }}
            onClick={handleAscendingClick}
            isLoader={loader && direction === Direction.Ascending}
            disabled={
              (loader && direction !== Direction.Ascending) ||
              result.array.length === 0
            }
          />
          <Button
            type={'submit'}
            text={'По убыванию'}
            sorting={Direction.Descending}
            style={{ minWidth: '205px' }}
            onClick={handleDescendingClick}
            isLoader={loader && direction === Direction.Descending}
            disabled={
              (loader && direction !== Direction.Descending) ||
              result.array.length === 0
            }
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Новый массив'}
          onClick={handleSetNewArray}
          style={{ minWidth: '205px' }}
          disabled={loader}
        />
      </form>

      <ul className={styles.results}>
        {result.array.length > 0 &&
          result.array.map((item: number, index: number) => {
            const isCurrent = result.current.includes(index);
            const isModified = result.modified.includes(index);
            
            const state = isCurrent
              ? ElementStates.Changing
              : isModified
              ? ElementStates.Modified
              : ElementStates.Default;

            return (
              <li key={index}>
                <Column
                  index={item}
                  state={state}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
