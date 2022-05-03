import { createServer, Model, Response } from "miragejs"
import { users } from '../seeds/users'
import { customers } from '../seeds/customers'
import { messages } from '../seeds/messages'


export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      customer: Model,
      message: Model,
    },

    seeds(server) {
      users.forEach(item => {
        server.create('user', item)
      })

      customers.forEach(item => {
        server.create('customer', item)
      })

      messages.forEach(item => {
        server.create('message', item)
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/customers', (schema, request) => {
        let accNumber = request.queryParams.accNumber;

        if(accNumber) {
          const filteredCustomers = customers.filter((customer)=>{
            return (customer.AccountNo + '').includes(accNumber);
          })
          return {customers: filteredCustomers};
        } else {
          return schema.customers.all();
        }
      })

      this.get("/customers/:id", (schema, request) => {
        let id = request.params.id
        return schema.customers.find(id)
      })

      this.get('/users', (schema) => {
        return schema.users.all()
      })

      this.get('/messages', (schema) => {
        return schema.messages.all()
      })

      this.get('/messages/:id', (schema, request) => {
        let id = request.params.id
        return schema.messages.find(id)
      })

      this.post('/auth/login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let user = schema.users.where({ Initials: attrs.username }).models[0].attrs;
        // user = user ? user.models[0].attrs : {Initials: '', Pass: ''}

        function generateToken () {
          return Math.random().toString(36).substr(2);
        }

        if(attrs.username == user.Initials && attrs.password == user.Pass){
          let user_token = generateToken() + generateToken();
          return new Response(200, {}, {'user_token': user_token, 'user_name': user.Initials});
        } else {
          return new Response(400, { some: 'header' }, { errors: [ 'Authentication failure'] });
        }
        
      })
    },
  })

  return server
}