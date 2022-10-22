import React, { useEffect, useState, useRef } from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { Queue } from './utils';

import { Actions } from '../../types/actions';
import { ElementStates } from '../../types/element-states';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import styles from './queue.module.css';

const QUEUE_LEN = 7;

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Array<string | null>>(
    new Array(QUEUE_LEN).fill(null)
  );
  const [action, setAction] = useState<Actions>(Actions.Waiting);
  const [instant, setInstant] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const queueRef = useRef(new Queue(QUEUE_LEN));

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleAddClick = (evt: React.MouseEvent) => {
    // if(!queueRef.current.isFull()) {
    queueRef.current.insert(value);
    console.log(queueRef.current);
    showDataFromQueue();
    setValue('');
    // setResult(queueRef.current.getAllItems().map((item) => item));
    // }

    // setLoader(true);
    // setValue('');

    // queueRef.current.push(value);
    // setAction(Actions.Push);
  };

  const handleRemoveClick = () => {
    // if(!queueRef.current.isEmpty()) {
    queueRef.current.remove();
    console.log(queueRef.current);
    showDataFromQueue();
    // setResult(queueRef.current.getAllItems().map((item) => item));
    // }
    // setLoader(true);

    // queueRef.current.pop();
    // setAction(Actions.Pop);
  };

  const handleCleanClick = () => {
    queueRef.current.clear();
    console.log(queueRef.current);
    showDataFromQueue();
  };

  const showIncreaseStack = () => {
    // showDataFromStack();
    // setAction(Actions.Waiting);
    // window.setTimeout(() => setInstant(-1), DELAY_IN_MS);
  };

  const showDecreaseStack = () => {
    // if (result.length > 0) {
    //   setResult((prev) =>
    //     prev.map((item, index) => {
    //       return {
    //         value: item.value,
    //         state:
    //           index === instant
    //             ? ElementStates.Changing
    //             : ElementStates.Default,
    //       };
    //     })
    //   );
    // }
    // setAction(Actions.Waiting);
    // window.setTimeout(() => setInstant(-1), DELAY_IN_MS);
  };

  const showDataFromQueue = () => {
    const actualQueue = queueRef.current.getAllItems().map((item) => item);
    setResult(actualQueue);

    // if (stack && stack.length > 0) {
    // setResult(actualQueue);
    //     stack.map((item, index) => {
    //       return {
    //         value: item,
    //         state:
    //           index === instant
    //             ? ElementStates.Changing
    //             : ElementStates.Default,
    //       };
    //     })
    //   );
    // } else {
    //   setResult([]);
    // }
  };

  useEffect(() => {
    // if (action === Actions.Push) {
    //   showIncreaseStack();
    // } else if (action === Actions.Pop) {
    //   showDecreaseStack();
    // } else {
    //   showDataFromStack();
    //   setLoader(false);
    // }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant]);

  useEffect(() => {
    // if (action === Actions.Push) {
    //   setInstant(queueRef.current.getLastIndex());
    // } else if (action === Actions.Pop) {
    //   if (queueRef.current.getSize() > 0) {
    //     setInstant(queueRef.current.getLastIndex() + 1);
    //   } else {
    //     setInstant(queueRef.current.getLastIndex());
    //   }
    // }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  return (
    <SolutionLayout title="Очередь">
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
            disabled={queueRef.current.isEmpty()}
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Очистить'}
          onClick={handleCleanClick}
          disabled={
            result.every((item) => item === null) &&
            queueRef.current.getTailPosition() !== queueRef.current.getSize()
          }
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            let isHead: boolean;
            let isTail: boolean;

            let isEmpty = queueRef.current.isEmpty();
            let nullablePosition =
              queueRef.current.getHeadPosition() === 0 &&
              queueRef.current.getTailPosition() === 0;

            if (isEmpty && nullablePosition) {
              isHead = false;
              isTail = false;
            } else {
              isHead = index === queueRef.current.getHeadPosition();
              isTail = index === queueRef.current.getTailPosition();
            }

            return (
              <li key={index}>
                <Circle
                  letter={item ? item : ''}
                  index={index}
                  head={isHead ? 'head' : undefined}
                  tail={isTail ? 'tail' : undefined}
                  // state={item.state}
                />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
