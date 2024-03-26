import { Container } from '@mui/material'
import { Inter } from 'next/font/google'

import { useLocale } from '@/components/utils/useLocale'

const inter = Inter({ subsets: ['latin'] })

//プライバシーポリシーページ
export default function Privacy() {
  const { t } = useLocale()

  return <Container maxWidth={false} sx={{ py: 2 }}></Container>
}

Privacy.title = 'Privacy'
