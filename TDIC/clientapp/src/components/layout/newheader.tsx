import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutSizeContext } from '@/store/layoutsizeprovider'

import { useLocale } from '../utils/useLocale'
import DrawerAppBar from './drawernavigation'

export default function NewHeader() {
  const layoutSize = useLayoutSizeContext()
  const ref = useRef<HTMLDivElement>(null)

  const { t } = useLocale()

  const router = useRouter()

  //Windowサイズを取得する
  const { height, width } = useWindowSize()

  useEffect(() => {
    if (ref.current) {
      //console.log(ref.current.getBoundingClientRect())
      layoutSize.setHeaderHight(ref.current.getBoundingClientRect().height)
    }
  }, [height, width])

  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar ref={ref} position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Sattrack
        </Typography>
        <Link href="/">
          <Button sx={{ color: 'white' }}>Home</Button>
        </Link>
        <DrawerAppBar />
      </Toolbar>
    </AppBar>
  )
}
