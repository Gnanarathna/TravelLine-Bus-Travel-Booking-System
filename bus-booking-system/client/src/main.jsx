import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'jotai'
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="47637986140-vcrut572hqvrgfv6hnj88nnfvcnshbo3.apps.googleusercontent.com">
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
</GoogleOAuthProvider>
)
