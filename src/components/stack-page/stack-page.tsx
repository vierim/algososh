import React, { useEffect, useState } from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './stack.module.css';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<any>([]);
  const [step, setStep] = useState<number>(-1);
  const [runnig, setRunning] = useState<boolean>(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleAddClick = () => {
    
  };

  const handleRemoveClick = () => {
    
  };

  const handleCleanClick = () => {
    
  };

  const reverseElements = () => {
    if (step < 0) {
      return;
    }
  };

  useEffect(() => {
    //window.setTimeout(() => reverseElements(), DELAY_IN_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

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
            isLoader={runnig}
            disabled={value.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить'}
            onClick={handleRemoveClick}
            isLoader={runnig}
            disabled={result.length === 0}
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Очистить'}
          onClick={handleCleanClick}
          isLoader={runnig}
          disabled={result.length === 0}
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item: any, index: any) => {
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
