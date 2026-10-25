const BAR =
  "rounded bg-gate-control-light-status-neutral-surface dark:bg-gate-control-dark-status-neutral-surface";

export default function UsersTableSkeleton({ rows = 5, columns = 6 }) {
  return Array.from({ length: rows }, (_, row) => (
    <tr
      key={row}
      aria-hidden="true"
      className="border-t border-gate-control-light-border-subtle dark:border-gate-control-dark-border-subtle"
    >
      <td colSpan={columns} className="px-6 py-5">
        <div className="flex animate-pulse items-center gap-4">
          <div className={`h-10 w-10 rounded-[10px] ${BAR}`} />
          <div className="space-y-2">
            <div className={`h-3 w-40 ${BAR}`} />
            <div className={`h-3 w-24 ${BAR}`} />
          </div>
        </div>
      </td>
    </tr>
  ));
}
