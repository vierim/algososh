import React, { useEffect, useRef, useState } from 'react';

import { LinkedList } from './utils';
import { DEFAULT_LIST } from '../../constants/linked-list';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

import styles from './list.module.css';
import { ElementStates } from '../../types/element-states';
import { DELAY_IN_MS } from '../../constants/delays';
import { setDelay } from '../../utils/utils';

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList());

  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [result, setResult] = useState<Array<unknown>>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [action, setAction] = useState<
    | 'AddToHead'
    | 'AddToTail'
    | 'DeleteFromHead'
    | 'DeleteFromTail'
    | 'AddByIndex'
    | 'DeleteByIndex'
    | undefined
  >(undefined);

  const [currentElement, setCurrentElement] = useState('');
  const [smallCircleIndex, setSmallCircleIndex] = useState(-1);
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndex, setChangingIndex] = useState(-1);
  const [smallCirclePosition, setSmallCirclePosition] = useState<
    'top' | 'bottom' | undefined
  >(undefined);

  const showCurrentResult = () => {
    setResult(
      linkedList.current.toArray().map((item) => {
        return item;
      })
    );
  };

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleIndexChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  const handleAddHeadClick = async () => {
    setLoader(true);
    setAction('AddToHead');

    linkedList.current.prepend(value);

    if (result.length > 0) {
      setCurrentElement(value);
      setValue('');

      setSmallCirclePosition('top');
      setSmallCircleIndex(0);
      await setDelay(DELAY_IN_MS);

      setSmallCircleIndex(-1);
      setModifiedIndex(0);
      showCurrentResult();
      await setDelay(DELAY_IN_MS);

      setModifiedIndex(-1);
      setSmallCirclePosition(undefined);
    } else {
      setValue('');
      showCurrentResult();
      setModifiedIndex(0);

      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
    }

    setLoader(false);
    setAction(undefined);
  };

  const handleAddTailClick = async () => {
    setLoader(true);
    setAction('AddToTail');

    linkedList.current.append(value);

    if (result.length > 0) {
      setCurrentElement(value);
      setValue('');

      setSmallCirclePosition('top');
      setSmallCircleIndex(linkedList.current.listSize - 2);
      await setDelay(DELAY_IN_MS);

      setSmallCircleIndex(-1);
      setModifiedIndex(linkedList.current.listSize - 1);
      showCurrentResult();
      await setDelay(DELAY_IN_MS);

      setModifiedIndex(-1);
      setSmallCirclePosition(undefined);
    } else {
      setValue('');
      showCurrentResult();
      setModifiedIndex(0);

      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
    }

    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteHeadClick = async () => {
    setLoader(true);
    setAction('DeleteFromHead');

    setSmallCirclePosition('bottom');
    setSmallCircleIndex(0);
    setCurrentElement(result[0] as string);
    setResult((prev) => ['', ...prev.slice(1)]);
    await setDelay(DELAY_IN_MS);

    setSmallCircleIndex(-1);
    setSmallCirclePosition(undefined);

    linkedList.current.deleteHead();
    showCurrentResult();

    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteTailClick = async () => {
    setLoader(true);
    setAction('DeleteFromTail');

    setSmallCirclePosition('bottom');
    setSmallCircleIndex(result.length - 1);
    setCurrentElement(result[result.length - 1] as string);
    setResult((prev) => [...prev.slice(0, result.length - 1), '']);
    await setDelay(DELAY_IN_MS);

    setSmallCircleIndex(-1);
    setSmallCirclePosition(undefined);

    linkedList.current.deleteTail();
    showCurrentResult();

    setLoader(false);
    setAction(undefined);
  };

  const handleAddByIndex = async () => {
    setLoader(true);
    setAction('AddByIndex');

    let currentIndex = 0;

    while (currentIndex <= Number.parseInt(index)) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }

    setSmallCirclePosition('top');
    setSmallCircleIndex(Number.parseInt(index));
    setCurrentElement(value);
    await setDelay(DELAY_IN_MS);

    linkedList.current.addByIndex(value, Number.parseInt(index));

    setSmallCircleIndex(-1);
    setModifiedIndex(Number.parseInt(index));
    showCurrentResult();

    await setDelay(DELAY_IN_MS);

    setModifiedIndex(-1);
    setChangingIndex(-1);
    setSmallCirclePosition(undefined);

    setValue('');
    setIndex('');

    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteByIndex = async () => {
    setLoader(true);
    setAction('DeleteByIndex');

    let currentIndex = 0;

    while (currentIndex <= Number.parseInt(index)) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }

    setSmallCirclePosition('bottom');
    setSmallCircleIndex(Number.parseInt(index));

    setCurrentElement(result[Number.parseInt(index)] as string);
    setResult((prev) => [
      ...prev.slice(0, Number.parseInt(index)),
      '',
      ...prev.slice(Number.parseInt(index) + 1),
    ]);
    await setDelay(DELAY_IN_MS);

    setSmallCircleIndex(-1);
    setChangingIndex(-1);
    setSmallCirclePosition(undefined);

    linkedList.current.deleteByIndex(Number.parseInt(index));
    setIndex('');
    showCurrentResult();

    setLoader(false);
    setAction(undefined);
  };

  const isCorrectAddByIndex = (): boolean | undefined => {
    return !(
      index.length !== 0 &&
      value.length !== 0 &&
      Number.parseInt(index) > -1 &&
      Number.parseInt(index) < linkedList.current.listSize
    );
  };

  const isCorrectDeleteByIndex = (): boolean | undefined => {
    return !(
      index.length !== 0 &&
      Number.parseInt(index) > -1 &&
      Number.parseInt(index) < linkedList.current.listSize
    );
  };

  useEffect(() => {
    DEFAULT_LIST.forEach((item) => {
      linkedList.current.append(item);
    });

    showCurrentResult();
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            placeholder={'Введите значение'}
            maxLength={4}
            isLimitText={true}
            value={value}
            onChange={handleValueChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            text={'Добавить в head'}
            style={{ minWidth: '175px' }}
            onClick={handleAddHeadClick}
            isLoader={loader && action === 'AddToHead'}
            disabled={(loader && action !== 'AddToHead') || value.length === 0}
          />
          <Button
            type={'button'}
            text={'Добавить в tail'}
            style={{ minWidth: '175px' }}
            onClick={handleAddTailClick}
            isLoader={loader && action === 'AddToTail'}
            disabled={(loader && action !== 'AddToTail') || value.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить из head'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteHeadClick}
            isLoader={loader && action === 'DeleteFromHead'}
            disabled={
              (loader && action !== 'DeleteFromHead') || result.length === 0
            }
          />
          <Button
            type={'button'}
            text={'Удалить из tail'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteTailClick}
            isLoader={loader && action === 'DeleteFromTail'}
            disabled={
              (loader && action !== 'DeleteFromTail') || result.length === 0
            }
          />
        </fieldset>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            placeholder={'Введите индекс'}
            value={index}
            onChange={handleIndexChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            text={'Добавить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleAddByIndex}
            isLoader={loader && action === 'AddByIndex'}
            disabled={
              (loader && action !== 'AddByIndex') || isCorrectAddByIndex()
            }
          />
          <Button
            type={'button'}
            text={'Удалить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleDeleteByIndex}
            isLoader={loader && action === 'DeleteByIndex'}
            disabled={
              (loader && action !== 'DeleteByIndex') || isCorrectDeleteByIndex()
            }
          />
        </fieldset>
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                <Circle
                  letter={`${item}`}
                  index={index}
                  state={
                    modifiedIndex === index
                      ? ElementStates.Modified
                      : changingIndex >= index
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  head={
                    smallCircleIndex === index &&
                    smallCirclePosition === 'top' ? (
                      <Circle
                        letter={currentElement}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    ) : index === 0 ? (
                      'head'
                    ) : undefined
                  }
                  tail={
                    smallCircleIndex === index &&
                    smallCirclePosition === 'bottom' ? (
                      <Circle
                        letter={currentElement}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    ) : index === result.length - 1 ? (
                      'tail'
                    ) : undefined
                  }
                />
                {index !== result.length - 1 && (
                  <ArrowIcon
                    fill={changingIndex - 1 >= index ? '#d252e1' : undefined}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
