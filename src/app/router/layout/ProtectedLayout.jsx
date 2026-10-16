import { Outlet } from "react-router-dom";
import NavBar from "../../../shared/components/NavBar";

function ProtectedLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
