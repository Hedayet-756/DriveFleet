import React from 'react';
import Link from 'next/link';
import CarsCard from './CarsCard';
import { LuFlame, LuArrowRight } from 'react-icons/lu';

const Featured = async () => {

    let cars = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
        if (res.ok) {
            cars = await res.json();
        }
    } catch (error) {
        console.error("Featured cars fetch error:", error);
    }

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-16 relative">

            <div className="absolute top-10 left-10 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-44 h-44 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 pb-5 border-b border-slate-100 relative z-10">
                <div className="space-y-2">

                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-[#1ca0bc] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <LuFlame className="text-sm animate-pulse" /> Top Fleets
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
                        Featured Vehicles
                    </h2>
                    <p className="text-slate-500 text-sm max-w-md font-medium">
                        Handpicked elite travel experiences waiting for your next ultimate road trip adventure.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <Link href="/All-Car">
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1ca0bc] hover:bg-[#1ca0bc] text-[#1ca0bc] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-cyan-100 cursor-pointer group">
                            View All Fleet
                            <LuArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
            {cars.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white/50 text-slate-400 font-medium text-sm">
                    No featured cars available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
                    {cars.map((car) => (
                        <CarsCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Featured;