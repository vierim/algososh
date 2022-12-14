import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import {
  DELAY_IN_MS,
  MIN_LIST_LEN,
  MAX_LIST_LEN,
  MIN_LIST_VALUE,
  MAX_LIST_VALUE,
} from '../../constants';

import { LinkedList } from './utils';
import { getRandomArr, setDelay } from '../../utils/utils';

import { ActionStates as Actions, ElementStates, Positions } from '../../types';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

import styles from './list.module.css';
import { ScrollRow } from '../ui/scroll-row/scroll-row';

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList(
      getRandomArr({
        minLength: MIN_LIST_LEN,
        maxLength: MAX_LIST_LEN,
        minValue: MIN_LIST_VALUE,
        maxValue: MAX_LIST_VALUE,
      }).map((item) => String(item))
    )
  );

  const { values, handleChange, clearValue } = useForm({
    chars: {
      value: ''
    },
    index: {
      value: '',
      onlyDigits: true
    }
  });

  const chars = values['chars'].value;
  const index = values['index'].value;

  const [result, setResult] = useState<string[]>([]);

  const [loader, setLoader] = useState<boolean>(false);
  const [action, setAction] = useState<Actions | undefined>(undefined);

  const [currentElement, setCurrentElement] = useState('');
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndex, setChangingIndex] = useState(-1);

  const [smallCircleIndex, setSmallCircleIndex] = useState(-1);
  const [smallCirclePosition, setSmallCirclePosition] = useState<
    Positions | undefined
  >(undefined);

  const showCurrentResult = () => {
    setResult(
      linkedList.current.toArray().map((item) => {
        return item;
      })
    );
  };

  const handleAddHeadClick = async () => {
    setLoader(true);
    setAction(Actions.AddToHead);

    linkedList.current.prepend(chars);

    if (result.length > 0) {
      setCurrentElement(chars);
      clearValue('chars');

      setSmallCirclePosition(Positions.Top);
      setSmallCircleIndex(0);
      await setDelay(DELAY_IN_MS);

      setSmallCircleIndex(-1);
      setModifiedIndex(0);
      showCurrentResult();
      await setDelay(DELAY_IN_MS);

      setModifiedIndex(-1);
      setSmallCirclePosition(undefined);
    } else {
      clearValue('chars');
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
    setAction(Actions.AddToTail);

    linkedList.current.append(chars);

    if (result.length > 0) {
      setCurrentElement(chars);
      clearValue('chars');

      setSmallCirclePosition(Positions.Top);
      setSmallCircleIndex(linkedList.current.listSize - 2);
      await setDelay(DELAY_IN_MS);

      setSmallCircleIndex(-1);
      setModifiedIndex(linkedList.current.listSize - 1);
      showCurrentResult();
      await setDelay(DELAY_IN_MS);

      setModifiedIndex(-1);
      setSmallCirclePosition(undefined);
    } else {
      clearValue('chars');
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
    setAction(Actions.DeleteFromHead);

    setSmallCirclePosition(Positions.Bottom);
    setSmallCircleIndex(0);
    setCurrentElement(result[0]);
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
    setAction(Actions.DeleteFromTail);

    setSmallCirclePosition(Positions.Bottom);
    setSmallCircleIndex(result.length - 1);
    setCurrentElement(result[result.length - 1]);
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
    setAction(Actions.AddByIndex);

    let currentIndex = 0;

    while (currentIndex <= Number.parseInt(index)) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }

    setSmallCirclePosition(Positions.Top);
    setSmallCircleIndex(Number.parseInt(index));
    setCurrentElement(chars);
    await setDelay(DELAY_IN_MS);

    linkedList.current.addByIndex(chars, Number.parseInt(index));

    setSmallCircleIndex(-1);
    setModifiedIndex(Number.parseInt(index));
    showCurrentResult();

    await setDelay(DELAY_IN_MS);

    setModifiedIndex(-1);
    setChangingIndex(-1);
    setSmallCirclePosition(undefined);

    clearValue('chars');
    clearValue('index');

    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteByIndex = async () => {
    setLoader(true);
    setAction(Actions.DeleteByIndex);

    let currentIndex = 0;

    while (currentIndex <= Number.parseInt(index)) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }

    setSmallCirclePosition(Positions.Bottom);
    setSmallCircleIndex(Number.parseInt(index));

    setCurrentElement(result[Number.parseInt(index)]);
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
    clearValue('index');
    showCurrentResult();

    setLoader(false);
    setAction(undefined);
  };

  const isCorrectAddByIndex = (): boolean | undefined => {
    return !(
      chars.length !== 0 &&
      Number.parseInt(index) > -1 &&
      Number.parseInt(index) < linkedList.current.listSize
    );
  };

  const isCorrectDeleteByIndex = (): boolean | undefined => {
    return !(
      Number.parseInt(index) > -1 &&
      Number.parseInt(index) < linkedList.current.listSize
    );
  };

  const composeHeadProperty = (index: number) => {
    return smallCircleIndex === index &&
      smallCirclePosition === Positions.Top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      'head'
    ) : undefined;
  };

  const composeTailProperty = (index: number) => {
    return smallCircleIndex === index &&
      smallCirclePosition === Positions.Bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === result.length - 1 ? (
      'tail'
    ) : undefined;
  };

  useEffect(() => {
    showCurrentResult();  
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            name={'chars'}
            value={chars}
            maxLength={4}
            isLimitText={true}
            placeholder={'Введите значение'}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            name={'addToHeadButton'}
            text={'Добавить в head'}
            style={{ minWidth: '175px' }}
            onClick={handleAddHeadClick}
            isLoader={loader && action === Actions.AddToHead}
            disabled={
              (loader && action !== Actions.AddToHead) || chars.length === 0
            }
          />
          <Button
            type={'button'}
            name={'addToTailButton'}
            text={'Добавить в tail'}
            style={{ minWidth: '175px' }}
            onClick={handleAddTailClick}
            isLoader={loader && action === Actions.AddToTail}
            disabled={
              (loader && action !== Actions.AddToTail) || chars.length === 0
            }
          />
          <Button
            type={'button'}
            name={'deleteFromHeadButton'}
            text={'Удалить из head'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteHeadClick}
            isLoader={loader && action === Actions.DeleteFromHead}
            disabled={
              (loader && action !== Actions.DeleteFromHead) ||
              result.length === 0
            }
          />
          <Button
            type={'button'}
            name={'deleteFromTailButton'}
            text={'Удалить из tail'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteTailClick}
            isLoader={loader && action === Actions.DeleteFromTail}
            disabled={
              (loader && action !== Actions.DeleteFromTail) ||
              result.length === 0
            }
          />
        </fieldset>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            placeholder={'Введите индекс'}
            value={index}
            name={'index'}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            name={'addByIndexButton'}
            text={'Добавить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleAddByIndex}
            isLoader={loader && action === Actions.AddByIndex}
            disabled={
              (loader && action !== Actions.AddByIndex) || isCorrectAddByIndex()
            }
          />
          <Button
            type={'button'}
            name={'deleteByIndexButton'}
            text={'Удалить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleDeleteByIndex}
            isLoader={loader && action === Actions.DeleteByIndex}
            disabled={
              (loader && action !== Actions.DeleteByIndex) ||
              isCorrectDeleteByIndex()
            }
          />
        </fieldset>
      </form>

      <ScrollRow>
        <ul className={styles.results}>
          {result.length > 0 &&
            result.map((item, index) => {
              const currentState =
                modifiedIndex === index
                  ? ElementStates.Modified
                  : changingIndex >= index
                  ? ElementStates.Changing
                  : ElementStates.Default;

              const head = composeHeadProperty(index);
              const tail = composeTailProperty(index);

              return (
                <li key={index} className={styles.item}>
                  <Circle
                    letter={`${item}`}
                    index={index}
                    state={currentState}
                    head={head}
                    tail={tail}
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
      </ScrollRow>
    </SolutionLayout>
  );
};
