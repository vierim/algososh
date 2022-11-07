import React, { useEffect, useRef, useState } from 'react';

import { LinkedList } from './utils';
import { DEFAULT_LIST } from '../../constants/linked-list';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';

import styles from './list.module.css';

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList());

  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [result, setResult] = useState<Array<unknown>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const showCurrentResult = () => {
    setResult(linkedList.current.toArray().map(item => { return item }));
  }

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleIndexChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  const handleAddHeadClick = () => {
    linkedList.current.prepend(value);
    
    setValue('');
    showCurrentResult();
  };

  const handleAddTailClick = () => {
    linkedList.current.append(value);

    setValue('');
    showCurrentResult();
  };

  const handleDeleteHeadClick = () => {
    linkedList.current.deleteHead();
    showCurrentResult();
  }

  const handleDeleteTailClick = () => {
    linkedList.current.deleteTail();
    showCurrentResult();
  }

  const handleAddByIndex = () => {
    linkedList.current.addByIndex(value, Number.parseInt(index));

    setValue('');
    setIndex('');
    showCurrentResult();
  }

  const handleDeleteByIndex = () => {
    linkedList.current.deleteByIndex(Number.parseInt(index));

    setIndex('');
    showCurrentResult();
  }

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
          />
          <Button
            type={'button'}
            text={'Добавить в head'}
            style={{ minWidth: '175px' }}
            onClick={handleAddHeadClick}
            isLoader={loader}
            disabled={value.length === 0}
          />
          <Button
            type={'button'}
            text={'Добавить в tail'}
            style={{ minWidth: '175px' }}
            onClick={handleAddTailClick}
            isLoader={loader}
            disabled={value.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить из head'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteHeadClick}
            isLoader={loader}
            disabled={result.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить из tail'}
            style={{ minWidth: '175px' }}
            onClick={handleDeleteTailClick}
            isLoader={loader}
            disabled={result.length === 0}
          />
        </fieldset>
        <fieldset className={styles.form__group}>
          <Input
            type={'text'}
            placeholder={'Введите индекс'}
            value={index}
            onChange={handleIndexChange}
          />
          <Button
            type={'button'}
            text={'Добавить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleAddByIndex}
            isLoader={loader}
            disabled={index.length === 0 || value.length === 0}
          />
          <Button
            type={'button'}
            text={'Удалить по индексу'}
            style={{ minWidth: '362px' }}
            onClick={handleDeleteByIndex}
            isLoader={loader}
            disabled={index.length === 0 || result.length === 0}
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
                  head={index === 0 ? 'head' : undefined}
                  tail={index === result.length - 1 ? 'tail' : undefined}
                />
                {index !== result.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
