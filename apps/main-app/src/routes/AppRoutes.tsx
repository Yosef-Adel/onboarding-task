import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import UserList from "../features/users/UserList";
import { UserDetails } from "../features/users/UserDetails";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <UserList /> },
      { path: "users/:id", element: <UserDetails /> },
    ],
    // Add errorElement
  }
]);
