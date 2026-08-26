import Link from 'next/link';

// Force dynamic rendering on every request
export const revalidate = 0;

export default async function Home() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let artworks: any[] = [];

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/artworks?select=*&order=created_at.desc`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: 'no-store',
      });
      if (res.ok) {
        artworks = await res.json();
      }
    } catch (e) {
      console.error('Failed to fetch artworks:', e);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      <div className="p-8">
        <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-bold tracking-wide text-amber-500">KALAIVA</h1>
          <Link 
            href="/upload" 
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-md font-semibold text-sm transition"
          >
            + Sell Artwork
          </Link>
        </header>

        <main className="max-w-6xl mx-auto">
          {artworks.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-xl">
              <p className="text-neutral-400 text-lg mb-4">No artworks found in the gallery yet.</p>
              <Link 
                href="/upload" 
                className="inline-block bg-amber-500 text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-400 transition"
              >
                Apply to List Your Art Today
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artworks.map((art) => (
                <div key={art.id} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition">
                  <img 
                    src={art.image_url} 
                    alt={art.title} 
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-white mb-1">{art.title}</h2>
                    <p className="text-neutral-400 text-sm mb-4">By {art.artist_name}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{Number(art.price).toLocaleString('en-IN')}
                      </span>
                      <button className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg font-semibold text-sm transition">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-neutral-800 bg-neutral-900 py-8 text-center text-sm text-neutral-400">
        <p>© 2026 Kalaiva. All rights reserved.</p>
      </footer>
    </div>
  );
}