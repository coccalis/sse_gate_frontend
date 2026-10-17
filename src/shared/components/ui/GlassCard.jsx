export default function GlassCard({
  as: Tag = "section",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`rounded-control border border-gate-control-light-border-glass bg-gate-control-light-surface-glass p-6 shadow-sm backdrop-blur-xl dark:border-gate-control-dark-border-glass dark:bg-gate-control-dark-surface-glass ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
