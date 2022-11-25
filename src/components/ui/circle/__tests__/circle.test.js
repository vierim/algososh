import renderer from 'react-test-renderer';
import { ElementStates } from '../../../../types';

import { Circle } from '../circle';

describe('Тестирование компонента Circle', () => {
  test('Рендер компонента без буквы', () => {
    const tree = renderer
      .create(<Circle />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Рендер компонента с буквами', () => {
    const tree = renderer
      .create(<Circle letter='123' />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Рендер компонента с head', () => {
    const tree = renderer
      .create(<Circle head={'head'} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Рендер компонента с React-элементом в head', () => {
    const tree = renderer
      .create(<Circle head={<div>ReactElement</div>} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // с tail;
  test('Рендер компонента с tail', () => {
    const tree = renderer
      .create(<Circle tail={'tail'} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // с react-элементом в tail;
  test('Рендер компонента с React-элементом в tail', () => {
    const tree = renderer
      .create(<Circle tail={<div>ReactElement</div>} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // с index;

  test('Рендер компонента с индексом', () => {
    const tree = renderer
      .create(<Circle index={1} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // с пропом isSmall ===  true;
  test('Рендер компонента isSmall ===  true', () => {
    const tree = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // в состоянии default;
  test('Рендер компонента в состоянии default', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  
  // в состоянии changing;
  test('Рендер компонента в состоянии changing', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // в состоянии modified.
  test('Рендер компонента в состоянии modified', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
