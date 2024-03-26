import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'

import type { OrbitalPass } from '@/types/OrbitalPass'

interface Props {
  orbitalPasses: OrbitalPass[]
}

const TargetOrbitalPassesInformation = ({ orbitalPasses }: Props) => {
  return (
    <Grid item xs={8}>
      <Paper variant="outlined" sx={{ p: 2, background: 'light' }}>
        <Typography component="h4" variant="h6">
          ターゲットの可視時間帯情報
        </Typography>
        {/*//@ts-ignore*/}
        <Box sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>可視開始時間</TableCell>
                <TableCell>方位角</TableCell>
                <TableCell>緯度[deg]</TableCell>
                <TableCell>経度[deg]</TableCell>
                <TableCell>仰角最大時間</TableCell>
                <TableCell>最大仰角</TableCell>
                <TableCell>可視時間[秒]</TableCell>
                <TableCell>計算実行日時</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orbitalPasses.map((orbitalPass: OrbitalPass) => {
                return (
                  <TableRow key={orbitalPass.id}>
                    <TableCell>
                      {getMonthDayTimeLocal(orbitalPass.aos)}
                    </TableCell>
                    <TableCell>
                      {(
                        (orbitalPass.aos_target_azimuth * 180) /
                        Math.PI
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {(
                        (orbitalPass.aos_target_latitude * 180) /
                        Math.PI
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {(
                        (orbitalPass.aos_target_longitude * 180) /
                        Math.PI
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {getMonthDayTimeLocal(orbitalPass.maxel)}
                    </TableCell>
                    <TableCell>
                      {(
                        (orbitalPass.maxel_target_elevation * 180) /
                        Math.PI
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {DiffSeconds(orbitalPass.aos, orbitalPass.los)}
                    </TableCell>
                    <TableCell>
                      {getMonthDayTimeLocal(orbitalPass.calclated_datetime)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Grid>
  )
}

export default TargetOrbitalPassesInformation

function getMonthDayTimeLocal(date: Date): string {
  return dayjs(date).format('MM/DD HH:mm:ss')
}

function DiffSeconds(date1: Date, date2: Date) {
  // 差分をミリ秒で計算
  const diffInMilliseconds = date2.getTime() - date1.getTime()

  // ミリ秒を他の単位に変換
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000)

  return diffInSeconds
}
