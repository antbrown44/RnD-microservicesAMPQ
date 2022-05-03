import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
// Router Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Page components
import AuthLayout from './components/_layout/AuthLayout';
import AppLayout from './components/_layout/AppLayout';

export default function App() {

  return (
    <Suspense fallback="loading">
      <div className="App">
        <Router>
          <Switch>
            <Route path="/auth" render={(props) => <AuthLayout {...props} /> } />
            <Route path='/customers' render={(props) => <AppLayout {...props} /> } />
            <Route path='/finance' render={(props) => <AppLayout {...props} /> } />
            <Route path='/people' render={(props) => <AppLayout {...props} /> } />
            <Route path='/company' render={(props) => <AppLayout {...props} /> } />
            <Route path='/load-manager' render={(props) => <AppLayout {...props} /> } />
            <Route path='/help' render={(props) => <AppLayout {...props} /> } />
            <Route exact path='/' render={(props) => <AppLayout {...props} /> } />
          </Switch>
        </Router>
      </div>
    </Suspense>
  )
}
