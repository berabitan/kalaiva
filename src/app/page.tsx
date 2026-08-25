import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://btnswdtodsmrnjexzlng.supabase.co';

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bnN3ZHRvZHNtcm5qZXh6bG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTk5NjAsImV4cCI6MjA0MDA5NTk2MH0';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: artworks, error } = await supabase.from('artworks').select('*');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Kalaiva Artworks</h1>

        {error && (
          <p className="text-red-500 text-center">
            Error loading artworks: {error.message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks && artworks.length > 0 ? (
            artworks.map((art: any) => (
              <div
                key={art.id}
                className="border border-gray-700 p-4 rounded-lg shadow-md"
              >
                {art.image_url && (
                  <img
                    src={art.image_url}
                    alt={art.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{art.title}</h2>
                <p className="text-gray-400">By {art.artist}</p>
                <p className="text-green-400 font-bold mt-2">
                  ₹{art.price_inr}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No artworks found in database yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}