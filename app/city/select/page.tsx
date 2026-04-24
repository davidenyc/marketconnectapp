import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Chip } from "@/components/ui/chip";

type CityOption = {
  name: string;
  country: string;
  tagline: string;
  detail?: string;
  href?: string;
  featured?: boolean;
};

type CitySection = {
  title: string;
  eyebrow: string;
  items: CityOption[];
};

const citySections: CitySection[] = [
  {
    title: "Major city markets",
    eyebrow: "Live now",
    items: [
      {
        name: "New York City",
        country: "USA",
        tagline: "Union Square Greenmarket & more",
        detail: "7 vendors · 1 market · Mon/Wed/Fri/Sat",
        href: "/city",
        featured: true
      }
    ]
  },
  {
    title: "North America",
    eyebrow: "By continent",
    items: [
      {
        name: "Toronto",
        country: "Canada",
        tagline: "St. Lawrence Market"
      },
      {
        name: "Mexico City",
        country: "Mexico",
        tagline: "La Merced Market"
      }
    ]
  },
  {
    title: "Europe",
    eyebrow: "By continent",
    items: [
      {
        name: "London",
        country: "UK",
        tagline: "Borough Market & beyond"
      },
      {
        name: "Paris",
        country: "France",
        tagline: "Marché d'Aligre"
      }
    ]
  },
  {
    title: "South America",
    eyebrow: "By continent",
    items: [
      {
        name: "São Paulo",
        country: "Brazil",
        tagline: "Feira da Liberdade"
      },
      {
        name: "Lima",
        country: "Peru",
        tagline: "Mercado de Surquillo"
      }
    ]
  },
  {
    title: "Asia",
    eyebrow: "By continent",
    items: [
      {
        name: "Bangkok",
        country: "Thailand",
        tagline: "Or Tor Kor Market"
      },
      {
        name: "Manila",
        country: "Philippines",
        tagline: "Quiapo Market"
      }
    ]
  }
];

function CityCard({ city }: { city: CityOption }) {
  if (city.href) {
    return (
      <Link
        href={city.href}
        className="group block rounded-[2rem] border border-leaf bg-white p-5 shadow-soft ring-2 ring-leaf/20 transition hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold text-ink">
              {city.name}, {city.country}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{city.tagline}</p>
            {city.detail ? <p className="mt-2 text-xs text-ink/50">{city.detail}</p> : null}
          </div>
          {city.featured ? <Chip tone="green">Featured</Chip> : null}
        </div>
        <p className="mt-4 text-sm font-semibold text-leaf transition group-hover:translate-x-1">
          Go to market →
        </p>
      </Link>
    );
  }

  return (
    <div className="cursor-not-allowed rounded-[2rem] border border-clay bg-white p-5 opacity-55 shadow-soft">
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
  );
}

export default function CitySelectPage() {
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
          <h1 className="text-base font-semibold text-ink">City Markets</h1>
          <p className="text-xs text-ink/55">Browse major cities, then drill in by continent</p>
        </div>
      </div>

      {citySections.map((section) => (
        <section key={section.title} className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">{section.eyebrow}</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">{section.title}</h2>
          </div>
          <div className="grid gap-3">
            {section.items.map((city) => (
              <CityCard key={`${section.title}-${city.name}`} city={city} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
