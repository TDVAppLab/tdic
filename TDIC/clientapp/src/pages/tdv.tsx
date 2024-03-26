import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

import TargetTracking3dVisualizer from '@/components/templates/TargetTracking3dTemplate'
import { useLocale } from '@/components/utils/useLocale'
import { useTleContext } from '@/store/tleprovider'
import type { Point } from '@/types/point'
import type { Shape } from '@/types/shape'

const TdDisplay = dynamic(
  () => import('@/components/satposcalclation/tracking3dmode/tddisplay'),
  {
    ssr: false,
  },
)

const inter = Inter({ subsets: ['latin'] })

//衛星追跡ページ
export default function TargetTracking() {
  const { t } = useLocale()

  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    //地図データの読み込み
    fetch('/coastline.json')
      .then((response) => response.json())
      .then((data) => {
        const shapes: Shape[] = []
        data.features.forEach((feature: any, index: number) => {
          if (feature.geometry.type === 'LineString') {
            const points: Point[] = feature.geometry.coordinates.map(
              (coord: [number, number]) => {
                return { lon: coord[0], lat: coord[1] }
              },
            )

            shapes.push({
              id: index,
              points: points,
            })
          }
        })
        setShapes(shapes)
      })
  }, [])

  const tlecontext = useTleContext()

  return (
    <>
      <TargetTracking3dVisualizer shapes={shapes} />
    </>
  )
}

TargetTracking.title = 'Track3D'
