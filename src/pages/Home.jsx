import { useTranslation } from "react-i18next";
import ScanPanel from "../features/CheckCredentials/components/ScanPanel";
import ResultPanel from "../features/CheckCredentials/components/ResultPanel";
import GateStatusCard from "../features/CheckCredentials/components/GateStatusCard";
import RecentScans from "../features/CheckCredentials/components/RecentScans";
import InfoNote from "../features/CheckCredentials/components/InfoNote";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-8xl space-y-6 lg:h-full lg:min-h-0">
      <div className="w-full ">
        <header className="space-y-1.5">
          <h1 className=" text-3xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
            {t("passCheckTitle")}
          </h1>
          <p className="text-sm text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            {t("passCheckSubTitle")}
          </p>
        </header>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <ScanPanel />
          <ResultPanel />
        </div>

        <aside className="space-y-6">
          <GateStatusCard />
          <RecentScans />
          <InfoNote />
        </aside>
      </div>
    </div>
  );
}

export default Home;
