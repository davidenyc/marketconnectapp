import Link from "next/link";
import { Chip } from "@/components/ui/chip";

const islands = [
  {
    name: "Grenada",
    flag: "🇬🇩",
    tagline: "Nutmeg Isle · St. George's & more",
    href: "/island/grenada",
    featured: true
  },
  { name: "Trinidad & Tobago", flag: "🇹🇹", tagline: "Queen's Park Savannah Market" },
  { name: "Barbados", flag: "🇧🇧", tagline: "Cheapside Market, Bridgetown" },
  { name: "Jamaica", flag: "🇯🇲", tagline: "Coronation Market, Kingston" },
  { name: "St. Lucia", flag: "🇱🇨", tagline: "Castries Central Market" },
  { name: "Dominica", flag: "🇩🇲", tagline: "Roseau Market" }
] as const;

export default function IslandPage() {
  return (
    <div className="space-y-4">
      {islands.map((island) =>
        "href" in island ? (
          <Link
            key={island.name}
            href={island.href}
            className="block rounded-[2rem] border border-leaf bg-white p-5 shadow-soft ring-2 ring-leaf/30"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink">
                  {island.flag} {island.name}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{island.tagline}</p>
              </div>
              <Chip tone="green">Featured</Chip>
            </div>
            <p className="mt-4 text-sm font-semibold text-leaf">Explore markets</p>
          </Link>
        ) : (
          <div key={island.name} className="cursor-not-allowed rounded-[2rem] border border-clay bg-white p-5 opacity-60 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ink">
                  {island.flag} {island.name}
                </h2>
                <p className="mt-2 text-sm text-ink/70">{island.tagline}</p>
              </div>
              <Chip tone="slate">Coming soon</Chip>
            </div>
          </div>
        )
      )}
    </div>
  );
}
