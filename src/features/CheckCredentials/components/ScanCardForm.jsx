import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LuScanLine } from "react-icons/lu";

import { useScanCard } from "../hooks/useGate";
import ReaderHint from "./ReaderHint";
import Textfield from "../../../shared/components/ui/Textfield";
import Button from "../../../shared/components/ui/Button";

export default function ScanCardForm() {
  const { t } = useTranslation();
  const direction = useSelector((state) => state.check.direction);
  const formRef = useRef(null);
  const [cardId, setCardId] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useScanCard();

  const focusInput = () => formRef.current?.elements.cardId?.focus();

  // Keep the field focused so the card reader can "type" straight into it.
  // (A USB reader types the number and presses Enter, which submits the form.)
  useEffect(() => {
    focusInput();
  }, [direction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;

    const value = cardId.trim();
    if (!value) {
      setError(t("gateCheck.card.required"));
      return;
    }
    setError("");

    mutate(
      { cardId: value, direction },
      {
        onSuccess: () => setCardId(""), // keep the value on network errors so it can be retried
        onSettled: focusInput,
      },
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3"
    >
      <div className="flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <Textfield
            title={t("gateCheck.card.label")}
            type="text"
            name="cardId"
            icon={LuScanLine}
            placeholder={t("gateCheck.card.placeholder")}
            autoComplete="off"
            value={cardId}
            onChange={(e) => {
              setCardId(e.target.value);
              setError("");
            }}
            className="py-3"
          />
        </div>
        <Button
          type="submit"
          loading={isPending}
          className="h-[46px] shrink-0 px-6"
        >
          {t("gateCheck.card.submit")}
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

      <ReaderHint />
    </form>
  );
}
