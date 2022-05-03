import React from 'react';
import ReactDOM from 'react-dom';
import { makeServer } from "./services/server"
// Components
import App from './App';
import reportWebVitals from './reportWebVitals';
// Styles
import './index.css';
import 'devextreme/dist/css/dx.light.css';
// Translation
import './i18n';

// New Mock Server
// Initialize mockAPI service
// if (process.env.NODE_ENV === "development") {
//   makeServer({ environment: "development" })
// }
// Previous Mock Server
// new Server({
//   routes() {
//     this.namespace = 'api';
//     this.get('/customers', () => customers)
//     this.post('/auth', (schema, request) => {
//       let attrs = JSON.parse(request.requestBody)
//       function generateToken () {
//         return Math.random().toString(36).substr(2);
//       }
//       let user_token = generateToken() + generateToken();
//       if(attrs.username == 'ZAN' && attrs.password == 'ZAN'){
//         return new Response(200, {}, {'user_token': user_token, 'user_name': 'ZAN'});
//       } else if(attrs.username == 'xyz' && attrs.password == '987') {
//         return new Response(200, {}, {'user_token': user_token, 'user_name': 'xyz'});
//       }else {
//         return new Response(400, { some: 'header' }, { errors: [ 'Authentication failure'] });
//       }
//     })
//         this.passthrough("https://localhost:5001/***");
//         this.passthrough();
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
