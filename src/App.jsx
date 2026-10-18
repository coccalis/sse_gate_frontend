import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedLayout from "./app/router/layout/ProtectedLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/utils/http";
import ViewPersonnel from "./pages/ViewPersonnel";
import AddPersonnel from "./pages/AddPersonnel";
import PersonnelForm from "./pages/PersonnelForm";
import EditPersonnel from "./pages/EditPersonnel";
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
        {
          path: "/view-personnel",
          element: <ViewPersonnel />,
        },
        {
          path: "/personnel/new",
          element: <AddPersonnel />,
        },
        {
          path: "/personnel/:id/edit",
          element: <EditPersonnel />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
