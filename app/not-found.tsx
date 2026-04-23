import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-clay bg-[#fffaf0] p-6 text-center shadow-soft">
      <h1 className="text-2xl font-semibold text-ink">Vendor not found</h1>
      <p className="mt-3 text-sm text-ink/70">This vendor profile is missing or no longer available.</p>
      <Link href="/" className="mt-5 inline-flex rounded-2xl bg-leaf px-5 py-3 text-sm font-semibold text-white">
        Return to home
      </Link>
    </div>
  );
}
