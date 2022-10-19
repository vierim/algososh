import React, { useEffect, useState } from 'react';
import { Direction } from '../../types/direction';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { randomArr } from './utils';

import styles from './sorting.module.css';

export const SortingPage: React.FC = () => {
  const [method, setMethod] = useState<string>('choice');
  const [result, setResult] = useState<number[]>([]);
  //const [solution, setSolution] = useState<number[]>([]);
  //const [step, setStep] = useState(-1);
  const [runnig, setRunning] = useState(false);
  //const [error, setError] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const method = evt.target.value;
    setMethod(method);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleSetNewArray = () => {
    setResult(randomArr());
  };

  const getNextElements = () => {};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <fieldset className={styles.combination}>
          <RadioInput
            name={'kind'}
            onChange={handleChange}
            value={'choice'}
            checked={method === 'choice'}
            label={'Выбор'}
          />
          <RadioInput
            name={'kind'}
            onChange={handleChange}
            value={'bubble'}
            checked={method === 'bubble'}
            label={'Пузырек'}
          />
        </fieldset>
        <fieldset className={styles.combination}>
          <Button
            type={'submit'}
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            style={{ minWidth: '205px' }}
            onClick={handleClick}
            isLoader={runnig}
          />
          <Button
            type={'submit'}
            text={'По убыванию'}
            sorting={Direction.Descending}
            style={{ minWidth: '205px' }}
            onClick={handleClick}
            isLoader={runnig}
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Новый массив'}
          onClick={handleSetNewArray}
          style={{ minWidth: '205px' }}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index}>
                <Column index={item} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
