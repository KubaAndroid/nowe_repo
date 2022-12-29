import styles from './Layout.module.css'

import React, { FC, PropsWithChildren } from 'react'
import MainNavigation from '../nav/MainNavigation'
import Footer from '../footer/Footer'

type LayoutProps = PropsWithChildren<{}>

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <MainNavigation />
        {/* <main className={styles.main}>{children}</main> */}
        <main>{children}</main>
        <Footer />
      </div>
  )
}

export default Layout