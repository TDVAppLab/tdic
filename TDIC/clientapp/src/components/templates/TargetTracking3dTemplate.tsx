import { Box, Container } from '@mui/material'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { type FC, useEffect, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutSizeContext } from '@/store/layoutsizeprovider'
import { useUserLocationContext } from '@/store/userlocationprovider'
import type { Shape } from '@/types/shape'

const inter = Inter({ subsets: ['latin'] })

interface AreasizeValue {
  top: number
  left: number
  height: number
  width: number
}

const TdDisplay = dynamic(
  () => import('@/components/satposcalclation/tracking3dmode/tddisplay'),
  {
    ssr: false,
  },
)

const ClientPos = dynamic(
  () => import('@/components/satposcalclation/locatoning/clientpos'),
  {
    ssr: false,
  },
)
//src\components\satposcalclation\locatoning\clientpos.tsx

interface TargetTracking3dVisualizerProps {
  shapes: Shape[]
}

const TargetTracking3dVisualizer: FC<TargetTracking3dVisualizerProps> = ({
  shapes,
}) => {
  const userpos = useUserLocationContext()

  const layoutSize = useLayoutSizeContext()

  //MAPコンポーネント表示領域の高さを定義する変数
  const [areasizeValue, setAreasizeValue] = useState<AreasizeValue>({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  })
  //Windowサイズを取得する
  const { height, width } = useWindowSize()

  useEffect(() => {
    setAreasizeValue({
      top: layoutSize.headerHight,
      left: 0,
      height: height - layoutSize.headerHight - layoutSize.footerHight,
      width: width,
    })
  }, [height, width, layoutSize.headerHight, layoutSize.footerHight])

  return (
    <Container
      component={'div'}
      maxWidth={false}
      sx={{
        px: 0,
        py: 0,
        mx: 0,
        my: 0,
        height: `${areasizeValue.height}px`,
      }}
    >
      <Box
        component={'div'}
        style={{
          height: `${areasizeValue.height}px`,
          zIndex: 1,
        }}
      >
        {true && (
          <Box
            component={'div'}
            style={{
              position: 'absolute',
              zIndex: 5,
            }}
          >
            <ClientPos />
            <ul>
              <li>top : {areasizeValue.top}</li>
              <li>left : {areasizeValue.left}</li>
              <li>hight : {areasizeValue.height}</li>
              <li>width : {areasizeValue.width}</li>
              <li>header hight : {layoutSize.headerHight}</li>
              <li>window hight : {height}</li>
            </ul>
          </Box>
        )}
        {shapes ? (
          <TdDisplay
            shapes={shapes}
            baseUserLocation={{
              lat: userpos.userLatitude,
              lon: userpos.userLongitude,
            }}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Container>
  )
}

export default TargetTracking3dVisualizer
