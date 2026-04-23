import { HomeContent } from "@/components/home/home-content";
import { grenadaMockVendors } from "@/lib/data/grenada-mock";
import { getMarkets } from "@/lib/data/markets";

export default async function GrenadaPage() {
  const markets = await getMarkets();
  const grenadaMarkets = markets.filter((market) =>
    ["market-st-georges-market", "market-grand-anse-farmers-market", "market-grenville-weekend-market"].includes(market.id)
  );

  return (
    <HomeContent
      vendors={grenadaMockVendors}
      markets={grenadaMarkets}
      locationLabel="St. George's, Grenada"
      locationHref="/island"
      regionTagline="Island produce finder"
      picksHeading="Best fresh finds across Grenada today"
      marketsHeading="Where Grenada shoppers gather this week"
      vendorBannerTitle="Are you a market vendor?"
      vendorBannerCopy="Sign up to share today's location, stock, and island market updates."
    />
  );
}
