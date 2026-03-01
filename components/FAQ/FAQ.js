"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
    const faqs = [
        { question: "How long does standard delivery take?", answer: "Inside Dhaka, we deliver within 24 hours. Outside Dhaka takes 2-3 business days via our premium courier partners." },
        { question: "Do you sell authentic products?", answer: "Yes, 100%. We only source directly from authorized distributors. Every product comes with its official brand warranty." },
        { question: "Can I return a product if I don't like it?", answer: "We accept returns within 3 days for sealed, unused items. For defective items, we offer immediate replacement." },
        { question: "Do you build custom PCs?", answer: "Absolutely! Choose your components on our site, and our expert technicians will assemble, cable-manage, and stress-test your rig for free." },
        { question: "What payment methods do you accept?", answer: "We accept Cash on Delivery (inside Dhaka), bKash, Nagad, Visa, Mastercard, and Amex via our secure gateway." },
        { question: "Do you offer EMI facilities?", answer: "Yes, we offer up to 36 months EMI on credit cards from 25+ partner banks for purchases over 5,000 BDT." },
    ];

    return (
        <section className="bg-white py-16 md:py-24 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left side: Header */}
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
                            Got <span className="text-brand-blue">Questions?</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 mb-8 font-medium">
                            Everything you need to know about our products, delivery, and services. Can't find the answer you're looking for? Reach out to our support team.
                        </p>
                    </div>

                    {/* Right side: Grid of FAQs */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="flex flex-col">
                                <h4 className="text-[15px] md:text-lg font-bold text-gray-900 mb-2 md:mb-3 leading-snug">
                                    {faq.question}
                                </h4>
                                <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
