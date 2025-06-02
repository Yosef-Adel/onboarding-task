import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="">
      {/* <MainNavigation /> */}
      <Outlet />
    </main>
  )
}

