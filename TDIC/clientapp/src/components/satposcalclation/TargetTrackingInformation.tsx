import Box from '@mui/material/Box'
import type { Satellite } from '@prisma/client'
import { useState } from 'react'
import {
  degreesLat,
  degreesLong,
  type EciVec3,
  type GeodeticLocation,
  type Kilometer,
  type KilometerPerSecond,
  type LookAngles,
} from 'satellite.js'

import useInterval from '@/hooks/useInterval'
import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'
import { SatTrackingInfoFromObserver } from '@/utils/satcalc/SatTrackingInfoFromObserver'

interface Props {
  tlestring: Satellite
  observerGd: GeodeticLocation
}

const TargetTrackingInformation = ({ tlestring, observerGd }: Props) => {
  const [targetposition, setTargetposition] = useState<EciVec3<Kilometer>>()
  const [targetvelocity, setTargetvelocity] =
    useState<EciVec3<KilometerPerSecond>>()
  const [targetlookangles, setTargetlookangles] = useState<LookAngles>()
  const [targetGeoloc, setTargetGeoloc] = useState<GeodeticLocation>()

  useInterval(() => {
    const date = new Date() // 現在の日時 | Current date and time

    const res = SatTrackingInfoFromObserver(observerGd, date, tlestring)

    if (
      res.targetPositionAndVelocity.position !== false &&
      res.targetPositionAndVelocity.position !== true
    ) {
      setTargetposition(res.targetPositionAndVelocity.position)
    }

    if (
      res.targetPositionAndVelocity.velocity !== false &&
      res.targetPositionAndVelocity.velocity !== true
    ) {
      setTargetvelocity(res.targetPositionAndVelocity.velocity)
    }
    setTargetlookangles(res.lookAngles)

    setTargetGeoloc(getTargetGeodeticLocation(date, tlestring))
  }, 1000)

  return (
    //@ts-ignore
    <Box sx={{ mt: 2 }}>
      <h4>Observer Information</h4>
      緯度[deg]：{degreesLat(observerGd.latitude).toFixed(2)}
      <br />
      経度[deg]：{degreesLong(observerGd.longitude).toFixed(2)}
      <br />
      高度[m]：{observerGd.height * 1000}
      <hr />
      <h4>Terget Information</h4>
      ID：{tlestring.noradCatalogNumber}【{tlestring.tleObjectName}】
      <br />
      {targetGeoloc && (
        <>
          緯度[deg]：{((targetGeoloc.latitude * 180) / Math.PI).toFixed(2)}
          <br />
          経度[deg]：{((targetGeoloc.longitude * 180) / Math.PI).toFixed(2)}
          <br />
          高度[km]：{targetGeoloc.height.toFixed(1)}
          <br />
          <br />
        </>
      )}
      {targetlookangles && (
        <>
          方位角[deg]：{((targetlookangles.azimuth * 180) / Math.PI).toFixed(2)}
          <br />
          仰俯角[deg]：
          {((targetlookangles.elevation * 180) / Math.PI).toFixed(2)}
          <br />
          <br />
        </>
      )}
      {targetposition && (
        <>
          位置[km]：{targetposition.x.toFixed(1)}，{targetposition.y.toFixed(1)}
          ，{targetposition.z.toFixed(1)}
          <br />
        </>
      )}
      {targetvelocity && (
        <>
          速度[km/s]：{targetvelocity.x.toFixed(2)}，
          {targetvelocity.y.toFixed(2)}，{targetvelocity.z.toFixed(2)}
          <br />
        </>
      )}
    </Box>
  )
}

export default TargetTrackingInformation
