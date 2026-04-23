import { Market } from "@/lib/types";

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  return (
    <article className="min-w-[280px] rounded-[1.75rem] border border-clay bg-[#fffaf0] p-4 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">{market.coverageArea}</p>
      <h2 className="mt-2 text-lg font-semibold text-ink">{market.name}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">{market.description}</p>
      <p className="mt-3 text-sm font-medium text-ink">
        {market.openTime} - {market.closeTime}
      </p>
      <p className="mt-1 text-xs text-ink/65">{market.openDays.join(", ")}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {market.featuredItems.map((item) => (
          <span
            key={item}
            className="rounded-full border border-clay bg-mist px-3 py-1 text-xs font-medium capitalize text-ink"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
