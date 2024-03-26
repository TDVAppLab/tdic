import { Grid, Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import type { Satellite } from '@prisma/client'
import { useState } from 'react'
import { type GeodeticLocation } from 'satellite.js'

import useInterval from '@/hooks/useInterval'
import { getTargetGeodeticLocation } from '@/utils/satcalc/getTargetGeodeticLocation'

interface Props {
  tlestring: Satellite
}

const TargetInformation = ({ tlestring }: Props) => {
  const [geoloc, setGeoloc] = useState<GeodeticLocation>()

  useInterval(() => {
    // 現在時刻の衛星の位置を計算
    const now = new Date()
    setGeoloc(getTargetGeodeticLocation(now, tlestring))
  }, 1000)

  return (
    <Grid item xs={4}>
      <Paper variant="outlined" sx={{ p: 2, background: 'transparent' }}>
        <Typography component="h4" variant="h6">
          現在の衛星位置情報
        </Typography>
        {geoloc && (
          //@ts-ignore
          <Box sx={{ mt: 2 }}>
            <br />
            ID：{tlestring.noradCatalogNumber}【{tlestring.tleObjectName}】
            <br />
            緯度[deg]：{((geoloc.latitude * 180) / Math.PI).toFixed(2)}
            <br />
            経度[deg]：{((geoloc.longitude * 180) / Math.PI).toFixed(2)}
            <br />
            高度[km]：{geoloc.height.toFixed(1)}
          </Box>
        )}
      </Paper>
    </Grid>
  )
}

export default TargetInformation
