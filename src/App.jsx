import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
