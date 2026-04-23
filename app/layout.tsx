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
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-3 pb-5 pt-3 sm:max-w-6xl sm:px-6 sm:pb-6 sm:pt-4">
          <header className="mb-3 flex flex-col gap-3 rounded-3xl border border-clay bg-mist/90 px-3 py-3 shadow-soft backdrop-blur sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-leaf text-base font-bold text-white sm:h-11 sm:w-11 sm:text-lg">
                MC
              </div>
              <div>
                <p className="text-base font-semibold text-ink sm:text-lg">MarketConnect</p>
                <p className="text-xs text-ink/65">Fresh produce, easier to find</p>
              </div>
            </Link>
            <nav className="grid grid-cols-2 gap-2 text-sm font-medium sm:flex sm:items-center">
              <Link
                href="/auth"
                className="rounded-full border border-clay px-4 py-2 text-center text-ink transition hover:bg-white"
              >
                Vendor login
              </Link>
              <Link href="/dashboard" className="rounded-full bg-leaf px-4 py-2 text-center text-white transition hover:bg-leaf/90">
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
