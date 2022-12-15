import styles from './Layout.module.css'

import React, { FC, PropsWithChildren } from 'react'
import MainNavigation from '../nav/MainNavigation'

type LayoutProps = PropsWithChildren<{}>

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <MainNavigation />
        <main className={styles.main}>{ children }</main>
      </div>
  )
}

export default Layout