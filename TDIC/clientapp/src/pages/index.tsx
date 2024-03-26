import { Inter } from 'next/font/google'

import TargetTrackingTemplate from '@/components/templates/TargetTrackingTemplate'
import { useLocale } from '@/components/utils/useLocale'
import { useTleContext } from '@/store/tleprovider'
//import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

//衛星追跡ページ
export default function TargetTracking() {
  const { t } = useLocale()

  //const ttle = trpc.tleRouter.getTleString.useQuery()

  const tlecontext = useTleContext()

  return (
    <>
      <TargetTrackingTemplate
        tle={tlecontext.targetTleString}
        observerGd={undefined}
        orbitalPasses={[]}
      />
    </>
  )
}

TargetTracking.title = 'Track'
