'use client';

import React, { useState } from 'react';
import CarsCard from '@/components/CarsCard';
import { LuSearch, LuSlidersHorizontal, LuCar } from 'react-icons/lu';

const CarsContainer = ({ initialCars = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    // 🎯 ডিফল্ট স্টেট 'all' রাখা হয়েছে যাতে শুরুতে সব গাড়ি একসাথে শো করে
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 🎯 ডেটাবেজের ডাটা এবং স্টেটের ডাটা নিখুঁতভাবে ম্যাচ করার লজিক
    const filteredCars = initialCars.filter((car) => {
        const matchesSearch =
            car.carName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand?.toLowerCase().includes(searchQuery.toLowerCase());

        // ট্রিম (Trim) করে চেক করা যাতে কোনো এক্সট্রা স্পেসের জন্য ফিল্টার মিস না হয়
        const carCategory = car.category?.toLowerCase().trim();
        const currentFilter = selectedCategory.toLowerCase().trim();

        const matchesCategory = currentFilter === 'all' || carCategory === currentFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            {/* 🛠️ সার্চ, ফিল্টার এবং কাউন্টার রো */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-slate-100">

                {/* 🔍 সার্চ ও ফিল্টার */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* সার্চ ইনপুট */}
                    <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 w-full sm:w-72 focus-within:border-[#1ca0bc] focus-within:bg-white transition-all group">
                        <LuSearch className="text-slate-400 group-focus-within:text-[#1ca0bc] mr-2 text-lg" />
                        <input
                            type="text"
                            placeholder="Search cars by model or brand..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 w-full font-medium"
                        />
                    </div>

                    {/* 🎯 ফিল্টার ড্রপডাউন (ভ্যালু এবং টেক্সট ঠিক করা হয়েছে) */}
                    <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 w-full sm:w-48 focus-within:border-[#1ca0bc] focus-within:bg-white transition-all group relative">
                        <LuSlidersHorizontal className="text-slate-400 group-focus-within:text-[#1ca0bc] mr-2 text-base" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-transparent outline-none text-sm text-slate-600 font-semibold w-full cursor-pointer appearance-none pr-4 capitalize"
                        >
                            {/* প্রথম অপশনটি অবশ্যই 'all' হতে হবে যাতে সব গাড়ি শুরুতে দেখা যায় */}
                            <option value="all">All Categories</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="hatchback">Hatchback</option>
                            <option value="luxury">Luxury</option>
                            <option value="hybrid / ev">Hybrid / EV</option>
                        </select>
                        <span className="absolute right-4 pointer-events-none text-xs text-slate-400 font-bold">▼</span>
                    </div>
                </div>

                {/* 📊 কাউন্টার ব্যাজ */}
                <div className="flex-shrink-0 self-start md:self-auto">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm">
                        <LuCar className="text-sm text-[#1ca0bc]" />
                        Total Available: <span className="text-[#1ca0bc] font-extrabold text-sm ml-0.5">{filteredCars.length}</span>
                    </div>
                </div>
            </div>

            {/* 🏎️ গাড়ির গ্রিড লেআউট */}
            {filteredCars.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 text-slate-400 font-semibold text-sm">
                    No vehicles match your search criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.map((car, index) => (
                        <CarsCard
                            key={car._id}
                            car={car}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarsContainer;