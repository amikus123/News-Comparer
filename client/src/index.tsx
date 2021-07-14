import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App";
import { firebaseConfig } from "./secret";
require('dotenv').config()


initializeApp(firebaseConfig);

ReactDOM.render(
  <>
    <CssBaseline />
    <App />

  </>,
  document.getElementById("root")
);
