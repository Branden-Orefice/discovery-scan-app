
const StatCard = (
  {title, value}: {title: string, value: number}) => {
  return (
      <div className="border border-border px-4 py-8 bg-card hover:border-b-accent-primary duration-100 transition-colors w-full">
        <h2 className="text-[10px] uppercase text-(--color-text-muted)">{title}</h2>
        <span className="text-3xl font-bold">{value}</span>
      </div>
  )
}

export default StatCard;