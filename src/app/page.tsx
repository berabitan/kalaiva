'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  User,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
  X,
  Palette,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Smartphone,
  Building2,
  Sparkles,
  ChevronRight,
  Package,
  IndianRupee,
  Upload,
  Menu
} from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  city: string;
  specialty: string;
  bio: string;
  verified: boolean;
  joinedYear: number;
  avatar: string;
}

interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  medium: string;
  dimensions: string;
  framed: string;
  year: number;
  price: number;
  image: string;
  description: string;
  certificate: boolean;
  dispatchDays: string;
  sold: boolean;
}

const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'Aarav Kulkarni',
    city: 'Pune, Maharashtra',
    specialty: 'Contemporary Oil & Impasto',
    bio: 'Aarav Kulkarni is a contemporary Indian painter whose textured impasto works explore monsoon light across the Western Ghats and historic Deccan architecture.',
    verified: true,
    joinedYear: 2025,
    avatar: 'AK'
  },
  {
    id: 'art-2',
    name: 'Meera Devi Jha',
    city: 'Madhubani, Bihar',
    specialty: 'Traditional Mithila & Folk Art',
    bio: 'A third-generation Mithila artist preserving natural-pigment storytelling on handmade cotton paper, celebrating rural festivities and ecological harmony.',
    verified: true,
    joinedYear: 2025,
    avatar: 'MD'
  },
  {
    id: 'art-3',
    name: 'Rohan Chatterjee',
    city: 'Kolkata, West Bengal',
    specialty: 'Watercolor & Urban Heritage',
    bio: 'Trained at Santiniketan, Rohan captures the nostalgic rhythm of North Kolkata tramlines, ghats, and heritage courtyards in luminous watercolor washes.',
    verified: true,
    joinedYear: 2026,
    avatar: 'RC'
  },
  {
    id: 'art-4',
    name: 'Ananya Nair',
    city: 'Kochi, Kerala',
    specialty: 'Acrylic & Mixed Media',
    bio: 'Ananya blends gold-leaf textures with rich acrylic pigments inspired by Kerala mural traditions and coastal botanical geometry.',
    verified: true,
    joinedYear: 2026,
    avatar: 'AN'
  }
];

const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'kw-101',
    title: 'Monsoon Dusk over Sahyadri',
    artistId: 'art-1',
    artistName: 'Aarav Kulkarni',
    medium: 'Oil',
    dimensions: '36 × 48 in (91 × 122 cm)',
    framed: 'Gallery Wrapped (Unframed)',
    year: 2026,
    price: 42000,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=80',
    description: 'Rich palette-knife oil strokes capturing the golden break in clouds after an evening monsoon downpour over the Sahyadri hills.',
    certificate: true,
    dispatchDays: '4–6 Business Days',
    sold: false
  },
  {
    id: 'kw-102',
    title: 'Sacred Banyan & Kohbar Motif',
    artistId: 'art-2',
    artistName: 'Meera Devi Jha',
    medium: 'Traditional/Folk',
    dimensions: '22 × 30 in (56 × 76 cm)',
    framed: 'Teakwood Frame with UV Acrylic',
    year: 2026,
    price: 18500,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
    description: 'Hand-painted using bamboo nibs and mineral pigments on archival handmade paper, depicting abundance and interconnected life.',
    certificate: true,
    dispatchDays: '3–5 Business Days',
    sold: false
  },
  {
    id: 'kw-103',
    title: 'Morning Mist at Prinsep Ghat',
    artistId: 'art-3',
    artistName: 'Rohan Chatterjee',
    medium: 'Watercolor',
    dimensions: '18 × 24 in (46 × 61 cm)',
    framed: 'Matte Black Archival Frame',
    year: 2025,
    price: 14000,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
    description: 'Wet-on-wet watercolor study on 300 GSM cold-pressed cotton rag paper, evoking quiet dawn reflections along the Hooghly.',
    certificate: true,
    dispatchDays: '3–5 Business Days',
    sold: false
  },
  {
    id: 'kw-104',
    title: 'Golden Lotus & Terracotta Rhythm',
    artistId: 'art-4',
    artistName: 'Ananya Nair',
    medium: 'Mixed Media',
    dimensions: '30 × 30 in (76 × 76 cm)',
    framed: 'Floating Oak Wood Frame',
    year: 2026,
    price: 34500,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1000&q=80',
    description: 'Layered acrylics, textured gesso, and 24k imitation gold leaf celebrating classical Indian temple geometry in a modern living space.',
    certificate: true,
    dispatchDays: '5–7 Business Days',
    sold: false
  },
  {
    id: 'kw-105',
    title: 'Banaras Dawn Boatmen',
    artistId: 'art-3',
    artistName: 'Rohan Chatterjee',
    medium: 'Acrylic',
    dimensions: '24 × 36 in (61 × 91 cm)',
    framed: 'Gallery Wrapped (Ready to Hang)',
    year: 2026,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=80',
    description: 'Warm ochre and vermilion acrylic brushwork capturing wooden boats docked along ancient stone steps at sunrise.',
    certificate: true,
    dispatchDays: '4–6 Business Days',
    sold: false
  },
  {
    id: 'kw-106',
    title: 'Deccan Courtyard in Bloom',
    artistId: 'art-1',
    artistName: 'Aarav Kulkarni',
    medium: 'Oil',
    dimensions: '24 × 24 in (61 × 61 cm)',
    framed: 'Natural Teak Floater Frame',
    year: 2025,
    price: 29500,
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=80',
    description: 'Sun-drenched bougainvillea cascading over weathered lime-plaster walls painted in expressive oil brushwork.',
    certificate: true,
    dispatchDays: '4–6 Business Days',
    sold: false
  }
];

const INITIAL_ORDERS = [
  {
    orderId: 'KLV-2026-8841',
    date: '14 Nov 2026',
    artworkTitle: 'Twilight Over Pichola',
    artistId: 'art-1',
    artistName: 'Aarav Kulkarni',
    customerName: 'Vikramaditya Mehta',
    city: 'Kolkata, West Bengal',
    subtotal: 25000,
    gst: 3000,
    shipping: 0,
    total: 28000,
    paymentMethod: 'UPI (Razorpay)',
    status: 'Delivered'
  }
];

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

export default function App() {
  const [activePage, setActivePage] = useState('gallery');
  const [selectedArtistId, setSelectedArtistId] = useState('art-1');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [currentUser, setCurrentUser] = useState<{
    role: string;
    name: string;
    email: string;
    artistId?: string;
  }>({
    role: 'artist',
    name: 'Rohan Chatterjee',
    email: 'rohan.art@kalaiva.com',
    artistId: 'art-3'
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [authRole, setAuthRole] = useState('customer');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');

  const [mediumFilter, setMediumFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'West Bengal',
    pincode: '',
    gstin: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [latestOrder, setLatestOrder] = useState<any>(null);

  const [newArt, setNewArt] = useState({
    title: '',
    medium: 'Oil',
    dimensions: '24 × 36 in (61 × 91 cm)',
    framed: 'Gallery Wrapped (Ready to Hang)',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
  });
  const [uploadSuccess, setUploadSuccess] = useState('');

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Load any live artworks from your Supabase database alongside curated works
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
            const dbWorks: Artwork[] = data.map((item: any, idx: number) => ({
              id: `db-${item.id || idx}`,
              title: item.title || 'Untitled Studio Work',
              artistId: 'art-3',
              artistName:
                !item.artist || item.artist.toLowerCase() === 'null' || item.artist.toLowerCase() === 'gemini'
                  ? 'Rohan Chatterjee'
                  : item.artist,
              medium: item.medium || 'Oil',
              dimensions: item.dimensions || '24 × 30 in (61 × 76 cm)',
              framed: 'Gallery Wrapped (Ready to Hang)',
              year: 2026,
              price: Number(item.price) || 15000,
              image: item.image_url,
              description:
                item.description ||
                'Original signed Indian artwork accompanied by a Kalaiva Certificate of Authenticity.',
              certificate: true,
              dispatchDays: '4–6 Business Days',
              sold: Boolean(item.is_sold)
            }));
            setArtworks([...dbWorks, ...INITIAL_ARTWORKS]);
          }
        })
        .catch(() => {});
    }
  }, []);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((item) => {
      const matchesMedium = mediumFilter === 'All' || item.medium === mediumFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.medium.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesPrice = true;
      if (priceFilter === 'under20') matchesPrice = item.price < 20000;
      if (priceFilter === '20to35') matchesPrice = item.price >= 20000 && item.price <= 35000;
      if (priceFilter === 'above35') matchesPrice = item.price > 35000;
      return matchesMedium && matchesSearch && matchesPrice;
    });
  }, [artworks, mediumFilter, priceFilter, searchQuery]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartGst = Math.round(cartSubtotal * 0.12);
  const cartShipping = cartSubtotal > 0 ? (cartSubtotal >= 25000 ? 0 : 850) : 0;
  const cartTotal = cartSubtotal + cartGst + cartShipping;

  const addToCart = (artwork: Artwork) => {
    if (artwork.sold) {
      showToast('This original artwork has already been acquired.');
      return;
    }
    if (cart.some((c) => c.id === artwork.id)) {
      setCartOpen(true);
      return;
    }
    setCart([...cart, artwork]);
    setCheckoutStep('cart');
    showToast(`"${artwork.title}" added to your art crate.`);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleBuyNow = (artwork: Artwork) => {
    if (!cart.some((c) => c.id === artwork.id)) {
      setCart([...cart, artwork]);
    }
    setSelectedArtwork(null);
    setCheckoutStep('address');
    setCartOpen(true);
  };

  const openArtistProfile = (artistId: string) => {
    setSelectedArtistId(artistId);
    setSelectedArtwork(null);
    setActivePage('artist-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;
    const displayName = authName.trim() || authEmail.split('@')[0];
    if (authRole === 'artist') {
      const existingArtist = artists.find(
        (a) => a.name.toLowerCase() === displayName.toLowerCase()
      );
      const artistId = existingArtist ? existingArtist.id : `art-${Date.now()}`;
      if (!existingArtist) {
        setArtists([
          ...artists,
          {
            id: artistId,
            name: displayName,
            city: 'Kolkata, West Bengal',
            specialty: 'Contemporary Visual Art',
            bio: 'Independent Indian visual artist exhibiting original studio works on Kalaiva.',
            verified: true,
            joinedYear: 2026,
            avatar: displayName.slice(0, 2).toUpperCase()
          }
        ]);
      }
      setCurrentUser({ role: 'artist', name: displayName, email: authEmail, artistId });
      showToast(`Signed in as Artist: ${displayName}`);
    } else {
      setCurrentUser({ role: 'customer', name: displayName, email: authEmail });
      showToast(`Welcome to Kalaiva, ${displayName}`);
    }
    setAuthModalOpen(false);
    setAuthName('');
    setAuthEmail('');
  };

  const handlePublishArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseInt(newArt.price, 10);
    if (!newArt.title.trim() || isNaN(numericPrice) || numericPrice < 500) {
      showToast('Please enter a valid artwork title and price (minimum ₹500).');
      return;
    }
    const artistName = currentUser?.role === 'artist' ? currentUser.name : 'Rohan Chatterjee';
    const artistId = currentUser?.artistId || 'art-3';

    const created: Artwork = {
      id: `kw-${Math.floor(100 + Math.random() * 900)}`,
      title: newArt.title.trim(),
      artistId,
      artistName,
      medium: newArt.medium,
      dimensions: newArt.dimensions,
      framed: newArt.framed,
      year: 2026,
      price: numericPrice,
      image: newArt.image,
      description:
        newArt.description.trim() ||
        'Original hand-crafted artwork signed by the artist and accompanied by a Kalaiva Certificate of Authenticity.',
      certificate: true,
      dispatchDays: '4–6 Business Days',
      sold: false
    };

    setArtworks([created, ...artworks]);
    setUploadSuccess(`"${created.title}" is now live in the Kalaiva Gallery!`);
    setNewArt({
      ...newArt,
      title: '',
      price: '',
      description: ''
    });
    showToast('Artwork published to live gallery!');
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingForm.fullName ||
      !shippingForm.phone ||
      !shippingForm.email ||
      !shippingForm.address ||
      !shippingForm.city ||
      !shippingForm.pincode
    ) {
      showToast('Please complete all required delivery fields.');
      return;
    }
    setCheckoutStep('payment');
  };

  const handleRazorpayConfirm = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      const orderNum = `KLV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const purchasedIds = cart.map((c) => c.id);

      setArtworks((prev) =>
        prev.map((art) => (purchasedIds.includes(art.id) ? { ...art, sold: true } : art))
      );

      const newOrderRecords = cart.map((item) => ({
        orderId: orderNum,
        date: '19 Nov 2026',
        artworkTitle: item.title,
        artistId: item.artistId,
        artistName: item.artistName,
        customerName: shippingForm.fullName,
        city: `${shippingForm.city}, ${shippingForm.state}`,
        subtotal: item.price,
        gst: Math.round(item.price * 0.12),
        shipping: cartShipping,
        total: item.price + Math.round(item.price * 0.12) + cartShipping,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (Razorpay)'
            : paymentMethod === 'card'
            ? 'Credit/Debit Card (Razorpay)'
            : 'Netbanking (Razorpay)',
        status: 'Order Confirmed — Crating Scheduled'
      }));

      setOrders([...newOrderRecords, ...orders]);
      setLatestOrder({
        orderId: orderNum,
        items: [...cart],
        subtotal: cartSubtotal,
        gst: cartGst,
        shipping: cartShipping,
        total: cartTotal,
        customer: { ...shippingForm },
        method: newOrderRecords[0]?.paymentMethod || 'Razorpay Online'
      });

      setCart([]);
      setProcessingPayment(false);
      setCheckoutStep('confirmed');
    }, 1100);
  };

  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#9A3412] selection:text-white">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1C1917] text-[#FAF8F5] px-4 py-3 rounded-lg shadow-xl border border-[#44403C] flex items-center gap-2.5 text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Compliance / Trust Strip */}
      <div className="bg-[#1C1917] text-[#E7E5E4] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              100% Original Signed Artworks with Certificate of Authenticity
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#A8A29E]">
              <Truck className="w-3.5 h-3.5 text-[#D97706]" />
              Insured Pan-India Art Crate Delivery
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#D6D3D1]">
            <span>GST &amp; E-Commerce Compliant Marketplace</span>
            <span>•</span>
            <button
              onClick={() => navigateTo('contact')}
              className="underline hover:text-white transition"
            >
              Grievance &amp; Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('gallery')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#9A3412] text-[#FAF8F5] flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#7C2D12] transition">
              K
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1917] block leading-none">
                Kalaiva
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#78716C] block mt-0.5">
                Indian Art Marketplace
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]">
            <button
              onClick={() => navigateTo('gallery')}
              className={`hover:text-[#9A3412] transition ${
                activePage === 'gallery' ? 'text-[#9A3412] font-semibold' : ''
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => navigateTo('artists')}
              className={`hover:text-[#9A3412] transition ${
                activePage === 'artists' || activePage === 'artist-profile'
                  ? 'text-[#9A3412] font-semibold'
                  : ''
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => navigateTo('sell')}
              className={`inline-flex items-center gap-1.5 hover:text-[#9A3412] transition ${
                activePage === 'sell' ? 'text-[#9A3412] font-semibold' : ''
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#9A3412]" />
              Sell Artwork
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#9A3412] transition ${
                activePage === 'about' ? 'text-[#9A3412] font-semibold' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#9A3412] transition ${
                activePage === 'contact' ? 'text-[#9A3412] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D6D3D1] bg-white hover:bg-[#F5F5F4] text-xs sm:text-sm font-medium text-[#1C1917] transition"
            >
              <User className="w-4 h-4 text-[#9A3412]" />
              <span className="max-w-[110px] truncate">
                {currentUser ? currentUser.name.split(' ')[0] : 'Login / Sign Up'}
              </span>
              {currentUser && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA]">
                  {currentUser.role}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCheckoutStep('cart');
                setCartOpen(true);
              }}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white text-sm font-medium transition shadow-sm"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-[#FAF8F5] text-[#9A3412]">
                {cart.length}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#D6D3D1] text-[#1C1917]"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E5E4] bg-[#FAF8F5] px-4 py-3 flex flex-col gap-2.5 text-sm font-medium">
            <button onClick={() => navigateTo('gallery')} className="text-left py-1.5">
              Gallery
            </button>
            <button onClick={() => navigateTo('artists')} className="text-left py-1.5">
              Artists Directory
            </button>
            <button
              onClick={() => navigateTo('sell')}
              className="text-left py-1.5 text-[#9A3412] font-semibold"
            >
              + Sell Artwork (Artist Studio)
            </button>
            <button onClick={() => navigateTo('about')} className="text-left py-1.5">
              About Kalaiva
            </button>
            <button onClick={() => navigateTo('contact')} className="text-left py-1.5">
              Contact &amp; Grievance Officer
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* GALLERY VIEW */}
        {activePage === 'gallery' && (
          <div>
            <section className="border-b border-[#E7E5E4] bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] text-xs font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    Direct from Verified Indian Artist Studios
                  </div>
                  <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] leading-[1.15]">
                    Collect Original Indian Art, Crafted with Heritage &amp; Soul.
                  </h1>
                  <p className="text-base sm:text-lg text-[#57534E] max-w-2xl leading-relaxed">
                    Kalaiva connects discerning collectors directly with independent painters and
                    traditional master artisans across India. Every acquisition includes a signed
                    Certificate of Authenticity and museum-grade insured shipping.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href="#curated-catalog"
                      className="px-6 py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-medium text-sm transition shadow-sm inline-flex items-center gap-2"
                    >
                      Explore Original Works
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => navigateTo('sell')}
                      className="px-6 py-3 rounded-lg bg-white hover:bg-[#F5F5F4] text-[#1C1917] border border-[#D6D3D1] font-medium text-sm transition inline-flex items-center gap-2"
                    >
                      <Palette className="w-4 h-4 text-[#9A3412]" />
                      List Your Artwork (90% Artist Payout)
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] shadow-md">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F5F4] relative">
                      <img
                        src={artworks[0].image}
                        alt={artworks[0].title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1917]/85 text-white text-xs font-medium">
                        Curator&apos;s Spotlight
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                          {artworks[0].title}
                        </h2>
                        <button
                          onClick={() => openArtistProfile(artworks[0].artistId)}
                          className="text-sm text-[#78716C] hover:text-[#9A3412] underline-offset-2 hover:underline"
                        >
                          By {artworks[0].artistName} • {artworks[0].medium}
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-base text-[#1C1917] block">
                          {formatINR(artworks[0].price)}
                        </span>
                        <button
                          onClick={() => setSelectedArtwork(artworks[0])}
                          className="text-xs font-semibold text-[#9A3412] hover:underline"
                        >
                          Inspect Work →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="curated-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    Curated Gallery Catalog
                  </h2>
                  <p className="text-sm text-[#78716C] mt-1">
                    Showing {filteredArtworks.length} verified original artworks across India
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search title, artist, or medium..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#D6D3D1] rounded-lg text-sm focus:outline-none focus:border-[#9A3412]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Medium:
                  </span>
                  {['All', 'Oil', 'Acrylic', 'Watercolor', 'Traditional/Folk', 'Mixed Media'].map(
                    (med) => (
                      <button
                        key={med}
                        onClick={() => setMediumFilter(med)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                          mediumFilter === med
                            ? 'bg-[#9A3412] text-white shadow-sm'
                            : 'bg-white text-[#44403C] border border-[#E7E5E4] hover:border-[#9A3412]'
                        }`}
                      >
                        {med}
                      </button>
                    )
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="price-filter" className="text-xs font-semibold text-[#78716C]">
                    Price:
                  </label>
                  <select
                    id="price-filter"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="bg-white border border-[#D6D3D1] rounded-lg px-3 py-1.5 text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#9A3412]"
                  >
                    <option value="All">All Price Ranges</option>
                    <option value="under20">Under ₹20,000</option>
                    <option value="20to35">₹20,000 – ₹35,000</option>
                    <option value="above35">Above ₹35,000</option>
                  </select>
                </div>
              </div>

              {filteredArtworks.length === 0 ? (
                <div className="bg-white border border-[#E7E5E4] rounded-2xl p-12 text-center my-6">
                  <p className="font-serif text-xl text-[#1C1917]">
                    No artworks match your current filter.
                  </p>
                  <button
                    onClick={() => {
                      setMediumFilter('All');
                      setPriceFilter('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#9A3412] text-white text-sm font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-2">
                  {filteredArtworks.map((art) => (
                    <article
                      key={art.id}
                      className="group bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                    >
                      <div
                        onClick={() => setSelectedArtwork(art)}
                        className="aspect-[4/3] bg-[#F5F5F4] overflow-hidden relative cursor-pointer"
                      >
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#1C1917] text-xs font-medium shadow-xs">
                            {art.medium}
                          </span>
                        </div>
                        {art.sold && (
                          <div className="absolute inset-0 bg-[#1C1917]/60 flex items-center justify-center">
                            <span className="px-4 py-1.5 rounded-full bg-[#9A3412] text-white text-xs font-bold uppercase tracking-widest">
                              Acquired
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3
                            onClick={() => setSelectedArtwork(art)}
                            className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#9A3412] transition cursor-pointer"
                          >
                            {art.title}
                          </h3>
                          <button
                            onClick={() => openArtistProfile(art.artistId)}
                            className="text-sm text-[#57534E] hover:text-[#9A3412] font-medium mt-0.5 inline-flex items-center gap-1"
                          >
                            By {art.artistName}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <p className="text-xs text-[#78716C] mt-2">
                            {art.dimensions} • {art.framed}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F5F5F4] flex items-center justify-between gap-2">
                          <div>
                            <span className="text-xs text-[#78716C] block">Price (Excl. GST)</span>
                            <span className="text-lg font-bold text-[#1C1917]">
                              {formatINR(art.price)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedArtwork(art)}
                              className="px-3 py-2 rounded-lg border border-[#D6D3D1] hover:bg-[#F5F5F4] text-xs font-semibold text-[#1C1917] transition"
                            >
                              Details
                            </button>
                            <button
                              disabled={art.sold}
                              onClick={() => addToCart(art)}
                              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                                art.sold
                                  ? 'bg-[#E7E5E4] text-[#78716C] cursor-not-allowed'
                                  : 'bg-[#9A3412] hover:bg-[#7C2D12] text-white shadow-xs'
                              }`}
                            >
                              {art.sold ? 'Sold' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ARTISTS DIRECTORY */}
        {activePage === 'artists' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Verified Creator Network
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1">
                Artists on Kalaiva
              </h1>
              <p className="text-sm sm:text-base text-[#57534E] mt-2">
                Every artist undergoes KYC and portfolio verification so collectors can acquire
                authentic work with complete confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artists.map((artist) => {
                const count = artworks.filter((a) => a.artistId === artist.id).length;
                return (
                  <div
                    key={artist.id}
                    className="bg-white rounded-2xl border border-[#E7E5E4] p-6 flex flex-col justify-between gap-5 shadow-xs"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] font-serif font-bold text-xl flex items-center justify-center shrink-0">
                        {artist.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                            {artist.name}
                          </h2>
                          {artist.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Verified Studio
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#78716C] mt-0.5">
                          {artist.city} • {artist.specialty}
                        </p>
                        <p className="text-sm text-[#44403C] mt-3 leading-relaxed">{artist.bio}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#F5F5F4] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#78716C]">
                        {count} {count === 1 ? 'Artwork' : 'Artworks'} Listed
                      </span>
                      <button
                        onClick={() => openArtistProfile(artist.id)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A3412] hover:text-[#7C2D12]"
                      >
                        Visit Artist Portfolio
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SINGLE ARTIST PROFILE */}
        {activePage === 'artist-profile' && (() => {
          const artist = artists.find((a) => a.id === selectedArtistId) || artists[0];
          const artistWorks = artworks.filter((a) => a.artistId === artist.id);
          return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <button
                onClick={() => navigateTo('artists')}
                className="text-xs font-semibold text-[#78716C] hover:text-[#9A3412] mb-6 inline-flex items-center gap-1"
              >
                ← Back to All Artists
              </button>

              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#9A3412] text-white font-serif text-2xl sm:text-3xl font-bold flex items-center justify-center shrink-0">
                    {artist.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                        {artist.name}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> KYC Verified Artist
                      </span>
                    </div>
                    <p className="text-sm text-[#78716C] mt-1">
                      {artist.city} • {artist.specialty} • Member since {artist.joinedYear}
                    </p>
                    <p className="text-sm sm:text-base text-[#44403C] mt-3 max-w-3xl leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#1C1917] mb-6">
                Available &amp; Exhibited Works by {artist.name} ({artistWorks.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {artistWorks.map((art) => (
                  <div
                    key={art.id}
                    className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-xs flex flex-col"
                  >
                    <div
                      onClick={() => setSelectedArtwork(art)}
                      className="aspect-[4/3] bg-[#F5F5F4] cursor-pointer overflow-hidden"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1C1917]">{art.title}</h3>
                        <p className="text-xs text-[#78716C] mt-1">
                          {art.medium} • {art.dimensions}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F4]">
                        <span className="font-bold text-base">{formatINR(art.price)}</span>
                        <button
                          onClick={() => addToCart(art)}
                          disabled={art.sold}
                          className="px-3.5 py-2 rounded-lg bg-[#9A3412] text-white text-xs font-semibold disabled:bg-[#E7E5E4] disabled:text-[#78716C]"
                        >
                          {art.sold ? 'Acquired' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ARTIST DASHBOARD & SELL ARTWORK */}
        {activePage === 'sell' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E7E5E4]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                  Kalaiva Creator Studio
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
                  Artist Dashboard &amp; Artwork Listing
                </h1>
                <p className="text-sm text-[#57534E] mt-1">
                  Upload original artworks, track collector orders, and monitor your 90% artist
                  payouts.
                </p>
              </div>
              <div className="bg-[#FFF7ED] border border-[#FED7AA] px-4 py-3 rounded-xl text-xs text-[#9A3412]">
                <span className="font-bold block">Transparent Marketplace Commission</span>
                Artists retain <strong>90%</strong> of artwork sale price • Kalaiva platform fee:{' '}
                <strong>10%</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-1 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#9A3412]" />
                  Publish New Artwork to Gallery
                </h2>
                <p className="text-xs text-[#78716C] mb-6">
                  Publishing as{' '}
                  <strong>
                    {currentUser?.role === 'artist' ? currentUser.name : 'Rohan Chatterjee'}
                  </strong>
                </p>

                {uploadSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      {uploadSuccess}
                    </span>
                    <button
                      onClick={() => navigateTo('gallery')}
                      className="text-xs font-bold underline shrink-0"
                    >
                      View in Gallery →
                    </button>
                  </div>
                )}

                <form onSubmit={handlePublishArtwork} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Artwork Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newArt.title}
                      onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                      placeholder="e.g., Sunset Over Sundarbans"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm focus:outline-none focus:border-[#9A3412]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Art Medium *
                      </label>
                      <select
                        value={newArt.medium}
                        onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm bg-white focus:outline-none focus:border-[#9A3412]"
                      >
                        <option value="Oil">Oil</option>
                        <option value="Acrylic">Acrylic</option>
                        <option value="Watercolor">Watercolor</option>
                        <option value="Traditional/Folk">Traditional/Folk</option>
                        <option value="Mixed Media">Mixed Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Selling Price (INR ₹) *
                      </label>
                      <input
                        type="number"
                        required
                        min="500"
                        value={newArt.price}
                        onChange={(e) => setNewArt({ ...newArt, price: e.target.value })}
                        placeholder="e.g., 22000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm focus:outline-none focus:border-[#9A3412]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Dimensions (Inches / cm) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newArt.dimensions}
                        onChange={(e) => setNewArt({ ...newArt, dimensions: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm focus:outline-none focus:border-[#9A3412]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Framing Status
                      </label>
                      <select
                        value={newArt.framed}
                        onChange={(e) => setNewArt({ ...newArt, framed: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm bg-white focus:outline-none focus:border-[#9A3412]"
                      >
                        <option value="Gallery Wrapped (Ready to Hang)">
                          Gallery Wrapped (Ready to Hang)
                        </option>
                        <option value="Teakwood Frame with UV Acrylic">
                          Teakwood Frame with UV Acrylic
                        </option>
                        <option value="Rolled in Archival Tube (Unframed)">
                          Rolled in Archival Tube (Unframed)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Artwork Sample Preset
                    </label>
                    <select
                      value={newArt.image}
                      onChange={(e) => setNewArt({ ...newArt, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm bg-white focus:outline-none focus:border-[#9A3412]"
                    >
                      <option value="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80">
                        Studio Sample 1 — Floral Botanical Oil Study
                      </option>
                      <option value="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1000&q=80">
                        Studio Sample 2 — Vibrant Contemporary Abstract
                      </option>
                      <option value="https://images.unsplash.com/photo-1578926288207-a90a5366759d?auto=format&fit=crop&w=1000&q=80">
                        Studio Sample 3 — Classical Landscape Canvas
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Curatorial Story &amp; Medium Notes
                    </label>
                    <textarea
                      rows={3}
                      value={newArt.description}
                      onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                      placeholder="Describe the inspiration, surface material (canvas/cotton rag), and pigments used..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm focus:outline-none focus:border-[#9A3412]"
                    />
                  </div>

                  {newArt.price && !isNaN(parseInt(newArt.price, 10)) && (
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-between text-xs">
                      <span className="text-[#57534E]">
                        Estimated Artist Net Payout (90% after 10% platform service fee):
                      </span>
                      <span className="font-bold text-sm text-emerald-800">
                        {formatINR(Math.round(parseInt(newArt.price, 10) * 0.9))}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition shadow-sm"
                  >
                    Publish Artwork to Kalaiva Gallery
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block mb-3">
                    Live Listing Preview
                  </span>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F5F4] mb-3">
                    <img
                      src={newArt.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                    {newArt.title || 'Untitled Studio Work'}
                  </h3>
                  <p className="text-xs text-[#78716C]">
                    {newArt.medium} • {newArt.dimensions}
                  </p>
                  <p className="font-bold text-base text-[#9A3412] mt-2">
                    {newArt.price ? formatINR(parseInt(newArt.price, 10) || 0) : '₹0'}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5">
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#9A3412]" />
                    Recent Collector Orders &amp; Payouts
                  </h3>
                  <div className="space-y-3">
                    {orders.map((ord, idx) => {
                      const artistShare = Math.round(ord.subtotal * 0.9);
                      return (
                        <div
                          key={`${ord.orderId}-${idx}`}
                          className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                            <span>{ord.orderId}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {ord.status}
                            </span>
                          </div>
                          <p className="font-medium text-[#44403C]">
                            Artwork: <strong>{ord.artworkTitle}</strong>
                          </p>
                          <p className="text-[#78716C]">
                            Buyer: {ord.customerName} ({ord.city})
                          </p>
                          <div className="pt-2 border-t border-[#E7E5E4] flex items-center justify-between">
                            <span>Sale: {formatINR(ord.subtotal)}</span>
                            <span className="font-bold text-emerald-800">
                              Artist Payout (90%): {formatINR(artistShare)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT US */}
        {activePage === 'about' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="border-b border-[#E7E5E4] pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                About Kalaiva
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2">
                Empowering India&apos;s Visual Artists Through Technology
              </h1>
            </div>

            <div className="space-y-4 text-[#44403C] leading-relaxed text-base">
              <p>
                <strong>Kalaiva (kalaiva.com)</strong> is an Indian digital art marketplace and
                technology service platform designed to bridge the gap between independent studio
                artists, traditional folk artisans, and art collectors across India.
              </p>
              <p>
                Historically, emerging and regional Indian artists have faced steep gallery
                commissions of 40% to 50% and limited access to verified nationwide buyers. Kalaiva
                replaces traditional middlemen with a transparent digital storefront—enabling
                artists to manage their own verified portfolios, authenticate original works, and
                retain <strong>90% of every sale</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4]">
                <Award className="w-6 h-6 text-[#9A3412] mb-2.5" />
                <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                  Verified Authenticity
                </h3>
                <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                  Every painting and folk artwork is dispatched with a signed Certificate of
                  Authenticity directly from the creator.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4]">
                <IndianRupee className="w-6 h-6 text-[#9A3412] mb-2.5" />
                <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                  Fair 90% Creator Share
                </h3>
                <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                  Kalaiva charges a flat 10% platform technology &amp; payment facilitation fee,
                  ensuring sustainable livelihoods for artists.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4]">
                <Truck className="w-6 h-6 text-[#9A3412] mb-2.5" />
                <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                  Insured Art Logistics
                </h3>
                <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                  Moisture-sealed, corner-protected custom art crating with end-to-end transit
                  insurance across 28 states and 8 Union Territories.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT & GRIEVANCE OFFICER */}
        {activePage === 'contact' && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="border-b border-[#E7E5E4] pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Customer Support &amp; Statutory Disclosures
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
                Contact Us &amp; Grievance Redressal
              </h1>
              <p className="text-sm text-[#57534E] mt-2">
                Published in compliance with the Consumer Protection (E-Commerce) Rules, 2020 and
                Information Technology Act, 2000.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] space-y-4">
                  <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                    Registered Office &amp; Support
                  </h2>
                  <div className="space-y-3 text-sm text-[#44403C]">
                    <p className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-1" />
                      <span>
                        <strong>Legal Entity:</strong> Kalaiva (MSME Udyam Registered Digital Art
                        Marketplace)
                      </span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#9A3412] shrink-0 mt-1" />
                      <span>
                        <strong>Registered Address:</strong> Tamluk, Purba Medinipur, West Bengal –
                        721636, India
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#9A3412] shrink-0" />
                      <span>
                        <strong>Support Email:</strong> support@kalaiva.com
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#9A3412] shrink-0" />
                      <span>
                        <strong>Hours:</strong> Mon–Sat, 10:00 AM – 6:30 PM IST
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-[#FFF7ED] p-6 rounded-2xl border border-[#FED7AA] space-y-3">
                  <h2 className="font-serif text-lg font-bold text-[#9A3412] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Designated Grievance Officer
                  </h2>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    In accordance with Rule 4(4) of the Consumer Protection (E-Commerce) Rules,
                    2020, any consumer or artist complaint is acknowledged within 48 hours and
                    resolved within 30 days.
                  </p>
                  <div className="text-sm text-[#1C1917] space-y-1 pt-1">
                    <p>
                      <strong>Name:</strong> Bitan Bera
                    </p>
                    <p>
                      <strong>Designation:</strong> Founder &amp; Grievance Officer
                    </p>
                    <p>
                      <strong>Email:</strong> grievance@kalaiva.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5E4]">
                <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-4">
                  Send a Message to Our Curatorial Team
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Thank you! Your inquiry has been logged with ticket #KLV-SUP-209.');
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Inquiry Category
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm bg-white">
                      <option>Collector Order / Shipping Support</option>
                      <option>Artist Onboarding &amp; Verification</option>
                      <option>Custom Commission Request</option>
                      <option>Compliance / Grievance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition"
                  >
                    Submit Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* TERMS & CONDITIONS */}
        {activePage === 'terms' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-[#44403C] leading-relaxed">
            <div className="border-b border-[#E7E5E4] pb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Legal Policy
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
                Terms &amp; Conditions (Marketplace &amp; Artist Agreement)
              </h1>
              <p className="text-xs text-[#78716C] mt-1">Last Updated: November 2026</p>
            </div>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              1. Marketplace Role &amp; Scope
            </h2>
            <p>
              Kalaiva (<strong>kalaiva.com</strong>) operates as an online E-Commerce Marketplace
              Operator facilitating direct transactions between verified independent artists
              (&quot;Sellers&quot;) and art buyers (&quot;Collectors&quot;) across India.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              2. Artist Intellectual Property &amp; Authenticity Warranty
            </h2>
            <p>
              By listing an artwork on Kalaiva, the Artist warrants that the work is an original
              creation, free of third-party copyright infringement, and will be accompanied by a
              physically signed Certificate of Authenticity upon dispatch. Copyright in the underlying
              artwork remains with the Artist unless explicitly transferred in writing.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              3. Pricing, GST &amp; Artist Payouts
            </h2>
            <p>
              All prices are listed in Indian Rupees (INR). Applicable Goods and Services Tax (GST)
              and Tax Collected at Source (TCS) under Section 52 of the CGST Act are computed
              transparently at checkout. Artists receive <strong>90%</strong> of the artwork listing
              price settled directly to their verified bank account within 5 business days of
              confirmed delivery.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Purba Medinipur / Kolkata, West Bengal.
            </p>
          </section>
        )}

        {/* PRIVACY POLICY */}
        {activePage === 'privacy' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-[#44403C] leading-relaxed">
            <div className="border-b border-[#E7E5E4] pb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Data Protection (DPDP Act 2023 Compliant)
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">Privacy Policy</h1>
              <p className="text-xs text-[#78716C] mt-1">Effective Date: November 2026</p>
            </div>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              1. Personal Data We Collect
            </h2>
            <p>
              Kalaiva collects only necessary personal data required to fulfill art orders and
              artist payouts, including your full name, email address, phone number, delivery
              address, optional GSTIN for tax invoicing, and artist KYC details.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              2. Payment Security
            </h2>
            <p>
              Online payments are processed securely through PCI-DSS compliant Indian payment
              gateways (such as Razorpay). Kalaiva does not store your raw credit/debit card numbers,
              CVV, or UPI PINs on its servers.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              3. Data Sharing &amp; Your Rights
            </h2>
            <p>
              We never sell personal data to third parties. Shipping details are shared strictly
              with our insured logistics partners and the fulfilling artist to deliver your artwork.
              Under India&apos;s Digital Personal Data Protection (DPDP) Act, you may request access,
              correction, or deletion of your data by emailing <strong>privacy@kalaiva.com</strong>.
            </p>
          </section>
        )}

        {/* REFUND, CANCELLATION & SHIPPING */}
        {activePage === 'refund' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-sm text-[#44403C] leading-relaxed">
            <div className="border-b border-[#E7E5E4] pb-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Collector Protection Policy
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
                Return, Refund, Cancellation &amp; Shipping Policy
              </h1>
            </div>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              1. Packaging &amp; Shipping Timelines
            </h2>
            <p>
              Artworks are dispatched within <strong>3 to 7 business days</strong> in reinforced,
              moisture-resistant packaging or custom wooden crates. Free insured shipping applies on
              all orders of ₹25,000 and above; a flat ₹850 insured handling fee applies to orders
              below ₹25,000.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              2. Order Cancellation
            </h2>
            <p>
              Collectors may cancel an order within <strong>24 hours</strong> of payment prior to
              artwork dispatch for a 100% full refund. Once crated and handed over to the courier,
              cancellations are not permitted.
            </p>
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">
              3. Transit Damage &amp; Returns
            </h2>
            <p>
              Because each artwork is a unique, one-of-a-kind original creation, returns are not
              accepted for subjective &quot;change of mind.&quot; However, if an artwork arrives
              damaged in transit, notify <strong>support@kalaiva.com</strong> within{' '}
              <strong>48 hours of delivery</strong> with unboxing photographs/video. Kalaiva will
              arrange insured reverse pickup and issue a 100% refund within 5–7 working days to your
              original payment method.
            </p>
          </section>
        )}
      </main>

      {/* ARTWORK DETAIL MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-4xl w-full border border-[#E7E5E4] shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E7E5E4]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                Artwork Specification • {selectedArtwork.id.toUpperCase()}
              </span>
              <button
                onClick={() => setSelectedArtwork(null)}
                className="p-1.5 rounded-lg hover:bg-[#F5F5F4] text-[#57534E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
              <div className="md:col-span-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F5F4] border border-[#E7E5E4]">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#E7E5E4] flex items-center gap-3 text-xs text-[#44403C]">
                  <ShieldCheck className="w-5 h-5 text-[#9A3412] shrink-0" />
                  <span>
                    Includes hand-signed <strong>Certificate of Authenticity</strong> &amp; 48-hour
                    transit damage protection.
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                    {selectedArtwork.title}
                  </h2>
                  <button
                    onClick={() => openArtistProfile(selectedArtwork.artistId)}
                    className="text-sm font-semibold text-[#9A3412] hover:underline mt-1 inline-block"
                  >
                    By {selectedArtwork.artistName} (View Artist Profile →)
                  </button>

                  <p className="text-sm text-[#44403C] mt-4 leading-relaxed">
                    {selectedArtwork.description}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 text-xs border-t border-b border-[#E7E5E4] py-4">
                    <div>
                      <dt className="text-[#78716C]">Medium</dt>
                      <dd className="font-semibold text-[#1C1917] mt-0.5">
                        {selectedArtwork.medium}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Dimensions</dt>
                      <dd className="font-semibold text-[#1C1917] mt-0.5">
                        {selectedArtwork.dimensions}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Framing</dt>
                      <dd className="font-semibold text-[#1C1917] mt-0.5">
                        {selectedArtwork.framed}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Estimated Dispatch</dt>
                      <dd className="font-semibold text-[#1C1917] mt-0.5">
                        {selectedArtwork.dispatchDays}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#78716C]">Artwork Price (+12% GST)</span>
                    <span className="text-2xl font-bold text-[#1C1917]">
                      {formatINR(selectedArtwork.price)}
                    </span>
                  </div>

                  {selectedArtwork.sold ? (
                    <div className="w-full py-3 rounded-lg bg-[#E7E5E4] text-[#57534E] text-center text-sm font-bold">
                      This Original Artwork Has Been Sold
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          addToCart(selectedArtwork);
                          setSelectedArtwork(null);
                        }}
                        className="py-3 rounded-lg border border-[#9A3412] text-[#9A3412] hover:bg-[#FFF7ED] font-semibold text-sm transition"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(selectedArtwork)}
                        className="py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition shadow-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART & CHECKOUT DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FAF8F5] w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-[#E7E5E4]">
            <div className="px-6 py-4 bg-white border-b border-[#E7E5E4] flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  {checkoutStep === 'cart' && `Your Art Crate (${cart.length})`}
                  {checkoutStep === 'address' && 'Collector Delivery Details'}
                  {checkoutStep === 'payment' && 'Razorpay Secure Checkout'}
                  {checkoutStep === 'confirmed' && 'Order Confirmed'}
                </h2>
                <p className="text-xs text-[#78716C]">
                  {checkoutStep === 'cart' && 'Insured Pan-India Fine Art Delivery'}
                  {checkoutStep === 'address' && 'Step 1 of 2 • Shipping & GST Invoice'}
                  {checkoutStep === 'payment' && 'Step 2 of 2 • UPI, Cards & Netbanking'}
                  {checkoutStep === 'confirmed' && 'Thank you for supporting Indian art'}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-[#F5F5F4] text-[#57534E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <ShoppingBag className="w-10 h-10 text-[#A8A29E] mx-auto" />
                      <p className="font-serif text-lg text-[#1C1917]">Your art crate is empty</p>
                      <p className="text-xs text-[#78716C]">
                        Explore original paintings and folk artworks from verified studios.
                      </p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          navigateTo('gallery');
                        }}
                        className="mt-2 px-5 py-2.5 rounded-lg bg-[#9A3412] text-white text-xs font-semibold"
                      >
                        Browse Gallery
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-3.5 rounded-xl border border-[#E7E5E4] flex gap-3.5"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif font-bold text-sm text-[#1C1917] truncate">
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#78716C]">By {item.artistName}</p>
                            <p className="text-xs text-[#78716C] mt-0.5">{item.dimensions}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-sm text-[#1C1917]">
                                {formatINR(item.price)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-red-700 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
                        <div className="flex justify-between text-[#57534E]">
                          <span>Artwork Subtotal</span>
                          <span>{formatINR(cartSubtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[#57534E]">
                          <span>GST (12% HSN 9701)</span>
                          <span>{formatINR(cartGst)}</span>
                        </div>
                        <div className="flex justify-between text-[#57534E]">
                          <span>Insured Art Crate Shipping</span>
                          <span>{cartShipping === 0 ? 'FREE' : formatINR(cartShipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm text-[#1C1917] pt-2 border-t border-[#E7E5E4]">
                          <span>Total Payable</span>
                          <span>{formatINR(cartTotal)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'address' && (
                <form id="shipping-form" onSubmit={handleAddressSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Full Name (Recipient) *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.fullName}
                      onChange={(e) =>
                        setShippingForm({ ...shippingForm, fullName: e.target.value })
                      }
                      placeholder="e.g., Priya Sharma"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Email (for Invoice) *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingForm.email}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, email: e.target.value })
                        }
                        placeholder="priya@example.com"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Street Address &amp; Landmark *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={shippingForm.address}
                      onChange={(e) =>
                        setShippingForm({ ...shippingForm, address: e.target.value })
                      }
                      placeholder="Flat / House No., Building, Street, Area"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, city: e.target.value })
                        }
                        placeholder="Kolkata"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        State *
                      </label>
                      <select
                        value={shippingForm.state}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, state: e.target.value })
                        }
                        className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                      >
                        <option>West Bengal</option>
                        <option>Maharashtra</option>
                        <option>Delhi NCR</option>
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                        <option>Gujarat</option>
                        <option>Rajasthan</option>
                        <option>Telangana</option>
                        <option>Kerala</option>
                        <option>Uttar Pradesh</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={shippingForm.pincode}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, pincode: e.target.value })
                        }
                        placeholder="700091"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Business GSTIN (Optional — for B2B Input Tax Credit)
                    </label>
                    <input
                      type="text"
                      value={shippingForm.gstin}
                      onChange={(e) =>
                        setShippingForm({ ...shippingForm, gstin: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g., 19AABCU9603R1ZM"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D6D3D1] text-sm"
                    />
                  </div>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <div className="bg-[#0F172A] text-white p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-sky-300 font-semibold">
                        Razorpay Trusted Business
                      </span>
                      <p className="font-bold text-base mt-0.5">Kalaiva</p>
                      <p className="text-xs text-slate-300">{shippingForm.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-300 block">Payable Amount</span>
                      <span className="text-xl font-bold text-white">{formatINR(cartTotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] block">
                      Select Payment Method
                    </span>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        paymentMethod === 'upi'
                          ? 'bg-white border-[#9A3412] ring-1 ring-[#9A3412]'
                          : 'bg-white border-[#E7E5E4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-[#9A3412]" />
                        <div>
                          <p className="text-sm font-semibold text-[#1C1917]">
                            UPI (GPay, PhonePe, Paytm, BHIM)
                          </p>
                          <p className="text-xs text-[#78716C]">Instant zero-fee UPI payment</p>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-[#9A3412] flex items-center justify-center">
                        {paymentMethod === 'upi' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#9A3412]" />
                        )}
                      </span>
                    </button>

                    {paymentMethod === 'upi' && (
                      <div className="px-3.5 py-2.5 bg-white rounded-xl border border-[#E7E5E4]">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter UPI ID (e.g., name@okicici)"
                          className="w-full text-sm px-3 py-2 rounded-lg border border-[#D6D3D1]"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        paymentMethod === 'card'
                          ? 'bg-white border-[#9A3412] ring-1 ring-[#9A3412]'
                          : 'bg-white border-[#E7E5E4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#9A3412]" />
                        <div>
                          <p className="text-sm font-semibold text-[#1C1917]">
                            Credit / Debit Card
                          </p>
                          <p className="text-xs text-[#78716C]">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-[#9A3412] flex items-center justify-center">
                        {paymentMethod === 'card' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#9A3412]" />
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        paymentMethod === 'netbanking'
                          ? 'bg-white border-[#9A3412] ring-1 ring-[#9A3412]'
                          : 'bg-white border-[#E7E5E4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-[#9A3412]" />
                        <div>
                          <p className="text-sm font-semibold text-[#1C1917]">Netbanking</p>
                          <p className="text-xs text-[#78716C]">
                            SBI, HDFC, ICICI, Axis &amp; 50+ Indian Banks
                          </p>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-[#9A3412] flex items-center justify-center">
                        {paymentMethod === 'netbanking' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#9A3412]" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'confirmed' && latestOrder && (
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-5">
                  <div className="text-center space-y-2 pb-4 border-b border-[#E7E5E4]">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                      Acquisition Confirmed!
                    </h3>
                    <p className="text-xs text-[#57534E]">
                      Order ID: <strong>{latestOrder.orderId}</strong> • Paid via{' '}
                      {latestOrder.method}
                    </p>
                  </div>

                  <div className="text-xs space-y-2 text-[#44403C]">
                    <p>
                      <strong>Collector:</strong> {latestOrder.customer.fullName} (
                      {latestOrder.customer.phone})
                    </p>
                    <p>
                      <strong>Delivery Address:</strong> {latestOrder.customer.address},{' '}
                      {latestOrder.customer.city}, {latestOrder.customer.state} –{' '}
                      {latestOrder.customer.pincode}
                    </p>
                    <p>
                      <strong>Tracking Status:</strong>{' '}
                      <span className="text-emerald-800 font-semibold">
                        Artist Notified — Custom Art Crating Scheduled
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-b border-[#E7E5E4] py-3 space-y-2 text-xs">
                    {latestOrder.items.map((item: Artwork) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.title} (By {item.artistName})
                        </span>
                        <span className="font-semibold">{formatINR(item.price)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[#78716C]">
                      <span>GST (12%) + Insured Crate</span>
                      <span>{formatINR(latestOrder.gst + latestOrder.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#1C1917] pt-1">
                      <span>Total Paid</span>
                      <span>{formatINR(latestOrder.total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutStep('cart');
                    }}
                    className="w-full py-3 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                  >
                    Continue Exploring Kalaiva
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStep !== 'confirmed' && (
              <div className="p-5 bg-white border-t border-[#E7E5E4]">
                {checkoutStep === 'cart' && (
                  <button
                    onClick={() => setCheckoutStep('address')}
                    className="w-full py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    Proceed to Delivery Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {checkoutStep === 'address' && (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="px-4 py-3 rounded-lg border border-[#D6D3D1] text-sm font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="shipping-form"
                      className="flex-1 py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition"
                    >
                      Continue to Payment ({formatINR(cartTotal)})
                    </button>
                  </div>
                )}
                {checkoutStep === 'payment' && (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('address')}
                      className="px-4 py-3 rounded-lg border border-[#D6D3D1] text-sm font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={processingPayment}
                      onClick={handleRazorpayConfirm}
                      className="flex-1 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition disabled:opacity-60"
                    >
                      {processingPayment
                        ? 'Verifying with Razorpay...'
                        : `Pay ${formatINR(cartTotal)} Securely`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ROLE-BASED LOGIN / SIGNUP MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#E7E5E4] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1C1917]">
                  {authTab === 'login' ? 'Sign In to Kalaiva' : 'Create Kalaiva Account'}
                </h2>
                <p className="text-xs text-[#78716C]">
                  Switch between Collector and Artist Studio accounts
                </p>
              </div>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F5F5F4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
                Instant Demo Profile Switch
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser({
                      role: 'artist',
                      name: 'Rohan Chatterjee',
                      email: 'rohan.art@kalaiva.com',
                      artistId: 'art-3'
                    });
                    setAuthModalOpen(false);
                    showToast('Switched to Verified Artist: Rohan Chatterjee');
                  }}
                  className="py-2 px-3 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] text-xs font-semibold text-left"
                >
                  Artist Account
                  <span className="block text-[10px] font-normal text-[#78716C]">
                    Rohan Chatterjee
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser({
                      role: 'customer',
                      name: 'Priya Sharma',
                      email: 'priya@collector.in'
                    });
                    setAuthModalOpen(false);
                    showToast('Switched to Art Collector: Priya Sharma');
                  }}
                  className="py-2 px-3 rounded-lg bg-white border border-[#D6D3D1] text-[#1C1917] text-xs font-semibold text-left"
                >
                  Customer Account
                  <span className="block text-[10px] font-normal text-[#78716C]">
                    Priya Sharma
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F5F4] rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthRole('customer')}
                  className={`py-2 rounded-md transition ${
                    authRole === 'customer' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  I am a Collector
                </button>
                <button
                  type="button"
                  onClick={() => setAuthRole('artist')}
                  className={`py-2 rounded-md transition ${
                    authRole === 'artist' ? 'bg-white text-[#9A3412] shadow-xs' : 'text-[#78716C]'
                  }`}
                >
                  I am an Artist
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Full Name / Studio Name
                </label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder={authRole === 'artist' ? 'e.g., Meera Devi Jha' : 'e.g., Rohan Verma'}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#D6D3D1] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#D6D3D1] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm transition"
              >
                {authTab === 'login' ? 'Continue' : 'Register Account'}
              </button>
            </form>

            <div className="text-center text-xs text-[#78716C]">
              {authTab === 'login' ? (
                <button
                  type="button"
                  onClick={() => setAuthTab('signup')}
                  className="underline hover:text-[#1C1917]"
                >
                  New to Kalaiva? Create an account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className="underline hover:text-[#1C1917]"
                >
                  Already have an account? Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STATUTORY E-COMMERCE COMPLIANCE FOOTER */}
      <footer className="bg-[#1C1917] text-[#D6D3D1] border-t border-[#292524] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#9A3412] text-white flex items-center justify-center font-serif font-bold">
                K
              </div>
              <span className="font-serif text-xl font-bold text-white">Kalaiva</span>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              India&apos;s curated digital marketplace connecting verified visual artists and
              traditional artisans directly with collectors nationwide.
            </p>
            <p className="text-[11px] text-[#78716C]">
              Registered Office: Tamluk, Purba Medinipur, West Bengal – 721636, India
            </p>
          </div>

          <div className="md:col-span-2 space-y-2.5 text-xs">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Marketplace
            </h3>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-white">
                  Art Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('artists')} className="hover:text-white">
                  Verified Artists
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sell')} className="hover:text-white">
                  Sell Your Artwork
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white">
                  About Kalaiva
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Legal &amp; Compliance Policies
            </h3>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white">
                  Privacy Policy (DPDP Act)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund')} className="hover:text-white">
                  Return, Refund &amp; Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white">
                  Contact &amp; Grievance Officer
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Grievance &amp; Support
            </h3>
            <p className="text-[#A8A29E]">
              <strong>Support:</strong> support@kalaiva.com
            </p>
            <p className="text-[#A8A29E]">
              <strong>Grievance Officer:</strong> Bitan Bera (grievance@kalaiva.com)
            </p>
            <p className="text-[#A8A29E]">
              <strong>Payments:</strong> UPI, Cards &amp; Netbanking via Razorpay
            </p>
          </div>
        </div>

        <div className="border-t border-[#292524] py-4 px-4 text-center text-xs text-[#78716C]">
          © 2026 Kalaiva (kalaiva.com). All rights reserved. • Compliant with Consumer Protection
          (E-Commerce) Rules, 2020.
        </div>
      </footer>
    </div>
  );
}
