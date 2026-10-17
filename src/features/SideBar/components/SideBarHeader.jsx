import { useTranslation } from "react-i18next";
import sse_logo from "../../../assets/logo/sse_icon.png";
import { FaShield } from "react-icons/fa6";

export default function SidebarHeader() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center gap-3 px-6 pb-4 pt-8 text-center">
        {sse_logo ? (
          <img src={sse_logo} alt="" className="h-20 w-auto object-contain" />
        ) : (
          <div className="flex h-20 w-16 items-center justify-center rounded-b-3xl rounded-t-lg bg-gate-control-light-accent-primary text-gate-control-light-text-on-accent shadow-sm dark:bg-gate-control-dark-accent-primary dark:text-gate-control-dark-text-on-accent">
            <FaShield className="h-9 w-9" />
          </div>
        )}
        <h1 className="text-base font-bold leading-tight text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("appName")}
        </h1>
      </div>

      <p className="px-6 pb-5 pt-2 text-center text-sm font-semibold text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        {t("gate")}
      </p>
    </>
  );
}
