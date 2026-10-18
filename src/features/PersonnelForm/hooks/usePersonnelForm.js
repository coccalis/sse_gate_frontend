import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { normalizePlate } from "../../CheckCredentials/utils/plate";
import { PHOTO_MAX_BYTES, PHOTO_TYPES } from "../constants";
import { createInitialValues, newVehicle } from "../utils/formValues";
import { validatePersonnel } from "../utils/validate";

export function usePersonnelForm({
  initialValues,
  initialPhotoUrl = null,
  onSubmit,
  isSubmitting = false,
}) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [values, setValues] = useState(
    () => initialValues ?? createInitialValues(),
  );
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [focusTick, setFocusTick] = useState(0);

  // Photo: the current one (initialPhotoUrl), a newly chosen file, or removed
  const [photoFile, setPhotoFile] = useState(null);
  const [newPhotoPreview, setNewPhotoPreview] = useState(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [photoError, setPhotoError] = useState(null);

  const photoPreview =
    newPhotoPreview ?? (photoRemoved ? null : initialPhotoUrl);

  // After a failed submit, focus the first invalid field
  useEffect(() => {
    if (focusTick === 0) return;
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [focusTick]);

  // Preview URL for a newly chosen photo (released when it changes or on unmount)
  useEffect(() => {
    if (!photoFile) {
      setNewPhotoPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(photoFile);
    setNewPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  /* ---------------------------- fields ---------------------------- */
  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const clearVehicleError = (prev, key) => {
    if (!prev.vehicles?.[key]) return prev;
    const vehicles = { ...prev.vehicles };
    delete vehicles[key];
    return { ...prev, vehicles };
  };

  const setVehicleField = useCallback((key, name, value) => {
    setValues((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.key === key ? { ...v, [name]: value } : v,
      ),
    }));
    setErrors((prev) => clearVehicleError(prev, key));
  }, []);

  const addVehicle = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle()],
    }));
  }, []);

  const removeVehicle = useCallback((key) => {
    setValues((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((v) => v.key !== key),
    }));
    setErrors((prev) => clearVehicleError(prev, key));
  }, []);

  /* ----------------------------- photo ----------------------------- */
  const selectPhoto = useCallback((file) => {
    if (!PHOTO_TYPES.includes(file.type)) return setPhotoError("invalidType");
    if (file.size > PHOTO_MAX_BYTES) return setPhotoError("tooLarge");
    setPhotoError(null);
    setPhotoRemoved(false);
    setPhotoFile(file);
    return undefined;
  }, []);

  const removePhoto = useCallback(() => {
    setPhotoFile(null);
    setPhotoError(null);
    setPhotoRemoved(true);
  }, []);

  /* ---------------------------- messages ---------------------------- */
  const error = (name) =>
    errors[name] ? t(`personnelForm.errors.${errors[name]}`) : undefined;

  const vehicleError = (key, name) => {
    const code = errors.vehicles?.[key]?.[name];
    return code ? t(`personnelForm.errors.${code}`) : undefined;
  };

  /* ----------------------------- submit ----------------------------- */
  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);

    const { errors: found, payload } = validatePersonnel(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFocusTick((n) => n + 1);
      return;
    }
    setErrors({});

    try {
      await onSubmit({
        ...payload,
        photo: photoFile,
        // true only when there WAS a photo and the user removed it without replacing it
        removePhoto: Boolean(initialPhotoUrl) && photoRemoved && !photoFile,
      });
    } catch (err) {
      const data = err?.data;

      if (err?.status === 409 && data?.code === "card_exists") {
        setErrors({ cardId: "cardExists" });
        setFocusTick((n) => n + 1);
      } else if (err?.status === 409 && data?.code === "plate_exists") {
        const duplicated = values.vehicles.find(
          (v) => normalizePlate(v.plate) === normalizePlate(data.plate),
        );
        setErrors(
          duplicated
            ? { vehicles: { [duplicated.key]: { plate: "plateExists" } } }
            : {},
        );
        setSubmitError(duplicated ? null : "submitFailed");
        setFocusTick((n) => n + 1);
      } else {
        setSubmitError("submitFailed");
      }
    }
  };

  return {
    formRef,
    values,
    setField,
    setVehicleField,
    addVehicle,
    removeVehicle,
    error,
    vehicleError,
    photoPreview,
    photoError,
    selectPhoto,
    removePhoto,
    submit,
    submitError,
    isSubmitting,
  };
}
