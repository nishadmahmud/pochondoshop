"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMonitor, FiSmartphone, FiTablet, FiHeadphones, FiCpu, FiWifi, FiBox, FiHardDrive, FiCamera, FiTv, FiWatch, FiPrinter, FiSpeaker, FiMousePointer, FiBatteryCharging, FiRadio, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function ShopCategories() {
    // Countdown timer — starts at 23 Days 4h 4m 59s
    const [timeLeft, setTimeLeft] = useState(23 * 86400 + 4 * 3600 + 4 * 60 + 59);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 30 * 86400 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = String(Math.floor(timeLeft / 86400)).padStart(2, '0');
    const hours = String(Math.floor((timeLeft % 86400) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    // Layout ready to accept image URLs from the user
    const categories = [
        { name: "Smartphones", icon: <FiSmartphone />, image: "" },
        { name: "Laptops", icon: <FiMonitor />, image: "" },
        { name: "Tablets", icon: <FiTablet />, image: "" },
        { name: "Audio", icon: <FiHeadphones />, image: "" },
        { name: "Smart Watches", icon: <FiWatch />, image: "" },
        { name: "PC Components", icon: <FiCpu />, image: "" },
        { name: "Networking", icon: <FiWifi />, image: "" },
        { name: "Storage", icon: <FiHardDrive />, image: "" },
        { name: "Cameras", icon: <FiCamera />, image: "" },
        { name: "Televisions", icon: <FiTv />, image: "" },
        { name: "Printers", icon: <FiPrinter />, image: "" },
        { name: "Speakers", icon: <FiSpeaker />, image: "" },
        { name: "Peripherals", icon: <FiMousePointer />, image: "" },
        { name: "Power Banks", icon: <FiBatteryCharging />, image: "" },
        { name: "Gadgets", icon: <FiRadio />, image: "" },
        { name: "Accessories", icon: <FiBox />, image: "" },
    ];

    const flashSaleProducts = [
        { id: 101, name: "Apple iPhone 15 Pro - 256GB Titanium", price: "৳ 145,000", oldPrice: "৳ 155,000", discount: "-6%", imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400" },
        { id: 102, name: "Sony WH-1000XM5 Wireless Headphones", price: "৳ 35,000", oldPrice: "৳ 42,000", discount: "-16%", imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400" },
        { id: 103, name: "Samsung Galaxy Watch 6 Classic", price: "৳ 28,500", oldPrice: "৳ 35,000", discount: "-18%", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400" },
        { id: 104, name: "Logitech MX Master 3S Wireless Mouse", price: "৳ 10,500", oldPrice: "৳ 12,500", discount: "-16%", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400" },
        { id: 105, name: "Anker PowerCore 20000mAh Power Bank", price: "৳ 4,500", oldPrice: "৳ 6,000", discount: "-25%", imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=400" },
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="mb-8 md:mb-12 flex justify-between items-end">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        Shop By <span className="text-brand-blue">Category</span>
                    </h2>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-y-8 md:gap-y-12 gap-x-2 mb-16 md:mb-24">
                    {categories.map((cat, idx) => (
                        <Link
                            href={`/category/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            key={idx}
                            className="flex flex-col items-center justify-start gap-3 md:gap-4 text-center group"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center text-3xl md:text-4xl text-gray-700 group-hover:scale-110 transition-transform duration-300">
                                {cat.image ? (
                                    <Image src={cat.image} alt={cat.name} fill unoptimized className="object-contain" />
                                ) : (
                                    cat.icon
                                )}
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-gray-700 leading-tight group-hover:text-brand-red transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Banner */}
                <div className="bg-brand-red rounded-2xl p-4 md:p-8 relative">
                    {/* Header Strip */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                            <h3 className="flex items-center gap-2 text-2xl md:text-3xl lg:text-[40px] font-extrabold text-gray-900 leading-[1.15]">
                                <FiZap className="text-yellow-400 fill-yellow-400" /> Flash Sale
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-800 tracking-wider">
                                OFFER ENDING IN:
                            </div>
                            <div className="flex gap-2 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Days</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{days}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Hour</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{hours}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Min</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{minutes}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] text-gray-800 mb-1 font-semibold">Sec</span>
                                    <span className="bg-gray-900 text-white font-bold py-1 px-2 rounded tracking-widest">{seconds}</span>
                                </div>
                            </div>
                            <button className="bg-white text-gray-800 font-bold text-xs py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors whitespace-nowrap shadow-sm hover:shadow-md hidden md:block">
                                SEE ALL
                            </button>
                        </div>
                    </div>

                    {/* Product Row */}
                    <div className="relative group">
                        <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronLeft size={20} />
                        </button>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 overflow-hidden">
                            {flashSaleProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center z-10 transition-colors text-gray-800 hidden md:flex">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
