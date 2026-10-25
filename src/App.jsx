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
import EditPersonnel from "./pages/EditPersonnel";
import Logs from "./pages/Logs";
import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";
import CreateUserPage from "./pages/CreateUserPage";
import RequireAdmin from "./app/router/layout/RequireAdmin";
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
          path: "/personnel/:id/edit",
          element: <EditPersonnel />,
        },
        {
          path: "/logs",
          element: <Logs />,
        },
        {
          element: <RequireAdmin />,
          children: [
            {
              path: "/personnel/new",
              element: <AddPersonnel />,
            },
            { path: "/admin/users", element: <UsersPage /> },
            { path: "/admin/users/new", element: <CreateUserPage /> },
            { path: "/admin/users/:id/edit", element: <EditUserPage /> },
          ],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
