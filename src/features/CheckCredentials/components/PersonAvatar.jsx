import { useState } from "react";

export default function PersonAvatar({ photoUrl, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name
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
        alt={name}
        onError={() => setFailed(true)}
        className="h-28 w-28 shrink-0 rounded-control object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-control bg-gate-control-light-surface-selected text-3xl font-semibold text-gate-control-light-text-primary dark:bg-gate-control-dark-surface-selected dark:text-gate-control-dark-text-primary"
    >
      {initials}
    </div>
  );
}
