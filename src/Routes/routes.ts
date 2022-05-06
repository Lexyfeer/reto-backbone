import Create from '../components/ContactComponent/Create';
import Read from '../components//ContactComponent/Read';
import Update from '../components/ContactComponent/Update';
import { FC } from "react";

// interface
interface Route {
  key: string,
  title: string,
  path: string,
  // enabled: boolean,
  component: FC<{}>
}

export const routes: Array<Route> = [
  {
    key: 'read-route',
    title: 'Contacts List',
    path: '/',
    // enabled: true,
    component: Read
  },
  {
    key: 'create-route',
    title: 'Create',
    path: '/create',
    // enabled: true,
    component: Create
  },
  {
    key: 'update-route',
    title: 'Update',
    path: '/update',
    // enabled: true,
    component: Update
  }
]