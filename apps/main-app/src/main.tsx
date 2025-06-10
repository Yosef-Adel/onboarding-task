import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { NotificationProvider } from "@my-workspace/ui";

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <NotificationProvider />
      <App />
    </Provider>
  </StrictMode>
)
