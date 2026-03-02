"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiShoppingCart, FiGrid, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, openCart } = useCart();
    const { user, openAuthModal } = useAuth();

    const navItems = [
        { name: 'Home', href: '/', icon: FiHome },
        { name: 'Cart', href: '#', icon: FiShoppingCart, isCartToggle: true },
        { name: 'Categories', href: '/category', icon: FiGrid },
        { name: user ? 'Profile' : 'Login', href: '/profile', icon: FiUser, isAuth: true },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-purple border-t border-[#4a1c6a] z-50 pb-safe shadow-[0_-4px_20px_rgba(101,45,143,0.15)]">
            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    const isCartItem = item.isCartToggle;
                    const isAuthItem = item.isAuth;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                if (isCartItem) {
                                    e.preventDefault();
                                    openCart();
                                } else if (isAuthItem) {
                                    e.preventDefault();
                                    if (user) {
                                        router.push('/profile');
                                    } else {
                                        openAuthModal('login');
                                    }
                                }
                            }}
                            className={`flex flex-col items-center justify-center w-full gap-1.5 transition-colors ${isActive ? 'text-[#ff2a3b]' : 'text-white/80 hover:text-white'}`}
                        >
                            <div className="relative">
                                {isAuthItem && user?.image ? (
                                    <div className={`w-6 h-6 rounded-full overflow-hidden ring-2 ${isActive ? 'ring-[#ff2a3b]' : 'ring-white/50'}`}>
                                        <Image src={user.image} alt="Profile" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                ) : isAuthItem && user ? (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ${isActive ? 'bg-[#ff2a3b]/20 text-[#ff2a3b] ring-[#ff2a3b]' : 'bg-white/20 text-white ring-white/50'}`}>
                                        {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <>
                                        <Icon size={20} className={isCartItem && cartCount > 0 && !isActive ? "text-[#ff2a3b]" : ""} strokeWidth={isActive ? 2.5 : 2} />
                                        {isCartItem && cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-[#ff2a3b] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-purple">
                                                {cartCount}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <span className="text-[10px] font-semibold tracking-wide">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
