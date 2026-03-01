import Link from 'next/link';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts() {
    const products = [
        { id: 1, name: "Sony Alpha a7 IV Mirrorless Camera", price: "৳245,000", oldPrice: "৳260,000", discount: "-6%", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400" },
        { id: 2, name: "PlayStation 5 Console (Disc Edition)", price: "৳68,500", oldPrice: "৳75,000", discount: "-9%", imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400" },
        { id: 3, name: "DJI Mini 3 Pro Drone", price: "৳92,000", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=400" },
        { id: 4, name: "Apple AirPods Pro (2nd Gen)", price: "৳28,200", oldPrice: null, discount: null, imageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400" },
        { id: 5, name: "Asus ROG Zephyrus G14 Gaming Laptop", price: "৳185,000", oldPrice: "৳210,000", discount: "-12%", imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400" },
        { id: 6, name: "Samsung 65\" Class OLED 4K Smart TV", price: "৳215,000", oldPrice: "৳250,000", discount: "-14%", imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400" },
        { id: 7, name: "Logitech G Pro X Superlight", price: "৳15,500", oldPrice: "৳17,000", discount: "-9%", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400" },
        { id: 8, name: "WD Black SN850X 2TB NVMe SSD", price: "৳22,500", oldPrice: "৳26,000", discount: "-13%", imageUrl: "https://images.unsplash.com/photo-1531492746076-161caa80d225?q=80&w=400" },
    ];

    return (
        <section className="bg-white py-8 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="flex items-end justify-between mb-6 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-1 md:mb-3 tracking-tight">
                            Featured <span className="text-brand-red">Products</span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-lg hidden sm:block">Explore curiated premium tech gear chosen just for you.</p>
                    </div>
                    <Link href="/"className="text-xs md:text-sm font-bold text-gray-500 hover:text-brand-red uppercase tracking-wider transition-colors inline-block pb-1 border-b-2 border-transparent hover:border-brand-red whitespace-nowrap">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
