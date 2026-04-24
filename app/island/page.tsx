import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Chip } from "@/components/ui/chip";

type IslandOption = {
  name: string;
  flag: string;
  tagline: string;
  detail?: string;
  href?: string;
  featured?: boolean;
};

type IslandSection = {
  title: string;
  eyebrow: string;
  items: IslandOption[];
};

const islandSections: IslandSection[] = [
  {
    title: "Major island markets",
    eyebrow: "Live now",
    items: [
      {
        name: "Grenada",
        flag: "🇬🇩",
        tagline: "Nutmeg Isle · St. George's & more",
        detail: "5 vendors · 3 markets · Daily from 6am",
        href: "/island/grenada",
        featured: true
      }
    ]
  },
  {
    title: "Caribbean",
    eyebrow: "By region",
    items: [
      {
        name: "Trinidad & Tobago",
        flag: "🇹🇹",
        tagline: "Queen's Park Savannah Market"
      },
      {
        name: "Barbados",
        flag: "🇧🇧",
        tagline: "Cheapside Market, Bridgetown"
      },
      {
        name: "Jamaica",
        flag: "🇯🇲",
        tagline: "Coronation Market, Kingston"
      },
      {
        name: "St. Lucia",
        flag: "🇱🇨",
        tagline: "Castries Central Market"
      },
      {
        name: "Dominica",
        flag: "🇩🇲",
        tagline: "Roseau Market"
      }
    ]
  },
  {
    title: "Southeast Asia",
    eyebrow: "By region",
    items: [
      {
        name: "Philippines",
        flag: "🇵🇭",
        tagline: "Public market produce routes in Manila & beyond"
      },
      {
        name: "Thailand",
        flag: "🇹🇭",
        tagline: "Floating and municipal produce markets"
      },
      {
        name: "Indonesia",
        flag: "🇮🇩",
        tagline: "Pasar tradisional fresh market network"
      }
    ]
  },
  {
    title: "Pacific",
    eyebrow: "By region",
    items: [
      {
        name: "Fiji",
        flag: "🇫🇯",
        tagline: "Suva Municipal Market"
      },
      {
        name: "Samoa",
        flag: "🇼🇸",
        tagline: "Fugalei Market, Apia"
      }
    ]
  }
];

function IslandCard({ island }: { island: IslandOption }) {
  if (island.href) {
    return (
      <Link
        href={island.href}
        className="group block rounded-[2rem] border border-leaf bg-white p-5 shadow-soft ring-2 ring-leaf/20 transition hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-ink">
              {island.flag} {island.name}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{island.tagline}</p>
            {island.detail ? <p className="mt-2 text-xs text-ink/50">{island.detail}</p> : null}
          </div>
          {island.featured ? <Chip tone="green">Featured</Chip> : null}
        </div>
        <p className="mt-4 text-sm font-semibold text-leaf transition group-hover:translate-x-1">
          Explore markets →
        </p>
      </Link>
    );
  }

  return (
    <div className="cursor-not-allowed rounded-[2rem] border border-clay bg-white p-5 opacity-55 shadow-soft">
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
  );
}

export default function IslandPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-clay bg-mist px-4 py-2 text-sm font-semibold text-ink transition hover:border-leaf/50"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-base font-semibold text-ink">Island Markets</h1>
          <p className="text-xs text-ink/55">Browse major islands, then explore by region</p>
        </div>
      </div>

      {islandSections.map((section) => (
        <section key={section.title} className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">{section.eyebrow}</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">{section.title}</h2>
          </div>
          <div className="grid gap-3">
            {section.items.map((island) => (
              <IslandCard key={`${section.title}-${island.name}`} island={island} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
