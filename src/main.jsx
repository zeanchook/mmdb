import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { BrowserRouter } from "react-router-dom";

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducer/rootReducer.js';
import logger from 'redux-logger';
// import { composeWithDevTools } from "@redux-devtools/extension";


const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter> 
  </React.StrictMode>,
)
