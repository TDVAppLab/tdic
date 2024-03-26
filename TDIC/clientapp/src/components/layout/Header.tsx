import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import { IsAvailableWithoutProduction } from '@/constants'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutSizeContext } from '@/store/layoutsizeprovider'
import style from '@/styles/Header.module.scss'

import { useLocale } from '../utils/useLocale'

export default function Header() {
  const layoutSize = useLayoutSizeContext()
  const ref = useRef<HTMLDivElement>(null)

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { t } = useLocale()

  const router = useRouter()

  //Windowサイズを取得する
  const { height, width } = useWindowSize()

  useEffect(() => {
    if (ref.current) {
      //      console.log(ref.current.getBoundingClientRect())
      layoutSize.setHeaderHight(ref.current.getBoundingClientRect().height)
    }
  }, [height, width])

  const toggleMenuOpen = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const onClickLink = () => {
    toggleMenuOpen()
  }

  const onKeyDownLink = (e: any) => {
    if (e.code === 'Enter') {
      toggleMenuOpen()
    }
  }

  return (
    <header ref={ref} className={style.header}>
      <div className={style.headerInner}>
        <div className={style.headerLeft}>
          <div className={style.headerLogo}>
            <Link href="/">Sattrack</Link>
          </div>
        </div>
        <div className={style.headerRight}>
          <nav className={style.headerNav}>
            <ul className={style.headerNavList}>
              <li className={style.headerNavItem}>
                <Link href="/">Home</Link>
              </li>
              {
                //管理ページ(リンクは開発環境のみ出る)
                IsAvailableWithoutProduction && (
                  <li className={style.headerNavItem}>
                    <Link href="/admin">admin</Link>
                  </li>
                )
              }
            </ul>
          </nav>

          <div
            className={` ${style.headerMenu} ${isOpenMenu ? style.isOpen : ''}`}
          >
            <button
              type="button"
              className={style.headerMenuTrigger}
              aria-label="menu"
              onClick={toggleMenuOpen}
            >
              <div className={style.headerMenuTriggerLine} />
              <div className={style.headerMenuTriggerLine} />
              <div className={style.headerMenuTriggerLine} />
            </button>

            {isOpenMenu && (
              <nav className={style.headerMenuContent}>
                <h1 className={style.headerMenuTitle}>Menu</h1>
                <ul className={style.headerMenuNavList}>
                  <li className={style.headerMenuNaviItem}>
                    <Link
                      href="/"
                      onClick={onClickLink}
                      onKeyDown={onKeyDownLink}
                    >
                      Home
                    </Link>
                  </li>
                </ul>

                <ul className={style.headerMenuSnsList}>
                  <li className={style.headerMenuSnsItem}>
                    <Link href="https://twitter.com" target="_blank">
                      Twitter
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
