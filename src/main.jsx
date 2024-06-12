import ReactDOM from 'react-dom/client'
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from 'react-router-dom';
import router from './routes.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <CssBaseline />
    <RouterProvider router={router} />
  </Provider>,
)
