import { createTheme } from '@mui/material/styles'

// ベーステーマを作成
// (breakpointを使うため)
const baseTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const theme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily:
            "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          boxSizing: 'border-box',
        },
        '& *, & *::before, & *::after': {
          boxSizing: 'border-box',
          margin: 0,
        },
        main: {
          backgroundColor: '#181818',
        },
      },
    },
  },
  // ここでカスタムテーマを設定できます
})

export default theme
