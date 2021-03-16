import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Registera from "./components/Auth/Register/Registera"
import Login from "./components/Auth/Login/Login"
import forgot from "./components/Auth/Forgot/Forgot"

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Switch>
      <Route  exact path="/login" component={Login}/>
      <Route path="/forgot" component={forgot}/>
      <Route path="/register" component={Registera}/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
