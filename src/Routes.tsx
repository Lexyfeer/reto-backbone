import { Routes, Route } from "react-router-dom";
import { ROUTES_NAME } from './global/constant'

import Contact from './components/ContactComponent/Contact';
import Read from './components/ContactComponent/Read';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/reto-backbone/" element={<Read />} />
      <Route path={`/${ROUTES_NAME.CONTACTS}/${ROUTES_NAME.CREATE}`} element={<Contact />} />
      <Route path={`/${ROUTES_NAME.CONTACTS}/:id/${ROUTES_NAME.UPDATE}`} element={<Contact />} />
    </Routes>
  )
}

export { AllRoutes }