import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-clay bg-mist px-4 py-2 text-sm font-semibold text-ink">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="text-lg font-semibold text-ink">City Markets</h1>
      </div>
      {children}
    </div>
  );
}
