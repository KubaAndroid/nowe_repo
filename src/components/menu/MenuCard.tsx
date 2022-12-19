import React, { FC, PropsWithChildren } from 'react';
import styles from './MenuCard.module.css';

type Props = PropsWithChildren <{}>

const MenuCard: FC<Props> = ({ children }) => {
  return (
      <div className={styles.card}>
          {children}
    </div>
  )
}

export default MenuCard