import { FC } from 'react';

import styles from './scroll-row.module.css';

interface IScrollRowProps {
  children?: React.ReactNode;
}

export const ScrollRow: FC<IScrollRowProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
