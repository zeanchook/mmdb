import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from "react-router-dom";

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducer/rootReducer.js';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter> 
  </React.StrictMode>,
)
