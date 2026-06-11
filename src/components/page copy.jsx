import React from 'react';
import { headers } from "next/headers";
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { LuCalendar, LuBookmark, LuEye } from 'react-icons/lu';
import { BookingCancelAlert } from '@/components/BookingCancelAlert';

const MyBookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });

    const token = await auth.api.getToken({
        headers: await headers()
    });

    const user = session?.user;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
        headers: {
            authorization: `Bearer ${token?.token || ''}` // Include the token in the Authorization header
        }
    });
    const bookings = await res.json();
    // console.log(bookings);

    return (
        <div className="w-10/12 mx-auto py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-serif text-slate-900 mb-1">My Bookings</h1>
                <p className="text-sm text-slate-500">Manage and view your upcoming travel plans</p>
            </div>

            {/* Bookings List */}
            {/* Bookings List */}
            <div className="flex flex-col gap-6">
                {/* 💡 এখানে চেক করা হচ্ছে ডাটাটি আসলেই অ্যারে কিনা এবং তাতে কোনো বুকিং আছে কিনা */}
                {!Array.isArray(bookings) || bookings.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 border border-dashed rounded-xl bg-slate-50/50">
                        {!Array.isArray(bookings)
                            ? "Failed to fetch valid booking records. Please try again."
                            : "No bookings found. Start booking your adventures!"}
                    </div>
                ) : (
                    bookings.map((booking) => {
                        // স্ট্যাটাস ট্যাগ নির্ধারণ
                        const isPending = booking.status?.toLowerCase() === 'pending';

                        // তারিখ ফরম্যাটিং
                        const departureDate = booking.departureDate
                            ? new Date(booking.departureDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                            : 'Not Specified';

                        return (
                            <div
                                key={booking._id}
                                className="flex flex-col md:flex-row gap-6 p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Left Side: Image */}
                                <div className="relative w-full md:w-72 h-44 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    <img
                                        src={booking.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
                                        alt={booking.destinationName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Right Side: Content Details */}
                                <div className="flex flex-col flex-grow justify-between py-1">
                                    <div className="space-y-3">
                                        {/* Status Badge */}
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isPending
                                                ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                                                : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${isPending ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                                {booking.status || 'Confirmed'}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold font-serif text-slate-800">
                                            {booking.destinationName || 'Destination'}
                                        </h3>

                                        {/* Meta Info */}
                                        <div className="space-y-1.5 text-sm text-slate-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <LuCalendar className="text-slate-400 text-base" />
                                                <span>Departure: {departureDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <LuBookmark className="text-slate-400 text-base" />
                                                <span>Booking ID: {booking._id?.substring(0, 8)}...</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and Action Buttons */}
                                    <div className="flex items-end justify-between mt-4 md:mt-0 pt-4 border-t border-slate-50 md:border-t-0">
                                        <div className="text-3xl font-bold text-cyan-600">
                                            ${booking.price}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <BookingCancelAlert bookingId={booking._id} />

                                            <button className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow-sm transition-colors">
                                                <LuEye className="text-base" /> View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;