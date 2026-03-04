"use client";

import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    const [activeBrand, setActiveBrand] = useState("All");
    const sliderRef = useRef(null);

    const defaultProducts = [
        { id: 1, name: "Razer DeathAdder V3 Pro Gaming Mouse", brand: "Razer", price: "৳ 14,500", oldPrice: "৳ 16,000", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400" },
        { id: 2, name: "Keychron K2 Wireless Mechanical Keyboard", brand: "Keychron", price: "৳ 11,000", oldPrice: "৳ 12,500", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400" },
        { id: 3, name: "Samsung 32\" Odyssey G7 Gaming Monitor", brand: "Samsung", price: "৳ 75,500", oldPrice: "৳ 82,000", discount: "৳ 6,500", imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400" },
        { id: 4, name: "JBL Charge 5 Portable Bluetooth Speaker", brand: "JBL", price: "৳ 16,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400" },
        { id: 5, name: "Elgato Stream Deck MK.2", brand: "Elgato", price: "৳ 18,500", oldPrice: "৳ 20,000", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=400" }
    ];

    const sourceProducts = products && products.length > 0 ? products : defaultProducts;

    const brands = ["All", ...new Set(sourceProducts.map(p => p.brand).filter(Boolean))];

    const filteredProducts = activeBrand === "All"
        ? sourceProducts
        : sourceProducts.filter(p => p.brand === activeBrand);

    const handleBrandChange = (brand) => {
        setActiveBrand(brand);
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

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
                        <button
                            onClick={scrollLeft}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors bg-black text-white hover:bg-gray-800"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors bg-black text-white hover:bg-gray-800"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {brands.map((brand, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleBrandChange(brand)}
                            className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-colors ${activeBrand === brand ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Product Cards Slider */}
                <div className="overflow-hidden relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-3 md:gap-5 pb-4 snap-x snap-mandatory flex-nowrap"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {filteredProducts.length > 0 ? filteredProducts.map((product, idx) => (
                            <div key={product.id || idx} className="w-[calc(50%-6px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] shrink-0 snap-start">
                                <ProductCard product={product} />
                            </div>
                        )) : (
                            <div className="w-full text-center py-10 text-gray-500 text-sm">No products found for this brand.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
