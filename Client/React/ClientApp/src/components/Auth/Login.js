import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    var url = '/api/auth/login';
    var data = { 'username': username, 'password': password };

    axios.post(url, data).then(res => {
      window.localStorage.setItem("token", res.data.user_token);
      window.localStorage.setItem("username", res.data.user_name);
      // console.log(JSON.stringify(res.data, null, 2)); // from Brad
      props.history.push("/customers/list");
    }).catch(err => {
      if (err.response) {
        console.log(err.response.data);
      } else if (err.request) {
        console.log('No Response');
      } else {
        console.log('Fail to Login');
      }
    })
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="/img/logos/codas-logo-red-500.svg"
            alt="Codas"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    onChange={e => {setUsername(e.target.value)}}
                    value={username}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    onChange={e => {setPassword(e.target.value)}}
                    value={password}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 mt-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={!(username && password)}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default withRouter(Login)