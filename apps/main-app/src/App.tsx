import { RouterProvider } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { ThemeModeProvider } from "@my-workspace/ui"

function App() {
  return (
    <ThemeModeProvider>
      {(theme) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={AppRoutes} />
        </ThemeProvider>
      )}
    </ThemeModeProvider>
  )
}

export default App
