import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedLayout from "./app/router/layout/ProtectedLayout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/" replace /> },
    {
      element: <ProtectedLayout />,
      id: "protected",
      children: [
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
