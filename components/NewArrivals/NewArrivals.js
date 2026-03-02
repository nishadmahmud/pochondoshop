"use client";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals() {
    const products = [
        { id: 1, name: "Razer DeathAdder V3 Pro Gaming Mouse", price: "৳ 14,500", oldPrice: "৳ 16,000", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400" },
        { id: 2, name: "Keychron K2 Wireless Mechanical Keyboard", price: "৳ 11,000", oldPrice: "৳ 12,500", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400" },
        { id: 3, name: "Samsung 32\" Odyssey G7 Gaming Monitor", price: "৳ 75,500", oldPrice: "৳ 82,000", discount: "৳ 6,500", imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400" },
        { id: 4, name: "JBL Charge 5 Portable Bluetooth Speaker", price: "৳ 16,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400" },
        { id: 5, name: "Elgato Stream Deck MK.2", price: "৳ 18,500", oldPrice: "৳ 20,000", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=400" }
    ];

    return (
        <section className="bg-white py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header Container */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        New <span className="text-brand-purple">Arrivals</span>
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex gap-2">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                            <FiChevronLeft size={20} />
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    <button className="px-5 py-2 rounded-full bg-brand-blue text-white text-xs md:text-sm font-bold whitespace-nowrap">
                        Peripherals
                    </button>
                    <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs md:text-sm font-semibold whitespace-nowrap">
                        Gaming
                    </button>
                    <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-xs md:text-sm font-semibold whitespace-nowrap">
                        Smart Home
                    </button>
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
