import React, { FC, PropsWithChildren } from 'react';
import styles from './MenuCard.module.css';

type Props = PropsWithChildren <{}>

const MenuCard: FC<Props> = ({ children }) => {
  return (
      <div className={styles.card}>
          <h1>{children}</h1>
    </div>
  )
}

export default MenuCard