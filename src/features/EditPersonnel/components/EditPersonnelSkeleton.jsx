import GlassCard from "../../../shared/components/ui/GlassCard";

const BAR =
  "rounded bg-gate-control-light-status-neutral-surface dark:bg-gate-control-dark-status-neutral-surface";

export default function EditPersonnelSkeleton() {
  return (
    <div aria-busy="true" className="animate-pulse space-y-6">
      <div className="space-y-3">
        <div className={`h-8 w-72 ${BAR}`} />
        <div className={`h-4 w-96 max-w-full ${BAR}`} />
      </div>

      <GlassCard padded={false} className="space-y-8 p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className={`h-[88px] w-[88px] rounded-control ${BAR}`} />
          <div className={`h-10 w-48 rounded-control ${BAR}`} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 w-24 ${BAR}`} />
              <div className={`h-[46px] rounded-control ${BAR}`} />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
