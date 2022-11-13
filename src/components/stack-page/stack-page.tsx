import { FC, useState, useRef, ChangeEvent } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';

import { Stack } from './utils';
import { setDelay } from '../../utils/utils';

import { ActionStates as Actions, ElementStates } from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './stack.module.css';
import { ScrollRow } from '../ui/scroll-row/scroll-row';

export const StackPage: FC = () => {
  const stackRef = useRef(new Stack());

  const [value, setValue] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [action, setAction] = useState<Actions>(Actions.Waiting);
  const [instant, setInstant] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const showDataFromStack = () => {
    const stack = stackRef.current.toArray();
    setResult(stack.length > 0 ? stack.map((item) => String(item)) : []);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleAddClick = async () => {
    setLoader(true);
    stackRef.current.push(value);

    setInstant(stackRef.current.lastIndex);
    setAction(Actions.AddToTail);
    setValue('');

    showDataFromStack();
    await setDelay(DELAY_IN_MS);

    setInstant(-1);
    setAction(Actions.Waiting);
    setLoader(false);
    showDataFromStack();
  };

  const handleRemoveClick = async () => {
    setLoader(true);
    setInstant(stackRef.current.lastIndex);
    setAction(Actions.DeleteFromTail);
    await setDelay(DELAY_IN_MS);

    stackRef.current.pop();

    setInstant(-1);
    setAction(Actions.Waiting);
    setLoader(false);
    showDataFromStack();
  };

  const handleCleanClick = () => {
    stackRef.current.clear();
    showDataFromStack();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            maxLength={4}
            isLimitText={true}
            value={value}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            text={'Добавить'}
            onClick={handleAddClick}
            isLoader={loader && action === Actions.AddToTail}
            disabled={
              value.length === 0 || (loader && action !== Actions.AddToTail)
            }
          />
          <Button
            type={'button'}
            text={'Удалить'}
            onClick={handleRemoveClick}
            isLoader={loader && action === Actions.DeleteFromTail}
            disabled={
              result.length === 0 ||
              (loader && action !== Actions.DeleteFromTail)
            }
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Очистить'}
          onClick={handleCleanClick}
          disabled={loader || result.length === 0}
        />
      </form>

      <ScrollRow>
        <ul className={styles.results}>
          {result.length > 0 &&
            result.map((item, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={item}
                    index={index}
                    head={index === result?.length - 1 ? 'top' : undefined}
                    state={
                      index === instant
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            })}
        </ul>
      </ScrollRow>
    </SolutionLayout>
  );
};
