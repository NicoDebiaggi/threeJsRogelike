import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: _theme => ({
            body: {
              width: '100vw',
              height: '100vh'
            },
            '#root': {
              width: '100%',
              height: '100%'
            }
          })
        }}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)
