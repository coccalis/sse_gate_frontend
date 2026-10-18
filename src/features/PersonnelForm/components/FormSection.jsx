export default function FormSection({ title, description, children }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
      <div>
        <h2 className="text-lg font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-xs leading-5 text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
          {description}
        </p>
      </div>
      <div className="min-w-0 space-y-6">{children}</div>
    </section>
  );
}
