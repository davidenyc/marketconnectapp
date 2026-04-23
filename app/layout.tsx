import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketConnect",
  description: "Find active local produce vendors and update mobile market listings in real time."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-6 pt-4 sm:max-w-6xl sm:px-6">
          <header className="mb-4 flex items-center justify-between rounded-3xl border border-clay bg-mist/90 px-4 py-3 shadow-soft backdrop-blur">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf text-lg font-bold text-white">
                MC
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">MarketConnect</p>
                <p className="text-xs text-ink/65">Fresh produce, easier to find</p>
              </div>
            </Link>
            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link
                href="/auth"
                className="rounded-full border border-clay px-4 py-2 text-ink transition hover:bg-white"
              >
                Vendor login
              </Link>
              <Link href="/dashboard" className="rounded-full bg-leaf px-4 py-2 text-white transition hover:bg-leaf/90">
                Dashboard
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
