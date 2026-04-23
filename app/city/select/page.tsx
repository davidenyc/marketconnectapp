import Link from "next/link";
import { Chip } from "@/components/ui/chip";

const cities = [
  {
    name: "New York City",
    country: "USA",
    tagline: "Union Square Greenmarket & more",
    href: "/city",
    featured: true
  },
  {
    name: "London",
    country: "UK",
    tagline: "Borough Market & beyond"
  },
  {
    name: "Toronto",
    country: "Canada",
    tagline: "St. Lawrence Market"
  },
  {
    name: "Paris",
    country: "France",
    tagline: "Marché d'Aligre"
  },
  {
    name: "São Paulo",
    country: "Brazil",
    tagline: "Feira da Liberdade"
  }
] as const;

export default function CitySelectPage() {
  return (
    <div className="space-y-4">
      {cities.map((city) =>
        "href" in city ? (
          <Link
            key={city.name}
            href={city.href}
            className="block rounded-[2rem] border border-leaf bg-white p-5 shadow-soft ring-2 ring-leaf/30"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink">
                  {city.name}, {city.country}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{city.tagline}</p>
              </div>
              <Chip tone="green">Featured</Chip>
            </div>
            <p className="mt-4 text-sm font-semibold text-leaf">Go to market</p>
          </Link>
        ) : (
          <div key={city.name} className="cursor-not-allowed rounded-[2rem] border border-clay bg-white p-5 opacity-60 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink">
                  {city.name}, {city.country}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{city.tagline}</p>
              </div>
              <Chip tone="slate">Coming soon</Chip>
            </div>
          </div>
        )
      )}
    </div>
  );
}
