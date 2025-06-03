import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import UserList from "../features/users/UserList";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <UserList /> }
    ],
    // Add errorElement
  }
]);
