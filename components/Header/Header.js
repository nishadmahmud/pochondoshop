"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { searchProducts } from '../../lib/api';

export default function Header({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');

  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const defaultCategories = [
    { name: "Laptops", slug: "laptops" },
    { name: "Smartphones", slug: "smartphones" },
    { name: "Tablets & Pads", slug: "tablets" },
    { name: "Accessories", slug: "accessories" },
    { name: "Smart Watches", slug: "smart-watches" }
  ];

  const displayCategories = (categories && categories.length > 0 ? categories : defaultCategories).slice(0, 7);

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  const runSearch = async (q) => {
    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    setIsSearchOpen(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

      const mapped = items.map((p) => {
        const basePrice = Number(p.retails_price || p.discounted_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = String(p.discount_type || '').toLowerCase();
        const hasDiscount = discountValue > 0 && discountType !== '0';

        const price = hasDiscount
          ? discountType === 'percentage'
            ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
            : Math.max(0, basePrice - discountValue)
          : basePrice;

        const discountLabel = hasDiscount
          ? discountType === 'percentage'
            ? `-${discountValue}%`
            : `৳ ${discountValue.toLocaleString('en-IN')}`
          : null;

        const imageUrl =
          p.image_path ||
          p.image_path1 ||
          p.image_path2 ||
          (Array.isArray(p.image_paths) && p.image_paths[0]) ||
          '/no-image.svg';

        return {
          id: p.id,
          name: p.name,
          price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel,
          imageUrl,
          brand: p.brands?.name || '',
          categoryName: p.category?.name || 'Others',
        };
      });

      setSearchResults(mapped);

      const categorySet = new Set(mapped.map((m) => m.categoryName));
      const cats = Array.from(categorySet).sort();
      setSearchCategories(cats);
      setActiveSearchCategory('all');
    } catch (err) {
      console.error('Search failed', err);
      setSearchError('Something went wrong while searching. Please try again.');
      setSearchResults([]);
      setSearchCategories([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    runSearch(q);
  };

  // Debounce search when user stops typing
  useEffect(() => {
    const q = searchQuery.trim();

    if (!q) {
      // Clear & close when input is emptied
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    const timeout = setTimeout(() => {
      runSearch(q);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const filteredSearchResults = useMemo(() => {
    if (activeSearchCategory === 'all') return searchResults;
    return searchResults.filter((p) => p.categoryName === activeSearchCategory);
  }, [searchResults, activeSearchCategory]);

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">

        {/* Main Navigation */}
        <div className="bg-white py-2 md:py-3 border-b border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-3 md:px-6 gap-1 sm:gap-2 md:gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 z-10 mr-1 sm:mr-0" aria-label="Home">
              <Image
                src="/logo-main.png"
                alt="Pochondo Shop"
                width={180}
                height={45}
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                unoptimized
                priority
              />
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <form onSubmit={handleSearchSubmit} className="flex-grow flex items-center bg-gray-50 border border-gray-200 md:border-2 md:border-transparent focus-within:border-brand-blue/30 focus-within:bg-white rounded-full px-2 md:px-4 py-1 md:py-1.5 transition-all mx-0 md:mx-6 group w-full relative">
              <FiSearch className="text-gray-400 group-focus-within:text-brand-blue mr-1.5 md:mr-3 flex-shrink-0 transition-colors w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-grow bg-transparent border-none outline-none text-[11px] md:text-sm text-gray-800 min-w-0 w-full md:hidden"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, smartphones, accessories..."
                className="flex-grow bg-transparent border-none outline-none text-[11px] md:text-sm text-gray-800 min-w-0 w-full hidden md:block"
              />
              <button type="submit" className="text-gray-400 hover:text-brand-blue transition-colors flex items-center justify-center p-0.5 md:p-1 flex-shrink-0 border-l border-gray-200 pl-1.5 md:pl-3 ml-1 md:ml-2">
                <FiMic className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
              </button>
            </form>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-6 font-semibold text-gray-700">
              <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
              <Link href="/about" className="hover:text-brand-blue transition-colors">About</Link>
              <Link href="/contact" className="hover:text-brand-blue transition-colors">Contact</Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="hidden md:flex gap-3 items-center ml-2 border-l border-gray-200 pl-5">
              <button onClick={handleUserClick} className="text-gray-600 hover:text-brand-blue transition-colors p-2 rounded-full hover:bg-blue-50" aria-label="Account">
                {user?.image ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-blue/50">
                    <Image src={user.image} alt="Profile" width={32} height={32} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : user ? (
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-sm font-bold text-brand-blue ring-2 ring-brand-blue/30">
                    {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser size={22} />
                )}
              </button>
              <button onClick={openCart} className="text-gray-600 hover:text-brand-purple transition-colors relative p-2 rounded-full hover:bg-purple-50" aria-label="Cart">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-purple text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-800 hover:text-brand-blue transition-colors p-1 sm:p-1.5 flex-shrink-0 ml-0.5 sm:ml-0"
              aria-label="Menu"
            >
              <FiMenu className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
            </button>
          </div>
        </div>

        {/* Global Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-[100%] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 max-h-[70vh] flex flex-col pt-3 pb-0 border-t">
            {isSearching ? (
              <div className="p-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
              </div>
            ) : searchError ? (
              <div className="p-8 text-center text-red-500">{searchError}</div>
            ) : searchResults.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No products found matching &quot;{searchQuery}&quot;</div>
            ) : (
              <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* Search Sidebar (Categories) */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => setActiveSearchCategory('all')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSearchCategory === 'all'
                            ? 'bg-brand-purple text-white font-semibold'
                            : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                            }`}
                        >
                          All Results ({searchResults.length})
                        </button>
                      </li>
                      {searchCategories.map(cat => {
                        const count = searchResults.filter(p => p.categoryName === cat).length;
                        return (
                          <li key={cat}>
                            <button
                              onClick={() => setActiveSearchCategory(cat)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${activeSearchCategory === cat
                                ? 'bg-brand-purple text-white font-semibold'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
                                }`}
                            >
                              <span className="truncate pr-2">{cat}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSearchCategory === cat ? 'bg-white/20' : 'bg-gray-200'
                                }`}>{count}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Search Results Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-white" style={{ maxHeight: '60vh' }}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">
                      {activeSearchCategory === 'all' ? 'All Products' : activeSearchCategory}
                    </h3>
                    <button
                      onClick={closeSearchModal}
                      className="text-xs text-brand-purple hover:underline"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSearchResults.map(product => (
                      <Link
                        key={product.id}
                        href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                        onClick={closeSearchModal}
                        className="group flex flex-col border border-gray-100 rounded-xl hover:shadow-md transition-shadow p-3 hover:border-brand-purple/30"
                      >
                        <div className="aspect-square relative bg-gray-50 rounded-lg mb-3 overflow-hidden">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                          {product.discount && (
                            <div className="absolute top-2 left-2 bg-[#ff2a3b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                              {product.discount}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className="text-[10px] font-semibold text-brand-purple mb-1">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors">
                            {product.name}
                          </h4>
                          <div className="mt-auto flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-bold text-[#ff2a3b]">{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                {product.oldPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-white py-2.5 border-b border-gray-100 shadow-sm relative z-40">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 overflow-x-auto whitespace-nowrap items-center no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="font-extrabold text-gray-400 text-[12px] uppercase tracking-[0.1em] flex items-center gap-2 flex-shrink-0">
              <FiGrid size={16} className="text-brand-purple/70" /> Categories
            </span>
            <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0"></div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {displayCategories.map((cat, idx) => (
                <Link
                  key={cat.id || idx}
                  href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 text-[14px] font-bold hover:text-brand-purple hover:bg-brand-purple/5 px-4 py-2 rounded-xl transition-all duration-300 flex-shrink-0"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-5 flex-shrink-0 pl-8">
              <Link href="/track-order" className="text-gray-500 text-[12px] font-bold hover:text-brand-purple transition-all flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:scale-125 transition-transform"></span>
                Track Order
              </Link>
              <Link href="/special-offers" className="text-white text-[12px] font-black hover:scale-105 active:scale-95 transition-all bg-brand-purple px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-brand-purple/20 border border-brand-purple/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-bounce-slow">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                </svg>
                Special Offers
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Sidebar Header */}
        <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100 shadow-sm">
          <Link href="/" onClick={closeSidebar} className="flex items-center flex-shrink-0" aria-label="Home">
            <Image
              src="/logo-main.png"
              alt="Pochondo Shop"
              width={150}
              height={36}
              className="h-8 w-auto object-contain"
              unoptimized
            />
          </Link>
          <button onClick={closeSidebar} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Quick Actions */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 border-r border-gray-100 text-gray-600 hover:text-brand-blue hover:bg-blue-50/50 transition-colors">
            {user?.image ? (
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-blue/40">
                <Image src={user.image} alt="Profile" width={32} height={32} className="w-full h-full object-cover" unoptimized />
              </div>
            ) : user ? (
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-sm font-bold text-brand-blue ring-2 ring-brand-blue/30">
                {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
              </div>
            ) : (
              <FiUser size={22} className="text-gray-400" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider">{user ? 'Profile' : 'Login'}</span>
          </button>
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-brand-purple hover:bg-purple-50/50 transition-colors relative border-none">
            <div className="relative">
              <FiShoppingCart size={22} className="text-gray-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-purple text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">{cartCount}</span>
              )}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider">Cart</span>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-5 py-3 bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Main Menu</div>
          <Link href="/" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Home</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/about" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>About Us</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/contact" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Contact</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/warranty" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Warranty Policy</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/refund" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Refund Policy</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/terms" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Terms & Conditions</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/track-order" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 font-semibold border-b border-gray-50 text-brand-blue bg-blue-50/50 hover:bg-blue-50 transition-colors">
            <span>Track Order</span><FiChevronRight size={16} className="text-brand-blue" />
          </Link>

          <div className="px-5 py-3 bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            <FiGrid size={12} /> Tech Categories
          </div>
          {displayCategories.map((cat, idx) => (
            <Link
              key={cat.id || idx}
              href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={closeSidebar}
              className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors"
            >
              <span>{cat.name}</span><FiChevronRight size={14} className="text-gray-300" />
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}
