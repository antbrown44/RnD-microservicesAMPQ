import React from 'react';
import ReactDOM from 'react-dom';
import { Server, Response } from "miragejs";
import './index.css';
import 'devextreme/dist/css/dx.light.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import mock datas
import { messages } from './components/Messaging/inboxData';
import { customers } from './components/CustomersList/indexData';

// Initialize mockAPI service
new Server({
  routes() {
    this.namespace = 'api';
    this.get('/customers', () => customers)
    this.get("/customers/search/:id", (schema, request) => {
      let id = request.params.id
      if(id) {
        const customer = customers.filter((customer)=>{
          return (customer.accountNumber + '').includes(id);
        })
        return customer;
      } else {
        return customers;
      }
      
      // return schema.messages.find(id)
    })
    this.get("/customers/list/:id", (schema, request) => {
      let id = request.params.id
      const customer = customers.filter((customer)=>{
        return customer.id == id;
      })[0]
      return customer;
      // return schema.messages.find(id)
    })
    this.get('/internal-messages', () => messages)
    this.get("/internal-messages/:id", (schema, request) => {
      let id = request.params.id
      const message = messages.filter((message)=>{
        return message.ID == id;
      })[0]
      return message;
      // return schema.messages.find(id)
    })
    // this.post('/auth', (schema, request) => {
    //   let attrs = JSON.parse(request.requestBody)
    //   function generateToken () {
    //     return Math.random().toString(36).substr(2);
    //   }
    //   let user_token = generateToken() + generateToken();
    //   if(attrs.username == 'SJM' && attrs.password == 'SJM'){
    //     return new Response(200, {}, {'user_token': user_token, 'user_name': 'Stephanie Jane Mathers'});
    //   } else if(attrs.username == 'SLC' && attrs.password == 'Password99') {
    //     return new Response(200, {}, {'user_token': user_token, 'user_name': 'Sophie Curwen'});
    //   } else {
    //     return new Response(400, { some: 'header' }, { errors: [ 'Authentication failure'] });
    //   }
    // })
  }
});

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
