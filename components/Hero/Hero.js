"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ slides = [], banners = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fallback Banners if none from API
    const defaultBanners = [
        {
            id: 'b1',
            title: 'MacBook Pro',
            subtitle: 'The new',
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
            link: '/'
        },
        {
            id: 'b2',
            title: 'Apple Intelligence',
            subtitle: '',
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
            link: '/'
        }
    ];

    const displayBanners = banners && banners.length >= 2 ? banners.slice(0, 2) : defaultBanners;

    // Default slides fallback
    const defaultSlides = [
        {
            id: 1,
            badge: "New Arrival",
            title: "iPhone 16 Pro Max",
            subtitle: "Titanium design. Next-generation performance. Pro camera system.",
            buttonText: "Pre-order Now",
            buttonLink: "/category/smartphones",
            image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1200&auto=format&fit=crop", // iPhone 15/16 vibe
            align: "items-start",
            textAlign: "text-left"
        },
        {
            id: 2,
            badge: "Gaming Gear",
            title: "Ultimate PC Build",
            subtitle: "Dominate the game with the latest RTX 4090 builds and premium peripherals.",
            buttonText: "Build Yours",
            buttonLink: "/category/pc-components",
            image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop", // Gaming PC
            align: "items-start",
            textAlign: "text-left"
        },
    ];

    const displaySlides = slides && slides.length > 0 ? slides : defaultSlides;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    return (
        <section className="w-full bg-white py-4 md:py-6 px-3 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">

                {/* Left: Main Slider (approx 68% width on desktop) */}
                <div className="lg:w-[68%] w-full relative overflow-hidden rounded-2xl h-[250px] sm:h-[350px] md:h-[450px] shadow-sm border border-gray-100 group">
                    {displaySlides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Link href={slide.buttonLink || "/category"} className="w-full h-full block">
                                <Image
                                    src={slide.image || slide.image_path || "/images/hero-fallback.jpg"}
                                    alt={slide.title || "Slider Image"}
                                    fill
                                    unoptimized
                                    className="object-cover object-center z-0 transition-transform duration-[10000ms] ease-linear group-hover:scale-105"
                                    priority={idx === 0}
                                />
                            </Link>
                        </div>
                    ))}

                    {/* Slider Navigation Dots */}
                    <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                        {displaySlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-brand-blue w-6 md:w-10' : 'bg-white/50 hover:bg-white w-2'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: 2 Static Banners */}
                <div className="lg:w-[32%] w-full flex flex-row lg:flex-col gap-3 md:gap-4">
                    {/* Top / Bottom Banners Iteration */}
                    {displayBanners.map((banner, idx) => (
                        <Link href={banner.link || banner.link_url || "/"} key={banner.id || idx} className="w-1/2 lg:w-full lg:flex-1 relative overflow-hidden rounded-xl border border-gray-100 bg-gray-100 group block h-[120px] sm:h-[180px]">
                            <Image
                                src={banner.image || banner.image_path || banner.image_url}
                                alt={banner.title || `Banner ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
