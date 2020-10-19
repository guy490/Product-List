import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Order from './pages/Order/Order';

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Route path="/" exact component={Main} />
      <Route path="/order" exact component={Order} />
    </BrowserRouter>
  );
};

export default App;
