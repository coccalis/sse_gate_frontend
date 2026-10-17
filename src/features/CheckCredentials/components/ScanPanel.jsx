import { useTranslation } from "react-i18next";
import DirectionToggle from "./DirectionToggle";
import ScanCardForm from "./ScanCardForm";
import PlateCheckForm from "./PlateCheckForm";
import GlassCard from "../../../shared/components/ui/GlassCard";

export default function ScanPanel() {
  const { t } = useTranslation();

  return (
    <GlassCard className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {t("gateCheck.scan.title")}
        </h2>
        <DirectionToggle />
      </div>

      <ScanCardForm />

      <hr className="border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle" />

      <PlateCheckForm />
    </GlassCard>
  );
}
