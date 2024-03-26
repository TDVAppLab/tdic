import { Box, Container } from '@mui/material'
import type { Satellite } from '@prisma/client'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { type FC, useEffect, useState } from 'react'
import { type GeodeticLocation } from 'satellite.js'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutSizeContext } from '@/store/layoutsizeprovider'
import { type OrbitalPass } from '@/types/OrbitalPass'

const inter = Inter({ subsets: ['latin'] })

interface AreasizeValue {
  top: number
  left: number
  height: number
  width: number
}

const TargetTrackingVisualizer = dynamic(
  () => import('@/components/satposcalclation/TargetTrackingVisualizer'),
  {
    ssr: false,
  },
)

export type StposTemplateProps = {
  tle: Satellite | undefined
  observerGd: GeodeticLocation | undefined
  orbitalPasses: OrbitalPass[]
}

const TargetTrackingTemplate: FC<StposTemplateProps> = ({
  tle,
  observerGd,
  orbitalPasses,
}) => {
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
          //backgroundColor: 'blue',
          zIndex: 1,
        }}
        //item
        sx={{ px: 0, py: 0, mx: 0, my: 0 }}
      >
        {false && (
          <>
            {' '}
            <div>top : {areasizeValue.top}</div>
            <div>left : {areasizeValue.left}</div>
            <div>hight : {areasizeValue.height}</div>
            <div>width : {areasizeValue.width}</div>
            <div>header hight : {layoutSize.headerHight}</div>
            <div>window hight : {height}</div>
          </>
        )}
        {tle ? (
          <TargetTrackingVisualizer
            tle={tle}
            observerGd={observerGd}
            orbitalPass={orbitalPasses[0] ?? undefined}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Container>
  )
}

export default TargetTrackingTemplate
