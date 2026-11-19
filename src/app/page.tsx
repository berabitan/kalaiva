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
  Menu,
  Lock,
  UserCheck,
  UserX,
  Clock,
  Ban,
  LogOut,
  KeyRound
} from 'lucide-react';

// --- ADMIN CREDENTIALS (Change anytime in code or env) ---
const ADMIN_CONFIG = {
  email: 'admin@kalaiva.com',
  password: 'Kalaiva@2026',
  staticOtp: '482910',
  name: 'Bitan Bera (Super Admin)'
};

interface MarketplaceAccount {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  role: 'artist' | 'buyer';
  city: string;
  specialty?: string;
  portfolioNote?: string;
  status: 'pending' | 'approved' | 'rejected';
  joinedYear: number;
}

interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistMobile: string;
  medium: string;
  dimensions: string;
  framed: string;
  year: number;
  price: number;
  image: string;
  description: string;
  sold: boolean;
}

const INITIAL_ACCOUNTS: MarketplaceAccount[] = [
  {
    id: 'acc-art-1',
    fullName: 'Rohan Chatterjee',
    email: 'rohan@kalaiva.com',
    mobile: '9830011223',
    password: 'Artist@123',
    role: 'artist',
    city: 'Kolkata, West Bengal',
    specialty: 'Watercolor & Urban Heritage',
    portfolioNote: 'Santiniketan fine arts graduate specializing in Bengal heritage watercolors.',
    status: 'approved',
    joinedYear: 2026
  },
  {
    id: 'acc-art-2',
    fullName: 'Meera Devi Jha',
    email: 'meera@kalaiva.com',
    mobile: '9431022334',
    password: 'Artist@123',
    role: 'artist',
    city: 'Madhubani, Bihar',
    specialty: 'Traditional Mithila & Folk Art',
    portfolioNote: 'Third-generation Mithila folk artist using natural mineral pigments.',
    status: 'approved',
    joinedYear: 2025
  },
  {
    id: 'acc-art-pending',
    fullName: 'Subhajit Mondal',
    email: 'subhajit.art@gmail.com',
    mobile: '9732099887',
    password: 'Artist@123',
    role: 'artist',
    city: 'Tamluk, West Bengal',
    specialty: 'Oil Pastel & Rural Landscape',
    portfolioNote: 'Local landscape painter from Purba Medinipur seeking studio verification.',
    status: 'pending',
    joinedYear: 2026
  },
  {
    id: 'acc-buy-1',
    fullName: 'Priya Sharma',
    email: 'priya@collector.in',
    mobile: '9820055443',
    password: 'Buyer@123',
    role: 'buyer',
    city: 'Kolkata, West Bengal',
    status: 'approved',
    joinedYear: 2026
  }
];

const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'kw-101',
    title: 'Morning Mist at Prinsep Ghat',
    artistId: 'acc-art-1',
    artistName: 'Rohan Chatterjee',
    artistMobile: '9830011223',
    medium: 'Watercolor',
    dimensions: '18 × 24 in (46 × 61 cm)',
    framed: 'Matte Black Archival Frame',
    year: 2026,
    price: 14500,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
    description: 'Wet-on-wet watercolor study on 300 GSM cold-pressed cotton rag paper, evoking quiet dawn reflections along the Hooghly.',
    sold: false
  },
  {
    id: 'kw-102',
    title: 'Sacred Banyan & Kohbar Motif',
    artistId: 'acc-art-2',
    artistName: 'Meera Devi Jha',
    artistMobile: '9431022334',
    medium: 'Traditional/Folk',
    dimensions: '22 × 30 in (56 × 76 cm)',
    framed: 'Teakwood Frame with UV Acrylic',
    year: 2026,
    price: 18500,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
    description: 'Hand-painted using bamboo nibs and mineral pigments on archival handmade paper, depicting abundance and interconnected life.',
    sold: false
  },
  {
    id: 'kw-103',
    title: 'Banaras Dawn Boatmen',
    artistId: 'acc-art-1',
    artistName: 'Rohan Chatterjee',
    artistMobile: '9830011223',
    medium: 'Acrylic',
    dimensions: '24 × 36 in (61 × 91 cm)',
    framed: 'Gallery Wrapped (Ready to Hang)',
    year: 2026,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=80',
    description: 'Warm ochre and vermilion acrylic brushwork capturing wooden boats docked along ancient stone steps at sunrise.',
    sold: false
  },
  {
    id: 'kw-104',
    title: 'Monsoon Dusk over Sahyadri',
    artistId: 'acc-art-2',
    artistName: 'Meera Devi Jha',
    artistMobile: '9431022334',
    medium: 'Oil',
    dimensions: '36 × 48 in (91 × 122 cm)',
    framed: 'Gallery Wrapped (Unframed)',
    year: 2026,
    price: 42000,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=80',
    description: 'Rich palette-knife oil strokes capturing the golden break in clouds after an evening monsoon downpour.',
    sold: false
  }
];

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

export default function KalaivaPlatform() {
  // Navigation & Modal State
  const [activePage, setActivePage] = useState<'gallery' | 'artists' | 'sell' | 'admin' | 'about' | 'contact' | 'terms' | 'privacy' | 'refund'>('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Marketplace Data
  const [accounts, setAccounts] = useState<MarketplaceAccount[]>(INITIAL_ACCOUNTS);
  const [blockedMobiles, setBlockedMobiles] = useState<string[]>(['9000011111']);
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [orders, setOrders] = useState<any[]>([
    {
      orderId: 'KLV-2026-8841',
      date: '14 Nov 2026',
      artworkTitle: 'Twilight Over Pichola',
      artistName: 'Rohan Chatterjee',
      customerName: 'Priya Sharma',
      city: 'Kolkata, West Bengal',
      subtotal: 25000,
      total: 28000,
      status: 'Delivered'
    }
  ]);

  // Logged-In Session (null = Guest browsing Gallery)
  const [session, setSession] = useState<{
    role: 'admin' | 'artist' | 'buyer';
    id: string;
    name: string;
    email: string;
    mobile?: string;
    status?: 'pending' | 'approved' | 'rejected';
  } | null>(null);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRoleTab, setAuthRoleTab] = useState<'buyer' | 'artist' | 'admin'>('buyer');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Admin Login + OTP State
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminOtpStep, setAdminOtpStep] = useState(false);
  const [adminOtpInput, setAdminOtpInput] = useState('');

  // Artist / Buyer Login & Register Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('Oil & Acrylic Painting');
  const [regPortfolio, setRegPortfolio] = useState('');

  // Gallery Filter State
  const [mediumFilter, setMediumFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Checkout State
  const [cart, setCart] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment' | 'confirmed'>('cart');
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
  const [processingPayment, setProcessingPayment] = useState(false);
  const [latestOrder, setLatestOrder] = useState<any>(null);

  // Artist Artwork Upload Form
  const [newArt, setNewArt] = useState({
    title: '',
    medium: 'Oil',
    dimensions: '24 × 36 in (61 × 91 cm)',
    framed: 'Gallery Wrapped (Ready to Hang)',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
  });

  // Toast Notification
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync with Supabase if configured
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    fetch(`${url}/rest/v1/blocked_mobiles?select=mobile`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    })
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          setBlockedMobiles((prev) => Array.from(new Set([...prev, ...rows.map((x: any) => x.mobile)])));
        }
      })
      .catch(() => {});

    fetch(`${url}/rest/v1/marketplace_users?select=*&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    })
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped: MarketplaceAccount[] = rows.map((u: any) => ({
            id: u.id,
            fullName: u.full_name,
            email: u.email,
            mobile: u.mobile,
            password: u.password_hash,
            role: u.role,
            city: u.city || 'India',
            specialty: u.specialty,
            portfolioNote: u.portfolio_note,
            status: u.status,
            joinedYear: 2026
          }));
          setAccounts((prev) => {
            const existingMobiles = new Set(mapped.map((m) => m.mobile));
            return [...mapped, ...prev.filter((p) => !existingMobiles.has(p.mobile))];
          });
        }
      })
      .catch(() => {});
  }, []);

  // Keep current logged-in user's verification status live if Admin approves/rejects them
  const liveSession = useMemo(() => {
    if (!session) return null;
    if (session.role === 'admin') return session;
    const fresh = accounts.find((a) => a.id === session.id);
    if (!fresh) return session;
    return { ...session, status: fresh.status };
  }, [session, accounts]);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((item) => {
      const matchesMedium = mediumFilter === 'All' || item.medium === mediumFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artistName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMedium && matchesSearch;
    });
  }, [artworks, mediumFilter, searchQuery]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartGst = Math.round(cartSubtotal * 0.12);
  const cartShipping = cartSubtotal > 0 ? (cartSubtotal >= 25000 ? 0 : 850) : 0;
  const cartTotal = cartSubtotal + cartGst + cartShipping;

  const openAuthFor = (role: 'buyer' | 'artist' | 'admin', mode: 'login' | 'register' = 'login') => {
    setAuthRoleTab(role);
    setAuthMode(mode);
    setAdminOtpStep(false);
    setAdminOtpInput('');
    setAuthModalOpen(true);
  };

  // --- ADMIN LOGIN WITH PASSWORD + OTP ---
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminOtpStep) {
      if (
        adminEmailInput.trim().toLowerCase() === ADMIN_CONFIG.email.toLowerCase() &&
        adminPassInput === ADMIN_CONFIG.password
      ) {
        setAdminOtpStep(true);
        showToast(`OTP sent to Admin registered mobile (Demo OTP: ${ADMIN_CONFIG.staticOtp})`);
      } else {
        showToast('Invalid Admin ID or Password.', 'err');
      }
      return;
    }

    if (adminOtpInput.trim() === ADMIN_CONFIG.staticOtp) {
      setSession({
        role: 'admin',
        id: 'super-admin',
        name: ADMIN_CONFIG.name,
        email: ADMIN_CONFIG.email,
        status: 'approved'
      });
      setAuthModalOpen(false);
      setAdminOtpStep(false);
      setAdminEmailInput('');
      setAdminPassInput('');
      setAdminOtpInput('');
      setActivePage('admin');
      showToast('Admin verified! Full marketplace control unlocked.');
    } else {
      showToast('Incorrect 6-digit Security OTP.', 'err');
    }
  };

  // --- ARTIST / BUYER REGISTRATION WITH BLOCKED MOBILE CHECK ---
  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = regMobile.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'err');
      return;
    }

    // PERMANENT BLOCK CHECK
    if (blockedMobiles.includes(cleanMobile)) {
      showToast(
        'ACCESS DENIED: This mobile number was permanently rejected & blocked by Kalaiva Admin.',
        'err'
      );
      return;
    }

    if (accounts.some((a) => a.mobile === cleanMobile)) {
      showToast('An account already exists with this mobile number. Please sign in.', 'err');
      return;
    }

    const newAcc: MarketplaceAccount = {
      id: `acc-${Date.now()}`,
      fullName: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      mobile: cleanMobile,
      password: regPassword,
      role: authRoleTab === 'artist' ? 'artist' : 'buyer',
      city: regCity.trim() || 'West Bengal, India',
      specialty: authRoleTab === 'artist' ? regSpecialty : undefined,
      portfolioNote: authRoleTab === 'artist' ? regPortfolio : undefined,
      status: 'pending',
      joinedYear: 2026
    };

    // Save to Supabase if connected
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      fetch(`${url}/rest/v1/marketplace_users`, {
        method: 'POST',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: newAcc.fullName,
          email: newAcc.email,
          mobile: newAcc.mobile,
          password_hash: newAcc.password,
          role: newAcc.role,
          city: newAcc.city,
          specialty: newAcc.specialty || null,
          portfolio_note: newAcc.portfolioNote || null,
          status: 'pending'
        })
      }).catch(() => {});
    }

    setAccounts([newAcc, ...accounts]);
    setSession({
      role: newAcc.role,
      id: newAcc.id,
      name: newAcc.fullName,
      email: newAcc.email,
      mobile: newAcc.mobile,
      status: 'pending'
    });
    setAuthModalOpen(false);
    setRegName('');
    setRegEmail('');
    setRegMobile('');
    setRegPassword('');
    showToast(
      `Profile created! Status: Pending Admin Verification before ${
        newAcc.role === 'artist' ? 'listing artworks' : 'completing payment'
      }.`
    );
  };

  // --- ARTIST / BUYER LOGIN ---
  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const idClean = loginIdentifier.trim().toLowerCase();
    const mobileClean = loginIdentifier.replace(/\D/g, '').slice(-10);

    if (mobileClean && blockedMobiles.includes(mobileClean)) {
      showToast('This mobile number is permanently blocked by Kalaiva Admin.', 'err');
      return;
    }

    const found = accounts.find(
      (a) =>
        (a.email.toLowerCase() === idClean || a.mobile === mobileClean) &&
        a.password === loginPassword
    );

    if (!found) {
      showToast('Invalid Email/Mobile or Password.', 'err');
      return;
    }

    if (found.status === 'rejected' || blockedMobiles.includes(found.mobile)) {
      showToast('Your account was rejected and permanently blocked by Admin.', 'err');
      return;
    }

    setSession({
      role: found.role,
      id: found.id,
      name: found.fullName,
      email: found.email,
      mobile: found.mobile,
      status: found.status
    });
    setAuthModalOpen(false);
    setLoginIdentifier('');
    setLoginPassword('');
    showToast(`Signed in as ${found.fullName} (${found.role.toUpperCase()})`);
  };

  // --- ADMIN APPROVE OR REJECT & PERMANENTLY BLOCK ---
  const handleAdminDecision = async (account: MarketplaceAccount, decision: 'approved' | 'rejected') => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === account.id ? { ...a, status: decision } : a))
    );

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      fetch(`${url}/rest/v1/marketplace_users?mobile=eq.${account.mobile}`, {
        method: 'PATCH',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: decision })
      }).catch(() => {});
    }

    if (decision === 'rejected') {
      setBlockedMobiles((prev) => Array.from(new Set([...prev, account.mobile])));
      if (url && key) {
        fetch(`${url}/rest/v1/blocked_mobiles`, {
          method: 'POST',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mobile: account.mobile,
            reason: `Rejected ${account.role} application by Admin`
          })
        }).catch(() => {});
      }
      showToast(
        `${account.fullName} REJECTED & mobile ${account.mobile} permanently blacklisted.`,
        'err'
      );
    } else {
      showToast(`${account.fullName} (${account.role.toUpperCase()}) APPROVED!`);
    }
  };

  // --- ADD TO CART & BUY FLOW (OPEN GALLERY -> PROFILE GATE AT CHECKOUT) ---
  const addToCart = (artwork: Artwork) => {
    if (artwork.sold) {
      showToast('This original artwork has already been acquired.', 'err');
      return;
    }
    if (!cart.some((c) => c.id === artwork.id)) {
      setCart([...cart, artwork]);
    }
    setSelectedArtwork(null);
    setCheckoutStep('cart');
    setCartOpen(true);
  };

  const handleProceedToCheckout = () => {
    // 1. Must have a logged-in profile to buy
    if (!liveSession) {
      setCartOpen(false);
      showToast('Please create a Buyer profile (or sign in) to buy this artwork.', 'err');
      openAuthFor('buyer', 'register');
      return;
    }

    // 2. If Buyer role, Admin must have approved their profile before payment
    if (liveSession.role === 'buyer' && liveSession.status !== 'approved') {
      showToast(
        'Your Buyer profile is awaiting Admin verification. Payment unlocks once Admin approves your profile.',
        'err'
      );
      return;
    }

    // 3. Approved Artist or Admin can also purchase directly
    if (liveSession.role === 'artist' && liveSession.status !== 'approved') {
      showToast('Your account is pending Admin verification.', 'err');
      return;
    }

    setShippingForm((prev) => ({
      ...prev,
      fullName: prev.fullName || liveSession.name,
      email: prev.email || liveSession.email,
      phone: prev.phone || liveSession.mobile || ''
    }));
    setCheckoutStep('address');
  };

  // --- PUBLISH ARTWORK (ONLY APPROVED ARTISTS) ---
  const handlePublishArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveSession || liveSession.role !== 'artist' || liveSession.status !== 'approved') {
      showToast('Only Admin-Approved Artists can list artworks.', 'err');
      return;
    }
    const numericPrice = parseInt(newArt.price, 10);
    if (!newArt.title.trim() || isNaN(numericPrice) || numericPrice < 500) {
      showToast('Enter a valid artwork title and price (min ₹500).', 'err');
      return;
    }

    const created: Artwork = {
      id: `kw-${Math.floor(100 + Math.random() * 900)}`,
      title: newArt.title.trim(),
      artistId: liveSession.id,
      artistName: liveSession.name,
      artistMobile: liveSession.mobile || '',
      medium: newArt.medium,
      dimensions: newArt.dimensions,
      framed: newArt.framed,
      year: 2026,
      price: numericPrice,
      image: newArt.image,
      description:
        newArt.description.trim() ||
        'Original signed artwork accompanied by a Kalaiva Certificate of Authenticity.',
      sold: false
    };

    setArtworks([created, ...artworks]);
    setNewArt({ ...newArt, title: '', price: '', description: '' });
    setActivePage('gallery');
    showToast(`"${created.title}" published live to the Kalaiva Gallery!`);
  };

  const handleRazorpayConfirm = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      const orderNum = `KLV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const purchasedIds = cart.map((c) => c.id);
      setArtworks((prev) =>
        prev.map((art) => (purchasedIds.includes(art.id) ? { ...art, sold: true } : art))
      );

      const newRecords = cart.map((item) => ({
        orderId: orderNum,
        date: '19 Nov 2026',
        artworkTitle: item.title,
        artistName: item.artistName,
        customerName: shippingForm.fullName,
        city: `${shippingForm.city}, ${shippingForm.state}`,
        subtotal: item.price,
        total: cartTotal,
        status: 'Paid — Crating Scheduled'
      }));

      setOrders([...newRecords, ...orders]);
      setLatestOrder({
        orderId: orderNum,
        items: [...cart],
        total: cartTotal,
        customer: { ...shippingForm }
      });
      setCart([]);
      setProcessingPayment(false);
      setCheckoutStep('confirmed');
    }, 900);
  };

  const pendingCount = accounts.filter((a) => a.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-2.5 text-sm max-w-md ${
            toast.type === 'err'
              ? 'bg-red-950 text-white border-red-700'
              : 'bg-[#1C1917] text-[#FAF8F5] border-[#44403C]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Trust & Role Strip */}
      <div className="bg-[#1C1917] text-[#E7E5E4] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
            100% Admin-Verified Artists &amp; Authentic Indian Artworks
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuthFor('admin', 'login')}
              className="text-[#FBBF24] hover:underline font-medium inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              Admin Control Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => setActivePage('gallery')}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#9A3412] text-white flex items-center justify-center font-serif text-xl font-bold">
              K
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#1C1917] block leading-none">
                Kalaiva
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#78716C] block mt-0.5">
                Verified Art Marketplace
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#44403C]">
            <button
              onClick={() => setActivePage('gallery')}
              className={activePage === 'gallery' ? 'text-[#9A3412] font-semibold' : 'hover:text-[#9A3412]'}
            >
              Gallery
            </button>
            <button
              onClick={() => setActivePage('artists')}
              className={activePage === 'artists' ? 'text-[#9A3412] font-semibold' : 'hover:text-[#9A3412]'}
            >
              Verified Artists
            </button>
            <button
              onClick={() => setActivePage('sell')}
              className={`inline-flex items-center gap-1.5 ${
                activePage === 'sell' ? 'text-[#9A3412] font-semibold' : 'hover:text-[#9A3412]'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#9A3412]" />
              Artist Studio
            </button>
            {liveSession?.role === 'admin' && (
              <button
                onClick={() => setActivePage('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#9A3412]" />
                Admin Panel ({pendingCount} Pending)
              </button>
            )}
          </nav>

          {/* Right Auth & Cart Buttons */}
          <div className="flex items-center gap-2.5">
            {liveSession ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white border border-[#D6D3D1] text-xs">
                  <span className="font-bold text-[#1C1917]">{liveSession.name}</span>
                  <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#9A3412] uppercase text-[10px] font-bold">
                    {liveSession.role}
                  </span>
                  {liveSession.role !== 'admin' && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        liveSession.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {liveSession.status}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSession(null);
                    setActivePage('gallery');
                    showToast('Logged out successfully.');
                  }}
                  title="Logout"
                  className="p-2 rounded-lg border border-[#D6D3D1] bg-white hover:bg-red-50 text-[#57534E] hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthFor('buyer', 'login')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D6D3D1] bg-white hover:bg-[#F5F5F4] text-xs sm:text-sm font-semibold text-[#1C1917]"
              >
                <User className="w-4 h-4 text-[#9A3412]" />
                Login / Register
              </button>
            )}

            <button
              onClick={() => {
                setCheckoutStep('cart');
                setCartOpen(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold">{cart.length}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#D6D3D1]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E5E4] bg-[#FAF8F5] px-4 py-3 flex flex-col gap-2 text-sm">
            <button onClick={() => { setActivePage('gallery'); setMobileMenuOpen(false); }} className="text-left py-1">Gallery</button>
            <button onClick={() => { setActivePage('artists'); setMobileMenuOpen(false); }} className="text-left py-1">Verified Artists</button>
            <button onClick={() => { setActivePage('sell'); setMobileMenuOpen(false); }} className="text-left py-1 text-[#9A3412] font-semibold">Artist Studio</button>
            {liveSession?.role === 'admin' && (
              <button onClick={() => { setActivePage('admin'); setMobileMenuOpen(false); }} className="text-left py-1 font-bold text-amber-900">
                Admin Control Panel ({pendingCount} Pending)
              </button>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ================= 1. PUBLIC LANDING GALLERY (NO LOGIN REQUIRED TO BROWSE) ================= */}
        {activePage === 'gallery' && (
          <div>
            <section className="border-b border-[#E7E5E4] bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Curated &amp; Admin-Verified Original Indian Artworks
                  </div>
                  <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] leading-tight">
                    Collect Original Indian Art, Verified at Every Step.
                  </h1>
                  <p className="text-base text-[#57534E] max-w-2xl leading-relaxed">
                    Browse paintings and folk artworks freely. Every artist is manually verified by
                    Kalaiva Admin before listing, and every collector acquisition is protected with
                    insured pan-India delivery.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#catalog"
                      className="px-6 py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm inline-flex items-center gap-2"
                    >
                      Explore Artworks <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => openAuthFor('artist', 'register')}
                      className="px-6 py-3 rounded-lg bg-white hover:bg-[#F5F5F4] text-[#1C1917] border border-[#D6D3D1] font-semibold text-sm inline-flex items-center gap-2"
                    >
                      <Palette className="w-4 h-4 text-[#9A3412]" />
                      Apply as Artist / Seller
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4] shadow-md">
                    <img
                      src={artworks[0].image}
                      alt={artworks[0].title}
                      className="w-full aspect-[4/3] object-cover rounded-xl"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <h2 className="font-serif font-bold text-lg">{artworks[0].title}</h2>
                        <p className="text-xs text-[#78716C]">By {artworks[0].artistName}</p>
                      </div>
                      <button
                        onClick={() => setSelectedArtwork(artworks[0])}
                        className="px-3.5 py-2 rounded-lg bg-[#9A3412] text-white text-xs font-semibold"
                      >
                        {formatINR(artworks[0].price)} • View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Grid */}
            <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">Original Art Catalog</h2>
                  <p className="text-xs text-[#78716C] mt-1">
                    Showing {filteredArtworks.length} verified artworks
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Oil', 'Acrylic', 'Watercolor', 'Traditional/Folk'].map((med) => (
                    <button
                      key={med}
                      onClick={() => setMediumFilter(med)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        mediumFilter === med
                          ? 'bg-[#9A3412] text-white'
                          : 'bg-white border border-[#E7E5E4]'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="pl-8 pr-3 py-1.5 bg-white border border-[#D6D3D1] rounded-full text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
                {filteredArtworks.map((art) => (
                  <article
                    key={art.id}
                    className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden shadow-xs flex flex-col"
                  >
                    <div
                      onClick={() => setSelectedArtwork(art)}
                      className="aspect-[4/3] bg-[#F5F5F4] relative cursor-pointer overflow-hidden"
                    >
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-xs font-semibold">
                        {art.medium}
                      </span>
                      {art.sold && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="px-4 py-1.5 rounded-full bg-[#9A3412] text-white text-xs font-bold uppercase">
                            Sold
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold">{art.title}</h3>
                        <p className="text-xs text-[#57534E] mt-0.5 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          By {art.artistName}
                        </p>
                        <p className="text-xs text-[#78716C] mt-1">{art.dimensions}</p>
                      </div>

                      <div className="pt-3 border-t border-[#F5F5F4] flex items-center justify-between">
                        <span className="text-lg font-bold">{formatINR(art.price)}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedArtwork(art)}
                            className="px-3 py-2 rounded-lg border border-[#D6D3D1] text-xs font-semibold"
                          >
                            Details
                          </button>
                          <button
                            disabled={art.sold}
                            onClick={() => addToCart(art)}
                            className="px-3.5 py-2 rounded-lg bg-[#9A3412] text-white text-xs font-semibold disabled:bg-[#E7E5E4] disabled:text-[#78716C]"
                          >
                            {art.sold ? 'Sold' : 'Buy Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ================= 2. ADMIN CONTROL PANEL (ONLY SUPER ADMIN) ================= */}
        {activePage === 'admin' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {liveSession?.role !== 'admin' ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E7E5E4] text-center space-y-4">
                <Lock className="w-10 h-10 text-[#9A3412] mx-auto" />
                <h2 className="font-serif text-2xl font-bold">Restricted Admin Area</h2>
                <p className="text-sm text-[#57534E]">
                  Only the Kalaiva Super Admin can verify artists, approve buyers, and manage
                  blocked mobile numbers.
                </p>
                <button
                  onClick={() => openAuthFor('admin', 'login')}
                  className="px-6 py-2.5 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                >
                  Login with Admin ID &amp; OTP
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9A3412]">
                      Super Admin Command Center
                    </span>
                    <h1 className="font-serif text-3xl font-bold mt-1">
                      Artist &amp; Buyer Verification Control
                    </h1>
                    <p className="text-sm text-[#57534E]">
                      Approve genuine profiles or Reject &amp; Permanently Blacklist their mobile
                      number.
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">
                      <span className="font-bold text-lg text-amber-900 block">{pendingCount}</span>
                      Pending Approvals
                    </div>
                    <div className="bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
                      <span className="font-bold text-lg text-red-900 block">
                        {blockedMobiles.length}
                      </span>
                      Blocked Mobiles
                    </div>
                  </div>
                </div>

                {/* Artist Verification Queue */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4">
                  <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#9A3412]" />
                    Artist / Seller Applications ({accounts.filter((a) => a.role === 'artist').length})
                  </h2>
                  <div className="divide-y divide-[#F5F5F4]">
                    {accounts
                      .filter((a) => a.role === 'artist')
                      .map((artist) => (
                        <div
                          key={artist.id}
                          className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-base">{artist.fullName}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                                  artist.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : artist.status === 'rejected'
                                    ? 'bg-red-50 text-red-800 border border-red-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {artist.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#57534E]">
                              Mobile: <strong>+91 {artist.mobile}</strong> • Email: {artist.email} •{' '}
                              {artist.city}
                            </p>
                            <p className="text-xs text-[#78716C]">
                              Specialty: <strong>{artist.specialty}</strong> — {artist.portfolioNote}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {artist.status !== 'approved' && artist.status !== 'rejected' && (
                              <button
                                onClick={() => handleAdminDecision(artist, 'approved')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                              >
                                <UserCheck className="w-4 h-4" />
                                Approve Artist
                              </button>
                            )}
                            {artist.status !== 'rejected' && (
                              <button
                                onClick={() => handleAdminDecision(artist, 'rejected')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold"
                              >
                                <UserX className="w-4 h-4" />
                                Reject &amp; Block Mobile
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Buyer Verification Queue */}
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4">
                  <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                    <User className="w-5 h-5 text-[#9A3412]" />
                    Buyer / Collector Verification ({accounts.filter((a) => a.role === 'buyer').length})
                  </h2>
                  <div className="divide-y divide-[#F5F5F4]">
                    {accounts
                      .filter((a) => a.role === 'buyer')
                      .map((buyer) => (
                        <div
                          key={buyer.id}
                          className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base">{buyer.fullName}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                                  buyer.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : buyer.status === 'rejected'
                                    ? 'bg-red-50 text-red-800 border border-red-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {buyer.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#57534E]">
                              Mobile: <strong>+91 {buyer.mobile}</strong> • Email: {buyer.email} •{' '}
                              {buyer.city}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {buyer.status === 'pending' && (
                              <button
                                onClick={() => handleAdminDecision(buyer, 'approved')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                              >
                                <UserCheck className="w-4 h-4" />
                                Approve Buyer for Payment
                              </button>
                            )}
                            {buyer.status !== 'rejected' && (
                              <button
                                onClick={() => handleAdminDecision(buyer, 'rejected')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold"
                              >
                                <UserX className="w-4 h-4" />
                                Reject &amp; Block Mobile
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Permanently Blacklisted Mobile Numbers */}
                <div className="bg-red-50/70 rounded-2xl border border-red-200 p-6 space-y-3">
                  <h2 className="font-serif text-lg font-bold text-red-950 flex items-center gap-2">
                    <Ban className="w-5 h-5 text-red-700" />
                    Permanently Blocked Mobile Numbers ({blockedMobiles.length})
                  </h2>
                  <p className="text-xs text-red-900">
                    Anyone attempting to register or list artworks with these numbers is
                    automatically blocked by the system:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {blockedMobiles.map((num) => (
                      <span
                        key={num}
                        className="px-3 py-1 rounded-full bg-white border border-red-300 text-xs font-mono font-bold text-red-800"
                      >
                        +91 {num}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* ================= 3. ARTIST STUDIO (GATED BY ADMIN APPROVAL) ================= */}
        {activePage === 'sell' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!liveSession || liveSession.role !== 'artist' ? (
              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-10 text-center space-y-4">
                <Palette className="w-11 h-11 text-[#9A3412] mx-auto" />
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                  Artist / Seller Verification Portal
                </h1>
                <p className="text-sm text-[#57534E] max-w-lg mx-auto leading-relaxed">
                  To protect collectors and maintain gallery authenticity, artists must first create
                  a studio profile and receive <strong>Admin Verification</strong> before listing
                  artworks for sale.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => openAuthFor('artist', 'register')}
                    className="px-6 py-3 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                  >
                    Create Artist Profile
                  </button>
                  <button
                    onClick={() => openAuthFor('artist', 'login')}
                    className="px-6 py-3 rounded-lg border border-[#D6D3D1] bg-white text-sm font-semibold"
                  >
                    Artist Sign In
                  </button>
                </div>
              </div>
            ) : liveSession.status !== 'approved' ? (
              <div className="bg-amber-50 rounded-2xl border border-amber-300 p-8 text-center space-y-3">
                <Clock className="w-11 h-11 text-amber-700 mx-auto" />
                <h2 className="font-serif text-2xl font-bold text-amber-950">
                  Artist Profile Under Admin Review
                </h2>
                <p className="text-sm text-amber-900 max-w-lg mx-auto">
                  Hello <strong>{liveSession.name}</strong> (+91 {liveSession.mobile}), your artist
                  application is currently <strong>PENDING</strong> verification by Kalaiva Admin.
                  Once approved, your artwork upload studio will unlock automatically here.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7E5E4] pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Admin-Verified Artist
                    </span>
                    <h1 className="font-serif text-2xl font-bold mt-1">
                      List New Artwork — {liveSession.name}
                    </h1>
                  </div>
                </div>

                <form onSubmit={handlePublishArtwork} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Artwork Title *</label>
                    <input
                      type="text"
                      required
                      value={newArt.title}
                      onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                      placeholder="e.g., Autumn Over Rupnarayan River"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Medium *</label>
                      <select
                        value={newArt.medium}
                        onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm bg-white"
                      >
                        <option value="Oil">Oil</option>
                        <option value="Acrylic">Acrylic</option>
                        <option value="Watercolor">Watercolor</option>
                        <option value="Traditional/Folk">Traditional/Folk</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Price (INR ₹) *</label>
                      <input
                        type="number"
                        required
                        min="500"
                        value={newArt.price}
                        onChange={(e) => setNewArt({ ...newArt, price: e.target.value })}
                        placeholder="e.g., 18000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Dimensions *</label>
                    <input
                      type="text"
                      required
                      value={newArt.dimensions}
                      onChange={(e) => setNewArt({ ...newArt, dimensions: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newArt.description}
                      onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D3D1] text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#9A3412] hover:bg-[#7C2D12] text-white font-semibold text-sm"
                  >
                    Publish Artwork to Live Gallery
                  </button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* ================= VERIFIED ARTISTS DIRECTORY ================= */}
        {activePage === 'artists' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-serif text-3xl font-bold mb-2">Admin-Verified Artists</h1>
            <p className="text-sm text-[#57534E] mb-8">
              Only artists verified by Kalaiva Admin appear in this public directory.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accounts
                .filter((a) => a.role === 'artist' && a.status === 'approved')
                .map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-xl font-bold">{artist.fullName}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                        Verified Studio
                      </span>
                    </div>
                    <p className="text-xs text-[#78716C]">
                      {artist.city} • {artist.specialty}
                    </p>
                    <p className="text-sm text-[#44403C] pt-1">{artist.portfolioNote}</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ================= LEGAL & POLICY PAGES ================= */}
        {(activePage === 'about' ||
          activePage === 'contact' ||
          activePage === 'terms' ||
          activePage === 'privacy' ||
          activePage === 'refund') && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4 text-sm text-[#44403C] leading-relaxed">
            <h1 className="font-serif text-3xl font-bold text-[#1C1917] capitalize">
              {activePage === 'refund'
                ? 'Return, Refund, Cancellation & Shipping Policy'
                : activePage === 'contact'
                ? 'Contact & Grievance Officer Disclosure'
                : activePage === 'terms'
                ? 'Terms & Conditions'
                : activePage === 'privacy'
                ? 'Privacy Policy (DPDP Act Compliant)'
                : 'About Kalaiva'}
            </h1>
            <p>
              <strong>Kalaiva (kalaiva.com)</strong> is an Indian verified online art marketplace
              registered at Tamluk, Purba Medinipur, West Bengal – 721636, India.
            </p>
            <p>
              <strong>Grievance Officer:</strong> Bitan Bera • <strong>Email:</strong>{' '}
              grievance@kalaiva.com • <strong>Support:</strong> support@kalaiva.com
            </p>
            <p>
              All artworks are verified for originality prior to listing. Orders are dispatched in
              insured protective packaging within 3–7 business days. Transit damage reported within
              48 hours of delivery qualifies for a 100% refund within 5–7 working days.
            </p>
          </section>
        )}
      </main>

      {/* ================= ARTWORK DETAIL MODAL ================= */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl">
            <img
              src={selectedArtwork.image}
              alt={selectedArtwork.title}
              className="w-full h-72 md:h-full object-cover"
            />
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="font-serif text-2xl font-bold">{selectedArtwork.title}</h2>
                  <button onClick={() => setSelectedArtwork(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-[#9A3412] font-semibold mt-1">
                  Verified Artist: {selectedArtwork.artistName}
                </p>
                <p className="text-sm text-[#44403C] mt-3">{selectedArtwork.description}</p>
                <p className="text-xs text-[#78716C] mt-3">
                  {selectedArtwork.medium} • {selectedArtwork.dimensions}
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                <span className="text-2xl font-bold">{formatINR(selectedArtwork.price)}</span>
                <button
                  onClick={() => addToCart(selectedArtwork)}
                  className="px-5 py-2.5 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                >
                  Buy Artwork
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CART & BUYER VERIFICATION CHECKOUT DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 flex justify-end">
          <div className="bg-[#FAF8F5] w-full max-w-md h-full flex flex-col shadow-2xl">
            <div className="px-6 py-4 bg-white border-b border-[#E7E5E4] flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">Checkout ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <p className="text-center text-sm text-[#78716C] py-12">Your cart is empty.</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-3.5 rounded-xl border border-[#E7E5E4] flex justify-between items-center"
                        >
                          <div>
                            <p className="font-bold text-sm">{item.title}</p>
                            <p className="text-xs text-[#78716C]">By {item.artistName}</p>
                            <p className="text-sm font-bold mt-1">{formatINR(item.price)}</p>
                          </div>
                          <button
                            onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                            className="text-xs text-red-700 underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{formatINR(cartSubtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (12%)</span>
                          <span>{formatINR(cartGst)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insured Shipping</span>
                          <span>{cartShipping === 0 ? 'FREE' : formatINR(cartShipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm pt-2 border-t">
                          <span>Total</span>
                          <span>{formatINR(cartTotal)}</span>
                        </div>
                      </div>

                      {/* Verification Status Banner Inside Checkout */}
                      {!liveSession ? (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                          <strong>Buyer Profile Required:</strong> Create a Buyer profile first so
                          Admin can verify your account before payment.
                        </div>
                      ) : liveSession.status !== 'approved' ? (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950">
                          <strong>Awaiting Admin Verification:</strong> Your Buyer profile (
                          {liveSession.name}) is currently <strong>PENDING</strong> Admin approval.
                          Payment will unlock immediately once Admin approves your profile.
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                          Verified Account: <strong>{liveSession.name}</strong> (Eligible to
                          complete payment)
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {checkoutStep === 'address' && (
                <form
                  id="addr-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutStep('payment');
                  }}
                  className="space-y-3"
                >
                  <input
                    required
                    placeholder="Full Name *"
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border text-sm"
                  />
                  <input
                    required
                    placeholder="Mobile Number *"
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border text-sm"
                  />
                  <input
                    required
                    placeholder="Complete Delivery Address *"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      required
                      placeholder="City *"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border text-sm"
                    />
                    <input
                      required
                      placeholder="PIN Code *"
                      value={shippingForm.pincode}
                      onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border text-sm"
                    />
                  </div>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-3">
                  <div className="bg-[#0F172A] text-white p-4 rounded-xl">
                    <p className="text-xs text-sky-300">Razorpay Secure Checkout</p>
                    <p className="text-xl font-bold mt-1">{formatINR(cartTotal)}</p>
                  </div>
                  {['upi', 'card', 'netbanking'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`w-full p-3 rounded-xl border text-left text-sm font-semibold uppercase ${
                        paymentMethod === m ? 'border-[#9A3412] bg-white' : 'bg-white border-[#E7E5E4]'
                      }`}
                    >
                      Pay via {m}
                    </button>
                  ))}
                </div>
              )}

              {checkoutStep === 'confirmed' && latestOrder && (
                <div className="bg-white p-6 rounded-2xl border text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold">Order Confirmed!</h3>
                  <p className="text-xs">Order ID: {latestOrder.orderId}</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutStep('cart');
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStep !== 'confirmed' && (
              <div className="p-5 bg-white border-t">
                {checkoutStep === 'cart' && (
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                  >
                    {!liveSession
                      ? 'Create Buyer Profile to Buy'
                      : liveSession.status !== 'approved'
                      ? 'Pending Admin Verification'
                      : 'Proceed to Delivery & Payment'}
                  </button>
                )}
                {checkoutStep === 'address' && (
                  <button
                    type="submit"
                    form="addr-form"
                    className="w-full py-3 rounded-lg bg-[#9A3412] text-white text-sm font-semibold"
                  >
                    Continue to Payment ({formatINR(cartTotal)})
                  </button>
                )}
                {checkoutStep === 'payment' && (
                  <button
                    disabled={processingPayment}
                    onClick={handleRazorpayConfirm}
                    className="w-full py-3 rounded-lg bg-emerald-700 text-white text-sm font-semibold"
                  >
                    {processingPayment ? 'Processing...' : `Pay ${formatINR(cartTotal)}`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 3-ROLE AUTHENTICATION MODAL (BUYER / ARTIST / ADMIN) ================= */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#E7E5E4] p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">Kalaiva Account Portal</h2>
              <button onClick={() => setAuthModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F5F5F4] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthRoleTab('buyer'); setAdminOtpStep(false); }}
                className={`py-2 rounded-lg transition ${
                  authRoleTab === 'buyer' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => { setAuthRoleTab('artist'); setAdminOtpStep(false); }}
                className={`py-2 rounded-lg transition ${
                  authRoleTab === 'artist' ? 'bg-white text-[#9A3412] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                Artist / Seller
              </button>
              <button
                type="button"
                onClick={() => { setAuthRoleTab('admin'); setAdminOtpStep(false); }}
                className={`py-2 rounded-lg transition ${
                  authRoleTab === 'admin' ? 'bg-[#1C1917] text-[#FBBF24] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                Admin
              </button>
            </div>

            {/* TAB 1: ADMIN LOGIN + OTP */}
            {authRoleTab === 'admin' && (
              <form onSubmit={handleAdminAuth} className="space-y-3.5">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <strong>Super Admin Access:</strong> Requires fixed Admin ID, Password &amp;
                  Security OTP.
                </div>
                {!adminOtpStep ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Admin Login ID *</label>
                      <input
                        type="email"
                        required
                        value={adminEmailInput}
                        onChange={(e) => setAdminEmailInput(e.target.value)}
                        placeholder="admin@kalaiva.com"
                        className="w-full px-3.5 py-2 rounded-lg border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Admin Password *</label>
                      <input
                        type="password"
                        required
                        value={adminPassInput}
                        onChange={(e) => setAdminPassInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2 rounded-lg border text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold mb-1 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-[#9A3412]" />
                      Enter 6-Digit Security OTP *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={adminOtpInput}
                      onChange={(e) => setAdminOtpInput(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-3.5 py-2.5 rounded-lg border text-center font-mono text-lg tracking-widest"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1C1917] text-[#FBBF24] font-bold text-sm"
                >
                  {adminOtpStep ? 'Verify OTP & Enter Admin Panel' : 'Verify Password & Send OTP'}
                </button>
              </form>
            )}

            {/* TAB 2 & 3: BUYER OR ARTIST LOGIN / REGISTRATION */}
            {(authRoleTab === 'buyer' || authRoleTab === 'artist') && (
              <>
                <div className="flex border-b text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 pb-2 ${
                      authMode === 'login' ? 'border-b-2 border-[#9A3412] text-[#9A3412]' : 'text-[#78716C]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 pb-2 ${
                      authMode === 'register' ? 'border-b-2 border-[#9A3412] text-[#9A3412]' : 'text-[#78716C]'
                    }`}
                  >
                    Create {authRoleTab === 'artist' ? 'Artist' : 'Buyer'} Profile
                  </button>
                </div>

                {authMode === 'login' ? (
                  <form onSubmit={handleUserLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Registered Email or 10-Digit Mobile *
                      </label>
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g., rohan@kalaiva.com or 9830011223"
                        className="w-full px-3.5 py-2 rounded-lg border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Password *</label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-3.5 py-2 rounded-lg border text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#9A3412] text-white font-semibold text-sm"
                    >
                      Sign In
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleUserRegister} className="space-y-3">
                    <div className="p-2.5 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] text-[11px] text-[#9A3412]">
                      {authRoleTab === 'artist'
                        ? 'Your Artist profile & mobile number will be verified by Kalaiva Admin before you can list artworks.'
                        : 'Your Buyer profile will be verified by Kalaiva Admin before completing payment.'}
                    </div>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                    />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value)}
                      placeholder="10-Digit Mobile Number (Permanent ID) *"
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                    />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                    />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create Password *"
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                    />
                    <input
                      type="text"
                      required
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="City & State (e.g., Tamluk, West Bengal) *"
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                    />
                    {authRoleTab === 'artist' && (
                      <>
                        <input
                          type="text"
                          required
                          value={regSpecialty}
                          onChange={(e) => setRegSpecialty(e.target.value)}
                          placeholder="Art Medium / Specialty *"
                          className="w-full px-3 py-2 rounded-lg border text-sm"
                        />
                        <textarea
                          rows={2}
                          required
                          value={regPortfolio}
                          onChange={(e) => setRegPortfolio(e.target.value)}
                          placeholder="Describe your art background / portfolio link for Admin review *"
                          className="w-full px-3 py-2 rounded-lg border text-sm"
                        />
                      </>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-[#9A3412] text-white font-semibold text-sm"
                    >
                      Submit Profile for Admin Approval
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1C1917] text-[#D6D3D1] py-10 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-xs">
          <div>
            <span className="font-serif text-lg font-bold text-white">Kalaiva</span>
            <p className="text-[#A8A29E] mt-1">
              Tamluk, Purba Medinipur, West Bengal – 721636, India • Grievance Officer: Bitan Bera
              (grievance@kalaiva.com)
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-[#A8A29E]">
            <button onClick={() => setActivePage('about')}>About</button>
            <button onClick={() => setActivePage('contact')}>Contact &amp; Grievance</button>
            <button onClick={() => setActivePage('terms')}>Terms</button>
            <button onClick={() => setActivePage('privacy')}>Privacy</button>
            <button onClick={() => setActivePage('refund')}>Refund &amp; Shipping</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
