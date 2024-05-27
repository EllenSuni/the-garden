import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyPlants from "./pages/MyPlants";
import AddPlant from "./pages/AddPlant";
import Calendar from "./pages/Calendar";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <MyPlants />, path: "/my-plants" },
        { element: <AddPlant />, path: "/add-plant" },
        { element: <Calendar />, path: "/calendar" },
      ],
      element: (
        <div id="body">
          <Navigation />
          <main>
            <Outlet />
          </main>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
