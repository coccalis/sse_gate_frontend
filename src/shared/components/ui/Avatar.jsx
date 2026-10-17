import { useState } from "react";

// Photo, or initials when there is no photo / the photo fails to load.
// Size comes from className (default 40px).
export default function Avatar({
  photoUrl,
  name = "",
  className = "h-10 w-10 text-sm",
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .normalize("NFD")
    .replace(/\p{M}/gu, "") // drop Greek accents: Έ -> Ε
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (photoUrl && !failed) {
    return (
      <img
        src={photoUrl}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${className} shrink-0 rounded-[10px] object-cover`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${className} flex shrink-0 items-center justify-center rounded-[10px] bg-gate-control-light-surface-selected font-semibold text-gate-control-light-text-primary dark:bg-gate-control-dark-surface-selected dark:text-gate-control-dark-text-primary`}
    >
      {initials}
    </div>
  );
}
