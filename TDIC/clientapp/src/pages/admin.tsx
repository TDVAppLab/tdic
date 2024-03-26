import { Button, Container } from '@mui/material'
import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react'

import ControlPanelForUpdateTargetOrbitalPassesManually from '@/components/batchs/ControlPanelForUpdateTargetOrbitalPassesManually'
import { useLocale } from '@/components/utils/useLocale'
import { trpc } from '@/utils/trpc'
//import { IsAvailableWithoutProduction } from '@/constants'

const inter = Inter({ subsets: ['latin'] })

//プレ管理画面
export default function Admin() {
  const { data: session } = useSession()

  const { t } = useLocale()

  const updateTargetOrbitalPassesTargetOnly =
    trpc.tleRouter.updateTleTableFromCelestrackTargetOnly.useMutation()
      .mutateAsync

  const updateTargetOrbitalPassesAll =
    trpc.tleRouter.updateTleTableFromCelestrackAll.useMutation().mutateAsync

  /*
  if (!IsAvailableWithoutProduction) {
    // 本番環境ではNot Foundページを表示
    return <p>404 - Page Not Found</p>
  }*/

  return session ? (
    session.user.emailVerified ? (
      <Container maxWidth={false} sx={{ py: 2 }}>
        <Button variant="contained" color="inherit" onClick={() => signOut()}>
          signOut
        </Button>
        <ul>
          <li>User : {session.user.name}</li>
          {/*
          <li>{session.user.id}</li>
          <li>{session.user.email}</li>
          <li>{session.user.emailVerified?.toString()}</li>
           */}
        </ul>
        <ControlPanelForUpdateTargetOrbitalPassesManually
          onOrbitalPassUpdateTargetOnly={updateTargetOrbitalPassesTargetOnly}
          onOrbitalPassUpdateTargetAll={updateTargetOrbitalPassesAll}
        />
        <Button variant="text" href="/adminupdate">
          Edit Updates
        </Button>
      </Container>
    ) : (
      <Container maxWidth={false} sx={{ py: 2 }}>
        <div>your account is not activated yet</div>
        <Button variant="contained" color="inherit" onClick={() => signOut()}>
          signOut
        </Button>
      </Container>
    )
  ) : (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Button variant="contained" color="inherit" onClick={() => signIn()}>
        signIn
      </Button>
    </Container>
  )
}

Admin.title = 'Admin'
