import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import App from "./App";
require('dotenv').config()

ReactDOM.render(
  <>
    <CssBaseline />
    <App />

  </>,
  document.getElementById("root")
);
