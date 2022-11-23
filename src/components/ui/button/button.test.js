import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

const buttonText = 'Кнопка с текстом';

describe('Тестирование компонента Button', () => {
  it('Рендер кнопки с текстом', () => {
    const tree = renderer
      .create(<Button text={buttonText} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Рендер кнопки без текста', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Рендер заблокированной кнопки', () => {
    const tree = renderer
      .create(<Button disabled={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Рендер кнопки с индикацией загрузки', () => {
    const tree = renderer
      .create(<Button isLoader={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Вызов колбека по клику на кнопку', () => {
    const fn = jest.fn();
    
    render(<Button text={buttonText} onClick={fn} />);

    const button = screen.getByText(buttonText);
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
