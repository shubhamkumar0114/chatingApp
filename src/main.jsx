
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import {store} from "./redux/store.js"

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline />
        <div >
          <App />
        </div>
      </HelmetProvider>
    </Provider>
  </>
);
// onContextMenu={(e)=> e.preventDefault()}