import React, { ReactElement } from "react";
import './App.css';

import NavBar from './components/Common/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes } from "./Routes/routes";


function App(): ReactElement {

  return (
    <Router>
      <div className="App">
        <NavBar />

        <h1>CRUD CONTACTOS React, Hooks y Axios</h1>
        <h3>Reto BACKBONE</h3>

        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
