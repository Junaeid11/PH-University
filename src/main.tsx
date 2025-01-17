import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { Provider } from 'react-redux'
import store from './redux/features/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/features/store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}/>

      </PersistGate>
      <Toaster/>

  
    </Provider>
   
  </StrictMode>
)
