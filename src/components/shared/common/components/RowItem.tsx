export function RowItem({
    label,
    className,
    children,
  }: { label: string } & ReactProps) {
    return (
      <div
        className={` mb-3 flex flex-col items-start justify-start gap-2 text-sm lg:mb-8 lg:flex-row lg:gap-10 ${className}`}
      >
        <div className="w-full text-warning lg:w-1/5">{label}</div>
        <div className="lg:flex-1">{children}</div>
      </div>
    );
  }
  