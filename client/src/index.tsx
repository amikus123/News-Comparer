import ReactDOM from "react-dom";
// import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
} from "react-router-dom";
require('dotenv').config()


ReactDOM.render(
  <>
    <Router>
    <App />
    </Router>

  </>,
  document.getElementById("root")
);
