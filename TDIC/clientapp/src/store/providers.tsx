import React from 'react'

import { LayoutSizeProvider } from './layoutsizeprovider'
import { TleProvider } from './tleprovider'
import { UserLocationProvider } from './userlocationprovider'

type Props = {
  children: React.ReactNode
}
export const Providers: React.FC<Props> = (props) => {
  return (
    <TleProvider>
      <UserLocationProvider>
        <LayoutSizeProvider>{props.children}</LayoutSizeProvider>
      </UserLocationProvider>
    </TleProvider>
  )
}
