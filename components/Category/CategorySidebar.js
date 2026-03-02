"use client";

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

export default function CategorySidebar({ isOpen, onClose }) {
    // Mobile drawer state is controlled by parent (page.js)

    const [expandedSections, setExpandedSections] = useState({
        price: true,
        storage: true,
        region: true,
        color: true,
        availability: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
    const regionOptions = ["Global", "USA", "UK", "Canada", "Singapore", "India"];
    const colors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Silver", hex: "#C0C0C0" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Gold", hex: "#FFD700" },
        { name: "Purple", hex: "#652d8f" }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 left-0 lg:left-0 z-50 w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-full lg:shadow-none lg:border lg:border-gray-200 lg:rounded-xl lg:p-5 lg:bg-white flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 lg:p-0 lg:pb-5 border-b border-gray-100 mb-5">
                    <span className="font-bold text-lg text-brand-purple">
                        Filters
                    </span>
                    <button className="text-[11px] font-semibold bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors text-gray-700">
                        Reset
                    </button>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-full ml-2">
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-5 lg:p-0 space-y-6 overflow-y-auto h-full lg:h-auto pb-20 lg:pb-0 flex-grow">

                    {/* Price Range */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('price')}
                            className="flex items-center justify-between w-full text-left font-bold text-[#00382E] mb-4 uppercase text-sm tracking-wider"
                        >
                            <span>Price Range</span>
                            {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.price && (
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">৳</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-purple"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">৳</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-purple"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Storage */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('storage')}
                            className="flex items-center justify-between w-full text-left font-bold text-[#00382E] mb-4 uppercase text-sm tracking-wider"
                        >
                            <span>Storage</span>
                            {expandedSections.storage ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.storage && (
                            <div className="space-y-3">
                                {storageOptions.map(storage => (
                                    <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer h-4 w-4 border border-gray-300 rounded text-brand-purple focus:ring-brand-purple" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-brand-purple transition-colors">{storage}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Region */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('region')}
                            className="flex items-center justify-between w-full text-left font-bold text-[#00382E] mb-4 uppercase text-sm tracking-wider"
                        >
                            <span>Region</span>
                            {expandedSections.region ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.region && (
                            <div className="space-y-3">
                                {regionOptions.map(region => (
                                    <label key={region} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer h-4 w-4 border border-gray-300 rounded text-brand-purple focus:ring-brand-purple" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-brand-purple transition-colors">{region}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Colors */}
                    <div className="border-b border-gray-100 pb-6">
                        <button
                            onClick={() => toggleSection('color')}
                            className="flex items-center justify-between w-full text-left font-bold text-[#00382E] mb-4 uppercase text-sm tracking-wider"
                        >
                            <span>Color</span>
                            {expandedSections.color ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {expandedSections.color && (
                            <div className="flex flex-wrap gap-3">
                                {colors.map(color => (
                                    <button
                                        key={color.name}
                                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 relative"
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                        {color.name === 'White' && <span className="absolute inset-0 rounded-full border border-gray-100"></span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="pb-6">
                        <button
                            onClick={() => toggleSection('availability')}
                            className="flex items-center justify-between w-full text-left font-bold text-[#00382E] mb-4 uppercase text-sm tracking-wider"
                        >
                            <span>Availability</span>
                            {expandedSections.availability ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        {expandedSections.availability && (
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded text-brand-purple focus:ring-brand-purple" />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-brand-purple">All</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded text-brand-purple focus:ring-brand-purple" />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-brand-purple">In Stock</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Footer Actions */}
                <div className="lg:hidden p-4 border-t border-gray-100 bg-white flex gap-3 mt-auto">
                    <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-[#00382E] font-bold text-sm">
                        Reset
                    </button>
                    <button onClick={onClose} className="flex-1 py-3 bg-brand-purple text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-purple/20">
                        Apply Filters
                    </button>
                </div>
            </aside>
        </>
    );
}
