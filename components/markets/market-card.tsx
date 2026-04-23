import { Market } from "@/lib/types";

type MarketCardProps = {
  market: Market;
};

export function MarketCard({ market }: MarketCardProps) {
  return (
    <article className="min-w-[240px] rounded-[1.5rem] border border-clay bg-[#fffaf0] p-3 shadow-soft sm:min-w-[280px] sm:rounded-[1.75rem] sm:p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">{market.coverageArea}</p>
      <h2 className="mt-2 text-base font-semibold text-ink sm:text-lg">{market.name}</h2>
      <p className="mt-2 text-sm leading-5 text-ink/70 sm:leading-6">{market.description}</p>
      <p className="mt-3 text-sm font-medium text-ink">
        {market.openTime} - {market.closeTime}
      </p>
      <p className="mt-1 text-xs text-ink/65">{market.openDays.join(", ")}</p>
      <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
        {market.featuredItems.map((item) => (
          <span
            key={item}
            className="rounded-full border border-clay bg-mist px-2.5 py-1 text-[11px] font-medium capitalize text-ink sm:px-3 sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
