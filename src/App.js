import React from 'react';
// import './App.css';
import Counter from './features/counter/Counter';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element:(<Home></Home>)
  },
  {
    path: "/login",
    element:(<LoginPage></LoginPage>)
  },
  {
    path: "/signup",
    element:(<SignupPage></SignupPage>)
  },
]);

function App() {
  return (
    <div >
     

     <RouterProvider router={router} />

    </div>
  );
}

export default App;
