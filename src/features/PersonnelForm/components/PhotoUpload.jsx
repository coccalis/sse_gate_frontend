import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { LuUpload, LuUser } from "react-icons/lu";
import Button from "../../../shared/components/ui/Button";
import { usePersonnelFormContext } from "../context/PersonnelFormContext";

export default function PhotoUpload() {
  const { t } = useTranslation();
  const { photoPreview, photoError, selectPhoto, removePhoto } =
    usePersonnelFormContext();
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) selectPhoto(file);
    e.target.value = ""; //same file picked ksana kai ksana kai ksana
  };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-control bg-gate-control-light-surface-selected dark:bg-gate-control-dark-surface-selected">
        {photoPreview ? (
          <img
            src={photoPreview}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
            <LuUser size={36} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => inputRef.current?.click()}
          >
            <LuUpload size={18} aria-hidden="true" />
            {photoPreview
              ? t("personnelForm.photo.change")
              : t("personnelForm.photo.upload")}
          </Button>
          {photoPreview && (
            <Button type="button" variant="ghost" onClick={removePhoto}>
              {t("personnelForm.photo.remove")}
            </Button>
          )}
        </div>

        <p className="text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {t("personnelForm.photo.hint")}
        </p>
        {photoError && (
          <p
            role="alert"
            className="text-xs text-gate-control-light-status-danger-text dark:text-gate-control-dark-status-danger-text"
          >
            {t(`personnelForm.photo.${photoError}`)}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleChange}
        aria-label={t("personnelForm.photo.upload")}
        className="hidden"
      />
    </div>
  );
}
