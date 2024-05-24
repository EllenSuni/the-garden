import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import MyPlants from "./pages/MyPlants";
import AddPlant from "./pages/AddPlant";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <MyPlants />, path: "/my-plants" },
        { element: <AddPlant />, path: "/add-plant" },
      ],
      element: (
        <div id="body">
          <Header />
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
