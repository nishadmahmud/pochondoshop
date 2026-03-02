"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-brand-blue border-t-4 border-brand-purple text-white/90 mt-auto">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-10 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-8 md:mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-4 md:gap-6 col-span-2 sm:col-span-1 border-r border-white/10 pr-4">
                        <Link href="/"className="inline-block" aria-label="Home">
                            <Image
                                src="/logo-main.png"
                                alt="Pochondo Shop"
                                width={200}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain mt-1"
                                unoptimized
                            />
                        </Link>
                        <p className="text-[11px] md:text-sm leading-relaxed text-white/80 font-medium tracking-wide">
                            Bangladesh's premier destination for genuine tech gear, smart gadgets, and digital lifestyle accessories.
                        </p>
                        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-white/90">
                            <p className="flex gap-2 items-start">
                                <strong className="text-white border-b border-brand-purple pb-0.5 mt-0.5">Address:</strong>
                                <span className="leading-snug">Dhaka, Bangladesh</span>
                            </p>
                            <p className="flex gap-2 items-center">
                                <strong className="text-white border-b border-brand-purple pb-0.5">Phone:</strong>
                                <a href="/"className="hover:text-brand-purple font-semibold transition-colors">+880 1234 567890</a>
                            </p>
                        </div>
                        <div className="flex gap-3 md:gap-4 mt-2">
                            <a href="/"target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full text-white hover:bg-brand-purple hover:text-white transition-all shadow-sm" aria-label="Facebook"><FaFacebook size={18} /></a>
                            <a href="/"target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full text-white hover:bg-brand-purple hover:text-white transition-all shadow-sm" aria-label="Instagram"><FaInstagram size={18} /></a>
                            <a href="/"target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full text-white hover:bg-brand-purple hover:text-white transition-all shadow-sm" aria-label="YouTube"><FaYoutube size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4 md:gap-6 pl-0 lg:pl-4">
                        <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-wider">Services</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm font-medium">
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Device Repair</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Warranty Claim</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Setup & Installation</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Device Trade-in</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Tech Consultation</Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-wider">Shop Tech</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm font-medium">
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Laptops & Computers</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Smartphones</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Mobile Accessories</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Audio & Wearables</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">PC Components</Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col gap-4 md:gap-6 col-span-2 sm:col-span-1">
                        <h3 className="text-sm md:text-lg font-black text-white uppercase tracking-wider">Company</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm font-medium">
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">About Us</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Contact Us</Link>
                            <Link href="/"className="text-brand-purple hover:text-white font-bold transition-all">Track Order</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Privacy Policy</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Terms & Conditions</Link>
                            <Link href="/"className="hover:text-brand-purple hover:translate-x-1 transition-all">Refund Policy</Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-white/10 bg-gray-900 shadow-inner">
                <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs font-semibold text-gray-400 tracking-wide uppercase">
                    <p>&copy; {new Date().getFullYear()} Pochondo Shop. All rights reserved.</p>
                    <div className="flex gap-4 md:gap-6">
                        <Link href="/"className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/"className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/"className="hover:text-white transition-colors">Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
