import { HomeContent } from "@/components/home/home-content";
import { getMarkets } from "@/lib/data/markets";
import { getVendors } from "@/lib/data/vendors";

export default async function HomePage() {
  const [vendors, markets] = await Promise.all([getVendors(), getMarkets()]);

  return <HomeContent vendors={vendors} markets={markets} />;
}
