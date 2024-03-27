import { Inter } from 'next/font/google'

import { useLocale } from '@/components/utils/useLocale'

const inter = Inter({ subsets: ['latin'] })

//衛星追跡ページ
export default function TargetTracking() {
  const { t } = useLocale()


  return (
    <>
    </>
  )
}

TargetTracking.title = 'Track'
