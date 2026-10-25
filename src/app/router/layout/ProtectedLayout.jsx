import { Outlet } from "react-router-dom";
import NavBar from "../../../shared/components/NavBar";
import TopBar from "../../../shared/components/TopBar";

function ProtectedLayout() {
  //TODO: auth logic to be added to prevent anyone from entering.
  return (
    <>
      <div className="flex h-dvh overflow-hidden bg-gate-control-light-background-primary text-gate-control-light-text-primary dark:bg-gate-control-dark-background-primary dark:text-gate-control-dark-text-primary">
        <NavBar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default ProtectedLayout;
