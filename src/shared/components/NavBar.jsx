import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SidebarHeader from "../../features/SideBar/components/SideBarHeader";
import SidebarNav from "../../features/SideBar/components/SideBarNav";
import ThemeSelector from "../../features/SideBar/components/ThemeSelector";
import LanguageSelector from "../../features/SideBar/components/languageSelector";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import SidebarUser from "../../features/SideBar/components/SideBarUser";
import { closeSidebar } from "../../store/uiSlice";

function NavBar() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const open = useSelector((state) => state.ui.sidebarOpen);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && dispatch(closeSidebar());
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dispatch]);

  return (
    <>
      <div
        onClick={() => dispatch(closeSidebar())}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-gate-control-light-overlay-backdrop backdrop-blur-[2px] transition-opacity duration-300 dark:bg-gate-control-dark-overlay-backdrop lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-gate-control-light-border-glass bg-gate-control-light-surface-glass shadow-sm backdrop-blur-xl transition-transform duration-300 ease-out dark:border-gate-control-dark-border-glass dark:bg-gate-control-dark-surface-glass lg:static lg:z-auto lg:max-w-none lg:shrink-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => dispatch(closeSidebar())}
          aria-label={t("closeMenu")}
          className="absolute right-3 top-3 rounded-lg p-2 text-gate-control-light-text-secondary hover:bg-gate-control-light-surface-selected focus:outline-none focus-visible:ring-2 focus-visible:ring-gate-control-light-accent-primary dark:text-gate-control-dark-text-secondary dark:hover:bg-gate-control-dark-surface-selected dark:focus-visible:ring-gate-control-dark-accent-primary lg:hidden"
        >
          <IoMdClose className="h-5 w-5" />
        </button>

        <SidebarHeader />
        <SidebarNav />

        <div className="space-y-3 px-4 pb-4 pt-4">
          <ThemeSelector />
          <LanguageSelector />
        </div>

        <SidebarUser />
      </aside>
    </>
  );
}

export default NavBar;
