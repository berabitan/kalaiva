import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabaseUrl = 'https://btnswdtodsmrnjexzlng.supabase.co';
  const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bnN3ZHRvZHNtcm5qZXh6bG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTk5NjAsImV4cCI6MjA0MDA5NTk2MH0';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: artworks, error } = await supabase.from('artworks').select('*');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Navigation Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-wider text-amber-500">
            KALAIVA
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <Link href="#gallery" className="hover:text-amber-400 transition">
              Explore Art
            </Link>
            <Link
              href="/upload"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2 rounded-md transition"
            >
              Sell Artwork
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-neutral-100">
          Discover & Collect <span className="text-amber-500">Authentic</span> Indian Art
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
          A curated marketplace bringing traditional craftsmanship and modern fine art directly from independent creators to your collection.
        </p>
        <a
          href="#gallery"
          className="inline-block bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-neutral-700 px-8 py-3 rounded-full font-medium transition"
        >
          View Collection
        </a>
      </section>

      {/* Marketplace Grid */}
      <main id="gallery" className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-serif font-bold mb-8 border-b border-neutral-800 pb-4 text-neutral-200">
          Featured Works
        </h2>

        {error && (
          <p className="text-red-400 text-center py-10">
            Unable to load artworks: {error.message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks && artworks.length > 0 ? (
            artworks.map((art: any) => (
              <div
                key={art.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 w-full bg-neutral-950 overflow-hidden relative">
                    {art.image_url ? (
                      <img
                        src={art.image_url}
                        alt={art.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-neutral-600">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-neutral-100 mb-1">
                      {art.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4">By {art.artist}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-800/50 mt-4">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                      Price
                    </span>
                    <span className="text-xl font-bold text-emerald-400">
                      ₹{art.price_inr?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2 rounded transition">
                    Inquire / Buy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-neutral-900/50 rounded-xl border border-neutral-800">
              <p className="text-neutral-400 text-lg mb-4">No artworks listed yet.</p>
              <Link
                href="/upload"
                className="text-amber-400 hover:underline font-semibold"
              >
                Be the first artist to publish a piece $\rightarrow$
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900 py-8 text-center text-sm text-neutral-500">
        <p>© 2026 Kalaiva. All rights reserved.</p>
      </footer>
    </div>
  );
}