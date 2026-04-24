import Link from "next/link";
import { Building2, Palmtree, Sprout } from "lucide-react";

const regionCards = [
  {
    title: "City Markets",
    subtitle: "Urban farmers markets",
    href: "/city/select",
    Icon: Building2,
    accentClassName: "bg-leaf text-white",
    previewItems: ["🍎 Apples", "🍅 Tomatoes", "🧀 Cheese", "🌿 Greens"]
  },
  {
    title: "Island Markets",
    subtitle: "Caribbean & island produce",
    href: "/island",
    Icon: Palmtree,
    accentClassName: "bg-soil text-white",
    previewItems: ["🥭 Mango", "🌶️ Scotch bonnet", "🍌 Plantain", "✨ Nutmeg"]
  }
] as const;

const liveStats = ["12 vendors", "4 markets", "2 regions", "Updated today"] as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-11rem)] flex-col justify-center">
      <section
        className="overflow-hidden rounded-[2rem] border border-clay bg-[#fffaf0] p-4 shadow-soft sm:p-8"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, rgba(74,124,89,0.08) 2px, transparent 2px), radial-gradient(circle at 60px 60px, rgba(74,124,89,0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "80px 80px, 80px 80px"
        }}
      >
        <div className="mx-auto max-w-3xl text-center relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-leaf text-white shadow-soft sm:h-16 sm:w-16 sm:rounded-[1.5rem]">
            <Sprout className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-leaf sm:mt-4 sm:text-sm">MarketConnect</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:mt-3 sm:text-5xl">
            Find fresh produce near you.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink/70 sm:mt-4 sm:text-base sm:leading-7">
            Choose your market view and jump into a low-clutter map, fresh listings, and real vendor updates designed for quick browsing on the go.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {liveStats.map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-clay bg-white px-4 py-1.5 text-xs font-medium text-ink shadow-soft"
            >
              {stat}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          {regionCards.map(({ title, subtitle, href, Icon, accentClassName, previewItems }) => (
            <Link
              key={title}
              href={href}
              className="group flex min-h-[140px] flex-col justify-between rounded-[1.75rem] border border-clay bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-leaf/60 hover:shadow-[0_8px_30px_rgba(74,124,89,0.15)] sm:min-h-[220px] sm:rounded-[2rem] sm:p-6"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-[1.25rem] sm:h-14 sm:w-14 ${accentClassName}`}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="mt-3 sm:mt-10">
                <h2 className="text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
                <p className="mt-2 text-xs leading-5 text-ink/70 sm:text-sm sm:leading-6">{subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {previewItems.map((item) => (
                    <span
                      key={`${title}-${item}`}
                      className="rounded-full border border-clay bg-mist px-2.5 py-1 text-xs font-medium text-ink/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-xs font-semibold text-leaf transition group-hover:translate-x-1 sm:mt-6 sm:text-sm">
                Enter market view
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ink/45">
          Connecting buyers and sellers at local markets · free to use
        </p>
      </section>
    </div>
  );
}
