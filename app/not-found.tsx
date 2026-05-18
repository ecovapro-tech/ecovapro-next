import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div>
        <div className="text-mint text-xs tracking-[4px] uppercase font-bold mb-3">404</div>
        <h1 className="font-serif font-black text-charcoal text-[clamp(32px,5vw,56px)] mb-4 tracking-tight">Page not found.</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">The page you tried to reach doesn't exist. Try the homepage, or jump straight to a service.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="bg-green text-white rounded-lg px-6 py-3 font-bold hover:bg-green-deep">Home</Link>
          <Link href="/end-of-tenancy-cleaning-london" className="border border-green text-green rounded-lg px-6 py-3 font-bold hover:bg-mint-bg">End of Tenancy</Link>
        </div>
      </div>
    </main>
  );
}
