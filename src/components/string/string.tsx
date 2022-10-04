import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {

  const [state, setState] = useState('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState(evt.target.value);
  }

  const handleClick = () => {
    setState('');
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input 
          type={"text"} 
          style={{height: "60px"}} 
          maxLength={11} 
          isLimitText={true} 
          value={state}
          onChange={handleChange}
        />
        <Button text={"Развернуть"} onClick={handleClick} />
      </div>
    </SolutionLayout>
  );
};
