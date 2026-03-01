"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiPhone, FiMapPin, FiMenu, FiX, FiMic, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  // Close sidebar on navigation (using simple onClick for links)
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="w-full shadow-sm sticky top-0 z-50 bg-white">

        {/* Main Navigation */}
        <div className="bg-white py-2 md:py-3 border-b border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 gap-2 md:gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 z-10" aria-label="Home">
              <Image
                src="/logo-main.png"
                alt="Pochondo Shop"
                width={180}
                height={45}
                className="h-8 md:h-10 w-auto object-contain"
                unoptimized
                priority
              />
            </Link>

            {/* Global Search Bar (Mobile & Desktop) */}
            <div className="flex-grow flex items-center bg-gray-50 border-2 border-transparent focus-within:border-brand-blue/30 focus-within:bg-white rounded-full px-4 py-1.5 transition-all mx-1 md:mx-6 group">
              <FiSearch size={18} className="text-gray-400 group-focus-within:text-brand-blue mr-3 flex-shrink-0 transition-colors" />
              <input
                type="text"
                placeholder="Search laptops, smartphones, accessories..."
                className="flex-grow bg-transparent border-none outline-none text-[13px] md:text-sm text-gray-800 min-w-0"
              />
              <button className="text-gray-400 hover:text-brand-blue transition-colors flex items-center justify-center p-1 flex-shrink-0 border-l border-gray-200 pl-3 ml-2">
                <FiMic size={18} />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex gap-6 font-semibold text-gray-700">
              <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-brand-blue transition-colors">Shop</Link>
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
              <button onClick={openCart} className="text-gray-600 hover:text-brand-red transition-colors relative p-2 rounded-full hover:bg-red-50" aria-label="Cart">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-800 hover:text-brand-blue transition-colors p-1.5 flex-shrink-0"
              aria-label="Menu"
            >
              <FiMenu size={26} />
            </button>
          </div>
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block bg-gray-50 py-1.5 border-b border-gray-100 relative z-40">
          <div className="max-w-7xl mx-auto flex gap-6 px-6 overflow-x-auto whitespace-nowrap items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="font-bold text-gray-400 text-[11px] uppercase tracking-wider flex items-center gap-1">
              <FiGrid size={12} /> Categories
            </span>
            <div className="w-px h-3 bg-gray-300 mx-1"></div>
            <Link href="/category/laptops" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Laptops</Link>
            <Link href="/category/smartphones" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Smartphones</Link>
            <Link href="/category/tablets" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Tablets & Pads</Link>
            <Link href="/category/accessories" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Accessories</Link>
            <Link href="/category/smart-watches" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Smart Watches</Link>
            <Link href="/category/audio" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Audio</Link>
            <Link href="/category/networking" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">Networking</Link>
            <Link href="/category/pc-components" className="text-gray-600 text-xs font-semibold hover:text-brand-blue transition-colors">PC Components</Link>
            <div className="ml-auto flex items-center gap-4">
              <Link href="/track-order" className="text-gray-500 text-[11px] font-semibold hover:text-brand-blue transition-colors">Track Order</Link>
              <Link href="/offers" className="text-white text-[11px] font-bold hover:opacity-90 transition-opacity bg-brand-red px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm shadow-brand-red/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
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
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex-1 py-4 flex flex-col items-center justify-center gap-2 text-gray-600 hover:text-brand-red hover:bg-red-50/50 transition-colors relative border-none">
            <div className="relative">
              <FiShoppingCart size={22} className="text-gray-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">{cartCount}</span>
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
          <Link href="/shop" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Shop</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/about" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>About Us</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/contact" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 text-gray-700 font-semibold border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Contact</span><FiChevronRight size={16} className="text-gray-300" />
          </Link>
          <Link href="/track-order" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3.5 font-semibold border-b border-gray-50 text-brand-blue bg-blue-50/50 hover:bg-blue-50 transition-colors">
            <span>Track Order</span><FiChevronRight size={16} className="text-brand-blue" />
          </Link>

          <div className="px-5 py-3 bg-gray-50 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            <FiGrid size={12} /> Tech Categories
          </div>
          <Link href="/category/laptops" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Laptops & Computers</span><FiChevronRight size={14} className="text-gray-300" />
          </Link>
          <Link href="/category/smartphones" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Smartphones</span><FiChevronRight size={14} className="text-gray-300" />
          </Link>
          <Link href="/category/accessories" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Mobile Accessories</span><FiChevronRight size={14} className="text-gray-300" />
          </Link>
          <Link href="/category/audio" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>Audio & Watches</span><FiChevronRight size={14} className="text-gray-300" />
          </Link>
          <Link href="/category/pc-components" onClick={closeSidebar} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600 font-medium border-b border-gray-50 hover:text-brand-blue hover:bg-blue-50/30 transition-colors">
            <span>PC Components</span><FiChevronRight size={14} className="text-gray-300" />
          </Link>
        </div>

      </div>
    </>
  );
}
