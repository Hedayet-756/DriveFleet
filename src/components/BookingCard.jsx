'use client';

import { useState } from 'react';
import { LuCheck, LuCalendarDays, LuClock, LuUserCheck } from 'react-icons/lu';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const BookingCard = ({ carData }) => {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { _id, carName, dailyPrice, imageUrl, pickupLocation } = carData || {};

    const [bookingDate, setBookingDate] = useState('');
    const [bookingHour, setBookingHour] = useState('09:00 AM');
    const [needDriver, setNeedDriver] = useState('no');

    const basePrice = Number(dailyPrice) || 0;
    const driverFee = needDriver === 'yes' ? basePrice * 0.30 : 0;
    const calculatedDailyPrice = basePrice + driverFee;

    const handleBooking = async () => {
        if (!user) {
            toast.error('Please log in to book this car!');
            router.push('/login');
            return;
        }

        if (!bookingDate) {
            toast.error('Please select a departure date!');
            return;
        }

        const combinedDateTime = new Date(`${bookingDate} ${bookingHour}`);

        const bookingData = {
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            userImage: user?.image || "",
            carId: _id,
            carName,
            price: calculatedDailyPrice,
            imageUrl,
            pickupLocation,
            departureDateTime: combinedDateTime,
            hasDriver: needDriver === 'yes'
        };

        try {
            const { data: tokenData } = await authClient.token()
            console.log(tokenData)

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingData)
            });

            const contentType = res.headers.get("content-type");
            if (!res.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to complete booking.');
                } else {
                    const errorText = await res.text();
                    console.error("Server HTML Error Response:", errorText);
                    throw new Error('Server returned an invalid HTML error response.');
                }
            }

            const data = await res.json();
            toast.success(`Successfully booked ${carName} for ${bookingHour}!`);
            router.push('/my-bookings');

        } catch (error) {
            console.error('Booking Error Details:', error);
            toast.error(error.message || 'Something went wrong with the fleet gateway!');
        }
    };

    const hoursArray = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
        "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
        "11:00 PM", "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM",
        "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM"
    ];

    return (
        <div className="w-full max-w-sm p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Daily Rental</span>
                <div className="text-right">
                    <span className="text-3xl font-extrabold text-slate-800">${dailyPrice}</span>
                    <span className="text-slate-400 text-sm font-medium"> / day</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 pl-1">
                        <LuCalendarDays className="text-cyan-500 text-sm" /> Departure Date
                    </label>
                    <div className="rounded-xl border border-slate-200 shadow-inner bg-slate-50/50 p-3 flex items-center justify-between focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all">
                        <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="text-slate-800 font-semibold text-sm outline-none w-full bg-transparent cursor-pointer uppercase"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 pl-1">
                        <LuClock className="text-cyan-500 text-sm" /> Pickup Hour
                    </label>
                    <div className="rounded-xl border border-slate-200 shadow-inner bg-slate-50/50 p-3 flex items-center justify-between focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all">
                        <select
                            value={bookingHour}
                            onChange={(e) => setBookingHour(e.target.value)}
                            className="text-slate-800 font-semibold text-sm outline-none w-full bg-transparent cursor-pointer max-h-[180px] overflow-y-auto"
                            size="1"
                        >
                            {hoursArray.map((hour, index) => (
                                <option key={index} value={hour} className="text-slate-800 font-medium bg-white py-1.5">
                                    {hour}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 pl-1">
                        <LuUserCheck className="text-cyan-500 text-sm" /> Need Professional Driver
                    </label>
                    <div className="rounded-xl border border-slate-200 shadow-inner bg-slate-50/50 p-3 flex items-center justify-between focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all">
                        <select
                            value={needDriver}
                            onChange={(e) => setNeedDriver(e.target.value)}
                            className="text-slate-800 font-bold text-sm outline-none w-full bg-transparent cursor-pointer"
                        >
                            <option value="no" className="text-slate-800 font-medium bg-white">No, I will drive ($0.00)</option>
                            <option value="yes" className="text-slate-800 font-medium bg-white">Yes, need professional driver (+30% Fee)</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="pt-2">
                <button
                    onClick={handleBooking}
                    className="w-full font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-cyan-100 flex items-center justify-center gap-2"
                >
                    Confirm Booking <span>→</span>
                </button>
            </div>

            <div className="pt-4 space-y-2 text-xs font-semibold text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <LuCheck className="text-emerald-500 text-sm stroke-[3]" /> Fixed hourly scheduling (No minutes)
                </div>
                <div className="flex items-center gap-2">
                    <LuCheck className="text-emerald-500 text-sm stroke-[3]" /> DriveFleet damage protection included
                </div>
            </div>
        </div>
    );
};

export default BookingCard;