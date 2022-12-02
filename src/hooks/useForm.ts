import { useState, ChangeEvent } from 'react';

interface IInputValues {
  [key: string]: string;
}

export function useForm(inputValues: IInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearValue = (name: string) => {
    setValues((prevState) => ({ ...prevState, [name]: '' }));
  };

  return { values, handleChange, setValues, clearValue };
}
