import './App.css';

import NavBar from './components/Common/NavBar';
import { BrowserRouter as Router } from "react-router-dom";

import { AllRoutes } from './Routes';

function App() {

  return (
    <div className="App">
      <NavBar />

      <h1>CRUD CONTACTOS React, Hooks y Axios</h1>
      <h3>Reto BACKBONE</h3>

      <Router>
        <AllRoutes />
      </Router>

    </div>
  );
}

export default App;
