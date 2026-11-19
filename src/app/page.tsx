'use client';

import React, { useState, useEffect } from 'react';

interface Artwork {
  id: number | string;
  title: string;
  artist: string;
  price: number;
  image_url: string;
  medium?: string;
  dimensions?: string;
  description?: string;
}

const DEMO_ARTWORKS: Artwork[] = [
  {
    id: 'demo-1',
    title: 'Palki – Bengal Heritage',
    artist: 'Arindam Sen',
    price: 20000,
    image_url: 'https://btnswdtodsmrnjexzlng.supabase.co/storage/v1/object/public/artworks/1787720113622.png',
    medium: 'Acrylic on Canvas',
    dimensions: '24 x 36 inches',
    description: 'Hand-painted traditional Bengali palanquin scene celebrating rural heritage and warmth.'
  },
  {
    id: 'demo-2',
    title: 'Bai Mela – Village Fair',
    artist: 'Moumita Das',
    price: 10000,
    image_url: 'https://btnswdtodsmrnjexzlng.supabase.co/storage/v1/object/public/artworks/1787642056043.png',
    medium: 'Oil Pastel & Mixed Media',
    dimensions: '18 x 24 inches',
    description: 'Vibrant colours of a traditional Bengal village mela captured in expressive strokes.'
  }
];

export default function KalaivaMarketplace() {
  const [artworks, setArtworks] = useState<Artwork[]>(DEMO_ARTWORKS);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [cart, setCart] = useState<Artwork[]>([]);
  const [activePage, setActivePage] = useState<'home' | 'checkout' | 'success' | 'about' | 'contact' | 'terms' | 'privacy' | 'refund'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderId, setOrderId] = useState('');

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('West Bengal');
  const [pincode, setPincode] = useState('');
  const [gstin, setGstin] = useState('');

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      fetch(`${url}/rest/v1/artworks?select=*&order=id.desc`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const cleaned = data.map((item: any) => ({
              id: item.id,
              title: item.title || 'Untitled Artwork',
              artist: !item.artist || item.artist.toLowerCase() === 'null' || item.artist.toLowerCase() === 'gemini'
                ? 'Kalaiva Verified Artist'
                : item.artist,
              price: Number(item.price) || 15000,
              image_url: item.image_url,
              medium: item.medium || 'Original Handcrafted Art',
              dimensions: item.dimensions || '24 x 30 inches',
              description: item.description || 'Original signed artwork with Certificate of Authenticity from Kalaiva.'
            }));
            setArtworks(cleaned);
          }
        })
        .catch(() => {});
    }
  }, []);

  const addToCart = (art: Artwork) => {
    if (!cart.find((item) => item.id === art.id)) {
      setCart([...cart, art]);
    }
    setSelectedArt(null);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromCart = (id: number | string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shippingFee = subtotal > 0 ? 500 : 0;
  const totalAmount = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `KLV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCart([]);
    setActivePage('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredArtworks = artworks.filter(
    (art) =>
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1f2937', backgroundColor: '#faf9f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Compliance & Trust Bar */}
      <div style={{ backgroundColor: '#1e1b4b', color: '#ffffff', fontSize: '12px', padding: '8px 16px', textAlign: 'center' }}>
        100% Authentic Indian Artworks | Insured Pan-India Delivery | Direct Artist Payouts
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => setActivePage('home')}
              style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '2px', color: '#312e81', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              KALAIVA
            </button>
            <nav style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: 500 }}>
              <button onClick={() => setActivePage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}>Gallery</button>
              <button onClick={() => setActivePage('about')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}>About Us</button>
              <button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}>Contact & Grievance</button>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="/upload"
              style={{ backgroundColor: '#f3f4f6', color: '#111827', padding: '9px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', border: '1px solid #d1d5db' }}
            >
              + Sell Artwork
            </a>
            <button
              onClick={() => setActivePage('checkout')}
              style={{ backgroundColor: '#312e81', color: '#ffffff', padding: '9px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 20px' }}>
        {activePage === 'home' && (
          <>
            {/* Hero Banner */}
            <section style={{ backgroundColor: '#312e81', color: '#ffffff', borderRadius: '16px', padding: '40px 32px', marginBottom: '36px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
                Discover & Collect Original Indian Art
              </h1>
              <p style={{ fontSize: '16px', color: '#e0e7ff', maxWidth: '680px', lineHeight: 1.6, marginBottom: '24px' }}>
                Kalaiva connects independent Indian painters, folk artisans, and contemporary studios directly with art collectors across India. Every piece includes a signed Certificate of Authenticity.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Search by artwork title or artist name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: '12px 16px', borderRadius: '8px', border: 'none', width: '320px', maxWidth: '100%', color: '#111827', fontSize: '14px' }}
                />
                <a
                  href="/upload"
                  style={{ backgroundColor: '#f59e0b', color: '#111827', padding: '12px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}
                >
                  Register as Artist & List Art
                </a>
              </div>
            </section>

            {/* Artwork Grid */}
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Curated Artworks ({filteredArtworks.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {filteredArtworks.map((art) => (
                <div key={art.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                  <img
                    src={art.image_url}
                    alt={art.title}
                    onClick={() => setSelectedArt(art)}
                    style={{ width: '100%', height: '240px', objectFit: 'cover', cursor: 'pointer' }}
                  />
                  <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#4338ca', backgroundColor: '#eef2ff', padding: '3px 8px', borderRadius: '4px' }}>
                        {art.medium || 'Original Artwork'}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', marginBottom: '4px' }}>{art.title}</h3>
                      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>By {art.artist}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>
                        ₹{art.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedArt(art)}
                          style={{ flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(art)}
                          style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', backgroundColor: '#312e81', color: '#ffffff', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Checkout Page */}
        {activePage === 'checkout' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '28px', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Checkout & Delivery Information</h2>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>Your cart is currently empty.</p>
                <button
                  onClick={() => setActivePage('home')}
                  style={{ backgroundColor: '#312e81', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Browse Artworks
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder}>
                <div style={{ marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Selected Artworks</h3>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <strong>{item.title}</strong> <span style={{ color: '#6b7280', fontSize: '13px' }}>by {item.artist}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 700 }}>₹{item.price.toLocaleString('en-IN')}</span>
                        <button type="button" onClick={() => removeFromCart(item.id)} style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563', marginTop: '12px' }}>
                    <span>Insured Fine-Art Packaging & Courier</span>
                    <span>₹{shippingFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, marginTop: '8px' }}>
                    <span>Total Payable (Inclusive of GST)</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <input required placeholder="Full Name *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required type="email" placeholder="Email Address *" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required placeholder="Mobile Number (+91) *" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input placeholder="GSTIN (Optional for B2B Invoice)" value={gstin} onChange={(e) => setGstin(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required placeholder="Complete Street Address *" value={address} onChange={(e) => setAddress(e.target.value)} style={{ gridColumn: '1 / -1', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required placeholder="City / District *" value={city} onChange={(e) => setCity(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required placeholder="State *" value={stateName} onChange={(e) => setStateName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                  <input required placeholder="PIN Code *" value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                </div>

                <button
                  type="submit"
                  style={{ width: '100%', backgroundColor: '#16a34a', color: '#ffffff', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Proceed to Secure Payment (UPI / Cards / NetBanking) — ₹{totalAmount.toLocaleString('en-IN')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Order Confirmation */}
        {activePage === 'success' && (
          <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#ffffff', padding: '36px', borderRadius: '14px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#15803d', marginBottom: '10px' }}>Order Confirmed!</h2>
            <p style={{ fontSize: '15px', color: '#374151', marginBottom: '16px' }}>
              Thank you, <strong>{customerName}</strong>. Your order reference ID is <strong>{orderId}</strong>.
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              Our artist packaging team will dispatch your artwork with insured courier tracking to {city}, {stateName} - {pincode}.
            </p>
            <button
              onClick={() => setActivePage('home')}
              style={{ backgroundColor: '#312e81', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              Return to Gallery
            </button>
          </div>
        )}

        {/* Legal & Compliance Pages */}
        {activePage === 'about' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb', lineHeight: 1.7 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>About Kalaiva</h2>
            <p style={{ marginBottom: '12px' }}>
              <strong>Kalaiva (kalaiva.com)</strong> is an Indian digital art marketplace and e-commerce service platform built to empower independent painters, traditional folk artists, and fine-art creators across West Bengal and India.
            </p>
            <p>
              By providing online storefront tools, digital marketing, insured logistics coordination, and transparent direct-to-bank payouts, Kalaiva bridges the gap between regional artists and art collectors worldwide.
            </p>
          </div>
        )}

        {activePage === 'contact' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>Contact Us & Grievance Officer Disclosure</h2>
            <p style={{ marginBottom: '14px' }}>
              In accordance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, the details of our registered business and Grievance Officer are provided below:
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Platform Name:</strong> Kalaiva (https://kalaiva.com)</li>
              <li><strong>Founder & Grievance Officer:</strong> Bitan Bera</li>
              <li><strong>Registered Office:</strong> Tamluk, Purba Medinipur, West Bengal - 721636, India</li>
              <li><strong>Customer & Artist Support Email:</strong> support@kalaiva.com</li>
              <li><strong>Grievance Resolution Timeline:</strong> Complaints are acknowledged within 48 hours and resolved within 15 working days.</li>
            </ul>
          </div>
        )}

        {activePage === 'terms' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb', lineHeight: 1.7 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>Terms & Conditions</h2>
            <p style={{ marginBottom: '10px' }}><strong>1. Marketplace Role:</strong> Kalaiva operates as an online e-commerce intermediary connecting independent artists with buyers.</p>
            <p style={{ marginBottom: '10px' }}><strong>2. Artwork Originality & Copyright:</strong> Artists retain full intellectual property copyright over their listed works and warrant that every listed item is 100% original and authentic.</p>
            <p style={{ marginBottom: '10px' }}><strong>3. Pricing & Commission:</strong> All prices are listed in Indian Rupees (INR). Kalaiva deducts an agreed platform service fee and remits net proceeds directly to the artist’s verified bank account upon successful delivery.</p>
          </div>
        )}

        {activePage === 'privacy' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb', lineHeight: 1.7 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>Privacy Policy (DPDP Act Compliant)</h2>
            <p style={{ marginBottom: '10px' }}>
              Kalaiva respects your digital privacy under India’s Digital Personal Data Protection (DPDP) Act, 2023. We collect only essential information (name, email, phone number, and delivery address) strictly to process orders, generate GST-compliant invoices, and coordinate insured courier delivery.
            </p>
            <p>
              All online payments are processed securely through PCI-DSS compliant Indian payment gateways (Razorpay/UPI). Kalaiva never stores your card or banking credentials on its servers.
            </p>
          </div>
        )}

        {activePage === 'refund' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px', borderRadius: '14px', border: '1px solid #e5e7eb', lineHeight: 1.7 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '14px' }}>Refund, Cancellation & Shipping Policy</h2>
            <p style={{ marginBottom: '10px' }}><strong>1. Shipping & Delivery:</strong> Artworks are packed in protective museum-grade tubes or wooden crates and dispatched within 3–5 business days. Pan-India delivery takes 5–10 business days.</p>
            <p style={{ marginBottom: '10px' }}><strong>2. Order Cancellation:</strong> Customers may cancel an order within 24 hours of placement before the artwork is dispatched for a 100% refund.</p>
            <p><strong>3. Transit Damage Refunds:</strong> If an artwork arrives damaged during courier transit, customers must share an unboxing photo/video within 48 hours of delivery to receive a full replacement or 100% refund to the original payment method within 5–7 business days.</p>
          </div>
        )}
      </main>

      {/* Artwork Detail Modal */}
      {selectedArt && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', maxWidth: '720px', width: '100%', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <img src={selectedArt.image_url} alt={selectedArt.title} style={{ width: '100%', height: '340px', objectFit: 'cover' }} />
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>{selectedArt.title}</h3>
                <p style={{ fontSize: '14px', color: '#4338ca', fontWeight: 600, marginBottom: '14px' }}>Artist: {selectedArt.artist}</p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, marginBottom: '12px' }}>{selectedArt.description}</p>
                <p style={{ fontSize: '13px', color: '#6b7280' }}><strong>Medium:</strong> {selectedArt.medium}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}><strong>Dimensions:</strong> {selectedArt.dimensions}</p>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>₹{selectedArt.price.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={() => addToCart(selectedArt)}
                  style={{ flex: 2, backgroundColor: '#312e81', color: '#ffffff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Buy This Artwork
                </button>
                <button
                  onClick={() => setSelectedArt(null)}
                  style={{ flex: 1, backgroundColor: '#f3f4f6', color: '#111827', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment-Gateway & Legal Compliance Footer */}
      <footer style={{ backgroundColor: '#111827', color: '#d1d5db', padding: '40px 20px', marginTop: '48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px', marginBottom: '28px' }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 800, letterSpacing: '1px', marginBottom: '10px' }}>KALAIVA</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.6 }}>
              India’s curated online marketplace for original paintings, folk art, and handcrafted visual artworks.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Legal & Policies</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <button onClick={() => { setActivePage('terms'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#d1d5db', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Terms & Conditions</button>
              <button onClick={() => { setActivePage('privacy'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#d1d5db', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Privacy Policy</button>
              <button onClick={() => { setActivePage('refund'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#d1d5db', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Refund, Cancellation & Shipping Policy</button>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Company & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <button onClick={() => { setActivePage('about'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#d1d5db', textAlign: 'left', cursor: 'pointer', padding: 0 }}>About Us</button>
              <button onClick={() => { setActivePage('contact'); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#d1d5db', textAlign: 'left', cursor: 'pointer', padding: 0 }}>Contact & Grievance Officer</button>
              <a href="/upload" style={{ color: '#fbbf24', textDecoration: 'none' }}>Artist Portal (+ Sell Artwork)</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '18px', fontSize: '12px', textAlign: 'center', color: '#9ca3af' }}>
          © 2026 Kalaiva (kalaiva.com). All rights reserved. | Registered in West Bengal, India.
        </div>
      </footer>
    </div>
  );
}
