import { FC } from 'react';

import styles from './scroll-row.module.css';

export const ScrollRow: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
