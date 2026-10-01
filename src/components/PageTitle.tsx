interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      {subtitle && <p className="text-sm text-ink-soft">{subtitle}</p>}
    </div>
  )
}
