import { Grid } from '@mui/material'

import { useUserLocationContext } from '@/store/userlocationprovider'

export default function ClientPos() {
  const userpos = useUserLocationContext()

  return (
    <Grid item xs={4}>
      <div>
        <p>Latitude : {userpos.userLatitude}</p>
        <p>Longitude: {userpos.userLongitude}</p>
      </div>
    </Grid>
  )
}
