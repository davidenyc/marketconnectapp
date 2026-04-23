import Link from "next/link";
import { Building2, Palmtree, Sprout } from "lucide-react";

const regionCards = [
  {
    title: "City Markets",
    subtitle: "Urban farmers markets",
    href: "/city",
    Icon: Building2,
    accentClassName: "bg-leaf text-white"
  },
  {
    title: "Island Markets",
    subtitle: "Caribbean & island produce",
    href: "/island",
    Icon: Palmtree,
    accentClassName: "bg-soil text-white"
  }
] as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col justify-center">
      <section className="rounded-[2rem] border border-clay bg-[#fffaf0] p-6 shadow-soft sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-leaf text-white shadow-soft">
            <Sprout className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-leaf">MarketConnect</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Find fresh produce near you.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink/70">
            Choose your market view and jump into a low-clutter map, fresh listings, and real vendor updates designed for quick browsing on the go.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {regionCards.map(({ title, subtitle, href, Icon, accentClassName }) => (
            <Link
              key={title}
              href={href}
              className="group flex min-h-[220px] flex-col justify-between rounded-[2rem] border border-clay bg-white p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-leaf/60"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] ${accentClassName}`}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{subtitle}</p>
              </div>
              <div className="mt-6 text-sm font-semibold text-leaf transition group-hover:translate-x-1">Enter market view</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
