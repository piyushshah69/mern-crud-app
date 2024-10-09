import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Users from "./components/getUsers/Users";
import Add from "./components/addUsers/Add";
import Update from "./components/updateUsers/Update";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Users />
  },
  {
    path: '/add',
    element: <Add />
  },
  {
    path: '/edit/:id',
    element: <Update />
  },
])

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
