import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuCar } from "react-icons/lu";
import { useCheckPlate } from "../hooks/useGate";
import { normalizePlate } from "../utils/plate";
import Textfield from "../../../shared/components/ui/Textfield";
import Button from "../../../shared/components/ui/Button";

export default function PlateCheckForm() {
  const { t } = useTranslation();
  const direction = useSelector((state) => state.check.direction);
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useCheckPlate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;

    const normalized = normalizePlate(plate);
    if (!normalized) {
      setError(t("gateCheck.plate.required"));
      return;
    }
    setError("");

    mutate({ plate: normalized, direction }, { onSuccess: () => setPlate("") });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <Textfield
            title={t("gateCheck.plate.label")}
            type="text"
            name="plate"
            icon={LuCar}
            placeholder={t("gateCheck.plate.placeholder")}
            autoComplete="off"
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value.toUpperCase());
              setError("");
            }}
            className="py-3"
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          loading={isPending}
          className="h-[46px] shrink-0 px-6"
        >
          {t("gateCheck.plate.submit")}
        </Button>
      </div>

      {error && (
        <p
          role="alert"
          className="text-xs text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text"
        >
          {error}
        </p>
      )}
    </form>
  );
}
