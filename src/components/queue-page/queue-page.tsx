import { FC, useState, useRef } from 'react';
import { useForm } from '../../hooks/useForm';

import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { QUEUE_LEN } from '../../constants/queue';

import { Queue } from './utils';
import { setDelay } from '../../utils/utils';

import { ActionStates as Actions, ElementStates } from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './queue.module.css';

export const QueuePage: FC = () => {
  const queue = useRef(new Queue(QUEUE_LEN));

  const { values, handleChange, clearValue } = useForm({ value: '' });
  const value = values['value'];

  const [result, setResult] = useState<(string | null)[]>(
    new Array(QUEUE_LEN).fill(null)
  );
  const [action, setAction] = useState<Actions>(Actions.Waiting);
  const [instant, setInstant] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const showDataFromQueue = () => {
    setResult(
      queue.current.toArray().map((item) => (item !== null ? String(item) : ''))
    );
  };

  const showIncreaseQueue = async () => {
    const currentValue = value;
    clearValue('value');

    setInstant(
      queue.current.isEmpty
        ? queue.current.tail
        : queue.current.tail + 1
    );
    await setDelay(SHORT_DELAY_IN_MS);

    queue.current.enqueue(currentValue);
    showDataFromQueue();
    await setDelay(SHORT_DELAY_IN_MS);

    setInstant(-1);
    setLoader(false);
    setAction(Actions.Waiting);
  };

  const showDecreaseQueue = async () => {
    setInstant(queue.current.head);
    await setDelay(SHORT_DELAY_IN_MS);

    queue.current.dequeue();
    showDataFromQueue();
    setInstant(queue.current.head);
    await setDelay(SHORT_DELAY_IN_MS);

    setInstant(-1);
    setLoader(false);
    setAction(Actions.Waiting);
  };

  const handleAddClick = () => {
    setLoader(true);
    setAction(Actions.AddToTail);

    showIncreaseQueue();
  };

  const handleRemoveClick = () => {
    setLoader(true);
    setAction(Actions.DeleteFromHead);

    showDecreaseQueue();
  };

  const handleCleanClick = () => {
    clearValue('value');
    queue.current.clear();
    showDataFromQueue();
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            maxLength={4}
            isLimitText={true}
            value={value}
            name={'value'}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            name={'add'}
            text={'Добавить'}
            onClick={handleAddClick}
            isLoader={loader && action === Actions.AddToTail}
            disabled={
              (loader && action !== Actions.AddToTail) ||
              value.length === 0 ||
              queue.current.isFull
            }
          />
          <Button
            type={'button'}
            name={'delete'}
            text={'Удалить'}
            onClick={handleRemoveClick}
            isLoader={loader && action === Actions.DeleteFromHead}
            disabled={
              (loader && action !== Actions.DeleteFromHead) ||
              queue.current.isEmpty
            }
          />
        </fieldset>
        <Button
          type={'button'}
          name={'clear'}
          text={'Очистить'}
          onClick={handleCleanClick}
          disabled={
            loader ||
            (queue.current.tail === 0 && queue.current.length === 0)
          }
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            let isHead: boolean;
            let isTail: boolean;

            let isEmpty = queue.current.isEmpty;
            let nullablePosition =
              queue.current.head === 0 &&
              queue.current.tail === 0;

            if (isEmpty && nullablePosition) {
              isHead = false;
              isTail = false;
            } else {
              isHead = index === queue.current.head;
              isTail = index === queue.current.tail;
            }

            return (
              <li key={index}>
                <Circle
                  letter={item ? item : ''}
                  index={index}
                  head={isHead ? 'head' : undefined}
                  tail={isTail ? 'tail' : undefined}
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
    </SolutionLayout>
  );
};
