import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useState } from 'react'

export type ControlPanelForUpdateTargetOrbitalPassesManuallyProps = {
  onOrbitalPassUpdateTargetOnly: () => Promise<void>
  onOrbitalPassUpdateTargetAll: () => Promise<void>
}

/**
 * 軌道パス計算機能をUIから手動で駆動するためのコントロールパネルを提供する
 * コンポーネント
 * @returns
 */
const ControlPanelForUpdateTargetOrbitalPassesManually: FC<
  ControlPanelForUpdateTargetOrbitalPassesManuallyProps
> = ({ onOrbitalPassUpdateTargetOnly, onOrbitalPassUpdateTargetAll }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isSubmittingTLE, setIsSubmittingTLE] = useState(false)

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2, background: 'light' }}>
            <Typography component="h4" variant="h6">
              TLE 情報の更新 (ターゲットのみ)
            </Typography>

            <Button
              disabled={isSubmittingTLE}
              type="submit"
              variant="contained"
              color="primary"
              onClick={async () => {
                setIsSubmittingTLE(true)
                try {
                  await onOrbitalPassUpdateTargetOnly()
                  enqueueSnackbar('衛星軌道情報を更新しました', {
                    variant: 'success',
                  })
                } catch (err) {
                  console.error(err)
                  enqueueSnackbar('システムエラーが発生しました', {
                    variant: 'error',
                  })
                } finally {
                  setIsSubmittingTLE(false)
                }
              }}
            >
              {isSubmittingTLE ? 'Processing' : 'Run Batch'}
            </Button>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Start</TableCell>
                  <TableCell align="center">END</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*tleTableUpdateLogs &&
                tleTableUpdateLogs.map((x, index) => (
                  <TableRow key={x.id}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{dayjs(x.createdAt).format("YYYY/MM/DD HH:mm:ss")}</TableCell>
                    <TableCell align="right">{dayjs(x.updatedAt).format("YYYY/MM/DD HH:mm:ss")}</TableCell>
                  </TableRow>
                ))*/}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2, background: 'light' }}>
            <Typography component="h4" variant="h6">
              TLE 情報の更新 (全ての衛星)
            </Typography>

            <Button
              disabled={isSubmittingTLE}
              type="submit"
              variant="contained"
              color="primary"
              onClick={async () => {
                setIsSubmittingTLE(true)
                try {
                  await onOrbitalPassUpdateTargetAll()
                  enqueueSnackbar('衛星軌道情報を更新しました', {
                    variant: 'success',
                  })
                } catch (err) {
                  console.error(err)
                  enqueueSnackbar('システムエラーが発生しました', {
                    variant: 'error',
                  })
                } finally {
                  setIsSubmittingTLE(false)
                }
              }}
            >
              {isSubmittingTLE ? 'Processing' : 'Run Batch'}
            </Button>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Start</TableCell>
                  <TableCell align="center">END</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*tleTableUpdateLogs &&
                tleTableUpdateLogs.map((x, index) => (
                  <TableRow key={x.id}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{dayjs(x.createdAt).format("YYYY/MM/DD HH:mm:ss")}</TableCell>
                    <TableCell align="right">{dayjs(x.updatedAt).format("YYYY/MM/DD HH:mm:ss")}</TableCell>
                  </TableRow>
                ))*/}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default ControlPanelForUpdateTargetOrbitalPassesManually
