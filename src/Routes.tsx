import { Routes, Route } from "react-router-dom";

import Update from './components/ContactComponent/Update';
import Create from './components/ContactComponent/Create';
import Read from './components/ContactComponent/Read';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Read />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>
  )
}

export { AllRoutes }