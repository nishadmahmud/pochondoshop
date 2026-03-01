"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            badge: "New Arrival",
            title: "iPhone 16 Pro Max",
            desc: "Titanium design. Next-generation performance. Pro camera system.",
            ctaText: "Pre-order Now",
            ctaLink: "/category/smartphones",
            imageUrl: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1200&auto=format&fit=crop", // iPhone 15/16 vibe
            align: "items-start",
            textAlign: "text-left"
        },
        {
            id: 2,
            badge: "Gaming Gear",
            title: "Ultimate PC Build",
            desc: "Dominate the game with the latest RTX 4090 builds and premium peripherals.",
            ctaText: "Build Yours",
            ctaLink: "/category/pc-components",
            imageUrl: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop", // Gaming PC
            align: "items-start",
            textAlign: "text-left"
        },
        {
            id: 3,
            badge: "Audio & Wearables",
            title: "Immersive Sound",
            desc: "Experience true audio fidelity with our premium over-ear headphones.",
            ctaText: "Shop Audio",
            ctaLink: "/category/audio",
            imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop", // Headphones
            align: "items-center",
            textAlign: "text-center"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="w-full bg-white py-4 md:py-6 px-3 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">

                {/* Left: Main Slider (approx 68% width on desktop) */}
                <div className="lg:w-[68%] w-full relative overflow-hidden rounded-2xl h-[250px] sm:h-[350px] md:h-[450px] shadow-sm border border-gray-100 group">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title}
                                fill
                                unoptimized
                                className="object-cover object-center z-0 transition-transform duration-[10000ms] ease-linear group-hover:scale-105"
                                priority={idx === 0}
                            />
                            {/* Gradient Overlay for Readability */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 
                                ${slide.textAlign === 'text-center' ? 'bg-black/50' : ''}`}
                            ></div>

                            <div className={`relative z-20 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 ${slide.align}`}>
                                <div className="bg-brand-blue text-white font-bold py-1 px-3 mb-3 md:mb-4 rounded-full text-[9px] md:text-xs uppercase tracking-widest shadow-sm border border-white/20 backdrop-blur-sm w-fit">
                                    {slide.badge}
                                </div>
                                <h2 className={`text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight mb-2 md:mb-3 drop-shadow-lg ${slide.textAlign}`}>
                                    {slide.title}
                                </h2>
                                <p className={`text-xs sm:text-sm md:text-base text-gray-200 mb-4 md:mb-8 font-medium max-w-sm md:max-w-md drop-shadow-md leading-relaxed ${slide.textAlign}`}>
                                    {slide.desc}
                                </p>
                                <Link href="/"className="inline-block">
                                    <button className="bg-white hover:bg-brand-red hover:text-white text-gray-900 font-bold text-xs md:text-sm py-2 px-6 md:py-3 md:px-8 rounded-full shadow-lg hover:shadow-brand-red/30 transition-all transform hover:-translate-y-0.5">
                                        {slide.ctaText}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Slider Navigation Dots */}
                    <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-brand-blue w-6 md:w-10' : 'bg-white/50 hover:bg-white w-2'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Two Stacked/Side-by-Side Static Banners */}
                <div className="lg:w-[32%] w-full flex flex-row lg:flex-col gap-3 md:gap-4">

                    {/* Top Banner: MacBook */}
                    <Link href="/"className="w-1/2 lg:w-full lg:flex-1 relative overflow-hidden rounded-xl border border-gray-100 bg-black group block h-[120px] sm:h-[180px]">
                        <Image
                            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"
                            alt="MacBook Pro"
                            fill
                            unoptimized
                            className="object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 group-hover:from-black/70 transition-colors duration-300"></div>
                        <div className="relative z-20 h-full flex flex-col justify-end p-3 md:p-6 text-white text-center items-center">
                            <h3 className="text-sm sm:text-lg md:text-xl font-black mb-1 leading-tight group-hover:text-brand-blue transition-colors">MacBook Pro</h3>
                            <span className="text-[9px] md:text-xs font-bold text-gray-300 tracking-wider">The new</span>
                        </div>
                    </Link>

                    {/* Bottom Banner: iPads / Tablets */}
                    <Link href="/"className="w-1/2 lg:w-full lg:flex-1 relative overflow-hidden rounded-xl border border-gray-100 bg-gray-900 group block h-[120px] sm:h-[180px]">
                        <Image
                            src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" // iPad vibe
                            alt="iPads"
                            fill
                            unoptimized
                            className="object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 group-hover:from-black/70 transition-colors duration-300"></div>
                        <div className="relative z-20 h-full flex flex-col justify-end items-center pb-2 md:pb-4 text-white w-full px-2">
                            <h3 className="text-xs sm:text-base md:text-lg font-black leading-tight mb-1 group-hover:text-brand-red transition-colors capitalize text-center">Apple Intelligence</h3>
                            <span className="text-[8px] sm:text-[10px] font-bold bg-white text-gray-900 px-2 py-1 rounded group-hover:bg-brand-red group-hover:text-white transition-colors">Buy Now</span>
                        </div>
                    </Link>

                </div>

            </div>
        </section>
    );
}
