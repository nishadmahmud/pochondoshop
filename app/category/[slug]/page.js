"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiFilter } from 'react-icons/fi';
import CategorySidebar from '../../../components/Category/CategorySidebar';
import ProductGrid from '../../../components/Category/ProductGrid';

export default function CategoryPage() {
    const params = useParams();
    const categoryName = decodeURIComponent(params.slug || 'Category');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Mock Products Data (replace with API call later)
    const products = [
        { id: 1, name: "Apple iPhone 15 Pro Max - 256GB Black Titanium", price: "৳ 165,000", oldPrice: "৳ 175,000", discount: "৳ 10,000", imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600" },
        { id: 2, name: "Samsung Galaxy S24 Ultra - 512GB Titanium Gray", price: "৳ 145,000", oldPrice: "৳ 160,000", discount: "৳ 15,000", imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600" },
        { id: 3, name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: "৳ 35,500", oldPrice: "৳ 42,000", discount: "৳ 6,500", imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600" },
        { id: 4, name: "Apple AirPods Pro (2nd Generation)", price: "৳ 26,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600" },
        { id: 5, name: "MacBook Pro 14-inch M3 Pro chip", price: "৳ 225,000", oldPrice: "৳ 240,000", discount: "৳ 15,000", imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600" },
        { id: 6, name: "Logitech MX Master 3S Wireless Mouse", price: "৳ 10,500", oldPrice: "৳ 12,000", discount: "৳ 1,500", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600" },
        { id: 7, name: "Anker PowerCore 20000mAh Power Bank", price: "৳ 4,500", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600" },
        { id: 8, name: "Samsung Galaxy Watch 6 Classic", price: "৳ 28,500", oldPrice: "৳ 35,000", discount: "৳ 6,500", imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Top Banner Image */}
                <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8" style={{ aspectRatio: '21/5' }}>
                    <Image
                        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2000&auto=format&fit=crop"
                        alt={`${categoryName} Banner`}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent flex items-center p-8 md:p-16">
                        <div className="text-white">
                            <h1 className="text-3xl md:text-6xl font-black mb-2 tracking-tight">Brand New</h1>
                            <p className="text-lg md:text-2xl font-medium text-white/90">The latest : Have a look at a glance</p>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="text-[12px] md:text-sm text-gray-500 mb-6 md:mb-10 flex items-center gap-2 font-medium">
                    <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link>
                    <span>/</span>
                    <span className="hover:text-brand-purple transition-colors cursor-pointer">Categories</span>
                    <span>/</span>
                    <span className="text-brand-purple font-bold capitalize">{categoryName}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 pt-2 lg:pt-0">

                    {/* Sidebar (Filters) - Left Side on Desktop */}
                    <aside className="lg:w-1/4 order-1">
                        <CategorySidebar
                            isOpen={isMobileFilterOpen}
                            onClose={() => setIsMobileFilterOpen(false)}
                        />
                    </aside>

                    {/* Main Content (Product Grid) - Right Side on Desktop */}
                    <main className="lg:w-3/4 order-2">
                        {products.length > 0 ? (
                            <ProductGrid products={products} onOpenFilter={() => setIsMobileFilterOpen(true)} categoryName={categoryName} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                <p className="text-gray-400 font-medium">No products found in this category.</p>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}
