"use client";
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">
            {/* 🎨 404 বিগ টেক্সট এনিমেশন/স্টাইল */}
            <div className="relative">
                <h1 className="text-9xl font-extrabold text-slate-200 tracking-widest select-none">
                    404
                </h1>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 text-sm font-bold rounded rotate-12 absolute top-12 left-1/3 shadow-md">
                    Page Not Found
                </div>
            </div>

            {/* 📝 টেক্সট মেসেজ */}
            <div className="mt-8 space-y-3 max-w-md">
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
                    Lost in Space?
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                    Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track.
                </p>
            </div>

            {/* 🚀 অ্যাকশন বাটন */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-cyan-100"
                >
                    ← Back to Home
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
                >
                    Go Back
                </button>
            </div>

            {/* 🏎️ ব্রান্ড বা ফুটার টাচ */}
            <div className="mt-16 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                DriveFleet Gateway • Security Secured
            </div>
        </div>
    );
};

export default NotFound;