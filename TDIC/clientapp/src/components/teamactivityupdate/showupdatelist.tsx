import type { MultiobjectiveText } from '@prisma/client'
import { marked } from 'marked'

import stylesCommon from '@/styles/common.module.scss'
import stylesUpdates from '@/styles/updates.module.scss'

import { useLocale } from '../utils/useLocale'

interface Props {
  multiobjectiveTexts: MultiobjectiveText[]
}

//UPDATESの一覧を表示するためのコンポーネント(メイン画面用)
const ShowUpdateList = ({ multiobjectiveTexts }: Props) => {
  const { t, locale } = useLocale()

  return (
    <div className={stylesCommon['content-section']}>
      <h1 className={stylesCommon['page-title']}>News</h1>
      <ul className={stylesUpdates['news-list']}>
        {multiobjectiveTexts.map((multiobjectiveText) => {
          return (
            <li
              className={stylesUpdates['news-list-item']}
              key={multiobjectiveText.id}
            >
              <div className={stylesUpdates['news-list-item-date']}>
                {multiobjectiveText.displayDate}
              </div>
              {locale === 'ja' ? (
                <div
                  className={stylesUpdates['news-list-item-content']}
                  dangerouslySetInnerHTML={{
                    __html: marked(multiobjectiveText.scriptJp),
                  }}
                />
              ) : (
                <div
                  className={stylesUpdates['news-list-item-content']}
                  dangerouslySetInnerHTML={{
                    __html: marked(multiobjectiveText.scriptEn),
                  }}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ShowUpdateList
