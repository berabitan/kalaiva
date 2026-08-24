import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Home() {
  const { data: artworks } = await supabase.from('artworks').select('*');

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a]">
      <header className="bg-[#1a1a1a] text-white p-6 flex justify-between items-center border-b-4 border-[#8b0000]">
        <h1 className="text-3xl font-bold tracking-widest text-[#d4af37]">KALAIVA</h1>
        <span className="text-xs sm:text-sm text-[#d4af37]">Fine Indian Art Marketplace</span>
      </header>

      <section className="text-center py-16 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white">
        <h2 className="text-4xl font-bold mb-4 text-[#d4af37]">Discover Authentic Indian Art</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Bridging traditional Indian artistic heritage with global collectors. Verified originals and limited editions.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-6">
        <h3 className="text-2xl font-bold text-center mb-8 text-[#8b0000]">Curated Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artworks?.map((art) => (
            <div key={art.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img src={art.image_url} alt={art.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-1">{art.title}</h4>
                <p className="text-sm text-gray-500 mb-4">{art.artist}</p>
                <p className="text-xl font-bold text-[#8b0000]">₹ {Number(art.price_inr).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#1a1a1a] text-gray-400 text-center py-8 mt-12 text-sm">
        <p>&copy; 2026 Kalaiva Art Services. Registered MSME Enterprise.</p>
        <p className="mt-1 text-xs text-gray-500">Supported under Pradhan Mantri Mudra Yojana (PMMY) Initiative.</p>
      </footer>
    </main>
  );
}