import { Routes, Route } from "react-router-dom";

import Contact from './components/ContactComponent/Contact';
import Read from './components/ContactComponent/Read';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Read />} />
      <Route path="/contact" element={<Contact />} >
        <Route path="/contact/:id" element={<Contact />} />
      </Route>

    </Routes>
  )
}

export { AllRoutes }