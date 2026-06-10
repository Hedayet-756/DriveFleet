import React from 'react';
import { headers } from "next/headers";
import { auth } from '@/lib/auth';
import { LuCalendarDays, LuBookmark, LuMapPin, LuCompass, LuSparkles, LuEye, LuCar } from 'react-icons/lu';
import { BookingCancelAlert } from '@/components/BookingCancelAlert';
import { Button } from '@heroui/react';
import Link from 'next/link';

const MyBookingsPage = async () => {

    // 🔒 সার্ভার সাইড সেশন সিকিউরিটি চেক
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    // ইউজার লগইন না থাকলে সার্ভার প্রোটেকশন গেটওয়ে
    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
                <div className="bg-cyan-50 text-cyan-600 p-4 rounded-full shadow-inner">
                    <LuCar className="text-4xl animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Authentication Required</h3>
                <p className="text-sm text-slate-500 max-w-xs">Please login to access your DriveFleet garage schedules.</p>
                <Link href="/login">
                    <Button className="bg-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-md cursor-pointer">
                        Access Login Portal
                    </Button>
                </Link>
            </div>
        );
    }

    // ⚡ সার্ভার সাইড ডিরেক্ট ফেচিং 
    let bookings = [];
    try {
        const res = await fetch(`http://localhost:5000/bookings/${user?.id}`, {
            cache: 'no-store'
        });
        if (res.ok) {
            bookings = await res.json();
        }
    } catch (error) {
        console.error("Fleet server fetch error:", error);
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="w-11/12 max-w-4xl mx-auto">

                {/* 📋 হেডার সেকশন (ফিগমা ম্যাচড) */}
                <div className="mb-8 relative border-b border-slate-100 pb-5">
                    <h1 className="text-3xl font-bold font-serif text-slate-900 mb-1">My Bookings</h1>
                    <p className="text-sm text-slate-500">Manage and view your upcoming travel plans</p>
                </div>

                {/* বুকিংস ডাটা কন্ডিশনাল রেন্ডারিং */}
                {!Array.isArray(bookings) || bookings.length === 0 ? (
                    <div className="text-center py-16 px-4 border border-dashed border-slate-200 rounded-2xl bg-white shadow-xs max-w-xl mx-auto flex flex-col items-center justify-center gap-3">
                        <div className="text-slate-300 bg-slate-50 p-4 rounded-full">
                            <LuSparkles className="text-3xl" />
                        </div>
                        <h4 className="text-base font-bold text-slate-700">Your Fleet is Empty</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">You haven't scheduled any drives yet. Find your perfect ride today!</p>
                        <Link href="/">
                            <Button className="mt-2 bg-[#1ca0bc] text-white font-semibold text-xs uppercase tracking-wider px-5 py-2 rounded-lg shadow-sm cursor-pointer">
                                Explore Vehicles
                            </Button>
                        </Link>
                    </div>
                ) : (
                    /* 🎯 ফিগমা রিয়েল লিস্ট লেআউট কন্টেইনার */
                    <div className="flex flex-col gap-5">
                        {bookings.map((booking) => {
                            const isPending = booking.status?.toLowerCase() === 'pending';

                            // ডেট এবং আওয়ার কাস্টম লোকাল ফরম্যাটিং (ফিগমা স্টাইল)
                            const departureDateTimeStr = booking.departureDateTime
                                ? new Date(booking.departureDateTime).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                }).replace(',', ' at') // কমা সরিয়ে 'at' বসানোর জন্য
                                : 'Not Scheduled';

                            return (
                                <div
                                    key={booking._id}
                                    className="flex flex-col md:flex-row gap-6 p-5 bg-white border border-slate-100 rounded-xl shadow-xs hover:shadow-md transition-all duration-200"
                                >
                                    {/* 🖼️ বামপাশে ইমেজ */}
                                    <div className="relative w-full md:w-64 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-slate-900">
                                        <img
                                            src={booking.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                            alt={booking.carName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* 📝 ডানপাশে কন্টেন্ট ও ডিটেইলস */}
                                    <div className="flex flex-col flex-grow justify-between py-0.5">
                                        <div className="space-y-2.5">

                                            {/* 🏷️ স্ট্যাটাস ব্যাজ (ফিগমা ম্যাচড কালার) */}
                                            <div>
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isPending
                                                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${isPending ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                                    {booking.status || 'Confirmed'}
                                                </span>
                                            </div>

                                            {/* 🏎️ টাইটেল বা গাড়ির নাম */}
                                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                                                {booking.carName || 'DriveFleet Supercar'}
                                            </h3>

                                            {/* 📍 মেটা ইনফো লিস্ট */}
                                            <div className="space-y-1 text-xs text-slate-500 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <LuCalendarDays className="text-slate-400 text-sm" />
                                                    <span>Departure: {departureDateTimeStr}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <LuMapPin className="text-slate-400 text-sm" />
                                                    <span>Pickup Location: {booking.pickupLocation || 'Main Terminal'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                                    <LuBookmark className="text-slate-400 text-sm" />
                                                    <span>Booking ID: {booking._id?.substring(0, 8).toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 💰 প্রাইস এবং অ্যাকশন বাটন রো */}
                                        <div className="flex items-end justify-between mt-4 md:mt-0 pt-4 border-t border-slate-50 md:border-t-0">
                                            <div className="text-2xl font-bold text-[#1ca0bc]">
                                                ${booking.price || booking.dailyPrice}
                                            </div>

                                            {/* অ্যাকশন বাটন গ্রূপ */}
                                            <div className="flex items-center gap-2.5">
                                                <BookingCancelAlert bookingId={booking._id} />

                                                <Link href={`All-Car/${booking.carId || booking._id}`}>
                                                    <Button size="sm" className="bg-[#1ca0bc] hover:bg-[#188fa8] text-white font-semibold rounded-md shadow-sm transition h-9 px-4 flex items-center gap-1 text-xs cursor-pointer">
                                                        <LuEye className="text-sm" /> View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;