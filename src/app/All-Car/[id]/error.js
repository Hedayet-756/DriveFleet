'use client'; // 🎯 এরর ফাইল অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import React, { useEffect } from 'react';
import Link from 'next/link';

const Error = ({ error, reset }) => {

    useEffect(() => {
        // 🚨 কনসোলে এররটি লগ করা যাতে ডিবাগ করতে সুবিধা হয়
        console.error("Caught by Next.js Error Boundary:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">

            {/* ⚠️ এরর আইকন ও এনিমেশন ওরিয়েন্টেড ডিজাইন */}
            <div className="relative flex justify-center items-center">
                <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-rose-400 opacity-20"></div>
                <div className="relative rounded-full bg-rose-50 p-5 border border-rose-100 shadow-sm text-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>
            </div>

            {/* 📝 টেক্সট মেসেজ */}
            <div className="mt-6 space-y-3 max-w-md">
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight sm:text-3xl">
                    Something went wrong!
                </h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    {error?.message || "An unexpected error occurred while processing your request. Please try again or return to the main dashboard."}
                </p>
            </div>

            {/* 🚀 অ্যাকশন বাটনসমূহ */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none">
                {/* 🔄 পুনরায় চেষ্টা করার বাটন */}
                <button
                    onClick={() => reset()} // 🎯 এটি ক্লিকে Next.js ওই রাউটটি আবার রেন্ডার করার চেষ্টা করবে
                    className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-cyan-100 cursor-pointer"
                >
                    Try Again
                </button>

                {/* 🏠 হোম পেজে যাওয়ার বাটন */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
                >
                    Go to Homepage
                </Link>
            </div>

            {/* 🛡️ সিকিউরিটি বা গেটওয়ে ফুটার */}
            <div className="mt-16 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                DriveFleet Error Recovery System
            </div>
        </div>
    );
};

export default Error;