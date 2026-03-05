import Image from 'next/image';
import Link from 'next/link';

export default function BestDeals({ deals = [] }) {
    const defaultDeals = [
        {
            id: 1,
            title: "Ultimate Creator Bundle",
            description: "Get the Sony A7 IV setup with a Ronin Gimbal and high-speed SD card. Everything you need to start producing cinematic content.",
            price: "৳295,000",
            oldPrice: "৳325,000",
            savings: "Save ৳30,000",
            imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800",
            badge: "PRO CHOICE",
        },
        {
            id: 2,
            title: "Gaming Starter Pack",
            description: "Razer BlackWidow Keyboard, DeathAdder Mouse, and BlackShark Headset bundled together for maximum performance.",
            price: "৳24,500",
            oldPrice: "৳28,500",
            savings: "Save ৳4,000",
            imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800",
            badge: "HOT BUNDLE",
        },
    ];

    const displayDeals = deals && deals.length > 0 ? deals : defaultDeals;

    return (
        <section className="bg-gray-50 py-10 md:py-20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-3 md:px-6">
                <div className="text-center mb-6 md:mb-14">
                    <h2 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight">
                        Best <span className="text-brand-purple">Deals</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto hidden sm:block">
                        Unbeatable offers hand-picked for you. Grab them before they're gone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {displayDeals.map((deal, idx) => (
                        <div key={deal.id || idx} className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-row items-stretch">
                            <div className="w-2/5 md:w-2/5 relative flex-shrink-0 overflow-hidden bg-gray-50 border-r border-gray-100">
                                <Image src={deal.imageUrl} alt={deal.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                                    <span className="bg-[#ff2a3b] text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-3 md:py-1 rounded-sm md:rounded-full uppercase tracking-wider shadow-sm">{deal.badge}</span>
                                </div>
                            </div>
                            <div className="w-3/5 md:w-3/5 p-3 md:p-8 flex flex-col justify-center">
                                <h3 className="text-sm md:text-2xl font-extrabold text-gray-900 mb-1 md:mb-3 leading-tight group-hover:text-brand-purple transition-colors line-clamp-2 md:line-clamp-none">{deal.title}</h3>
                                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed mb-2 md:mb-6 line-clamp-1 md:line-clamp-2">{deal.description}</p>
                                <div className="flex flex-wrap items-baseline gap-1.5 md:gap-3 mb-2 md:mb-4">
                                    <span className="text-sm md:text-3xl font-black text-brand-purple">{deal.price}</span>
                                    {deal.oldPrice && <span className="text-gray-400 text-[10px] md:text-lg line-through">{deal.oldPrice}</span>}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-auto">
                                    {deal.savings && <span className="bg-green-50 text-green-700 text-[9px] md:text-xs font-bold px-1.5 md:px-3 py-0.5 md:py-1.5 rounded whitespace-nowrap border border-green-200">{deal.savings}</span>}
                                    <Link href={deal.link || "/"} className="text-[10px] md:text-sm font-bold text-brand-purple hover:text-purple-700 md:underline underline-offset-4 transition-colors ml-auto md:ml-0 whitespace-nowrap">Shop Now →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
