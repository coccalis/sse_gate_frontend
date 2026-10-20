const BAR =
  "rounded bg-gate-control-light-status-neutral-surface dark:bg-gate-control-dark-status-neutral-surface";

export default function LogsTableSkeleton({ rows = 6, columns = 7 }) {
  return Array.from({ length: rows }, (_, row) => (
    <tr
      key={row}
      aria-hidden="true"
      className="border-t border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle"
    >
      {Array.from({ length: columns }, (_, column) => (
        <td key={column} className="px-6 py-5">
          <div className={`h-3 animate-pulse ${BAR} ${column === 2 ? "w-36" : "w-20"}`} />
        </td>
      ))}
    </tr>
  ));
}
