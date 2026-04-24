import { HomeContent } from "@/components/home/home-content";
import { getMarkets } from "@/lib/data/markets";
import { getVendors } from "@/lib/data/vendors";

export default async function CityPage() {
  const [vendors, markets] = await Promise.all([getVendors(), getMarkets()]);
  const cityMarkets = markets.filter((market) => market.id === "market-union-square");
  const cityVendors = vendors.filter((vendor) => vendor.marketId === "market-union-square");

  return (
    <HomeContent
      vendors={cityVendors}
      markets={cityMarkets}
      locationLabel="Union Square, NYC"
      locationHref="/city/select"
      regionType="city"
      regionTagline="NYC greenmarket finder"
      picksHeading="Best fresh finds at the Greenmarket today"
      marketsHeading="Where NYC shoppers gather this week"
      vendorBannerTitle="Are you a vendor?"
      vendorBannerCopy="Sign up to share today's location, stock, and market updates."
    />
  );
}
