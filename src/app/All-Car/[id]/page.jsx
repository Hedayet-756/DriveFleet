import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuChevronLeft, LuCheck, LuInfo } from 'react-icons/lu';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';
import { Button } from '@heroui/react';

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;

    // ব্যাকএন্ড থেকে কার ডেটা ফেচ করা হচ্ছে
    const res = await fetch(`http://localhost:5000/addcar/${id}`, {
        cache: 'no-store' // রিয়েল-টাইম ডেটা আপডেটের জন্য
    });

    if (!res.ok) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Failed to load car details.
            </div>
        );
    }

    const carData = await res.json();

    // কার রেন্টাল প্রজেক্টের অরিজিনাল ফিল্ডগুলো ডিস্ট্রাকচার করা হলো
    const {
        carName = 'Toyota Camry 2024',
        dailyPrice = 50,
        carType = 'Sedan',
        imageUrl = 'https://cdn.pixabay.com/photo/2020/03/24/20/53/norway-4965490_1280.jpg',
        seatCapacity = 5,
        pickupLocation = 'Dhaka, Bangladesh',
        availability = 'Available',
        description = 'Experience premier luxury, ultimate comfort, and top-tier fuel efficiency. Perfect for corporate travels, weddings, and family weekend getaways.'
    } = carData || {};

    // কার ফিচারের ডাইনামিক হাইলাইটস
    const carFeatures = [
        "Fully Air Conditioned (AC)",
        "Premium Sound System & Bluetooth",
        "GPS Navigation Enabled",
        "Well Maintained & Sanitized",
        "Comprehensive Car Insurance Cover"
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans antialiased text-gray-800">

            {/* ১. টপ নেভিগেশন এবং কন্ট্রোল বাটন বার */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Link href="/All-Car" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-cyan-600 transition">
                    <LuChevronLeft className="text-lg" /> Back to All Cars
                </Link>

                <div className="flex items-center gap-3 text-sm font-semibold">
                    <Button className="bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors shadow-sm cursor-pointer">
                        Edit Car
                    </Button>
                    <Button className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors shadow-sm cursor-pointer">
                        Delete Car
                    </Button>
                </div>
            </div>

            {/* ২. কার টাইটেল এবং স্ট্যাটাস ব্যাজ */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {carType}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${availability.toLowerCase() === 'available' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}>
                        {availability === 'Available' ? 'Available Now' : availability}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    {carName}
                </h1>
            </div>

            {/* ৩. বড় ব্যানার ইমেজ কন্টেইনার */}
            <div className="relative w-full h-[280px] md:h-[450px] rounded-2xl overflow-hidden mb-8 shadow-md border border-gray-100 bg-gray-50">
                <Image
                    src={imageUrl}
                    alt={carName}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* ৪. মেইন কন্টেন্ট লেআউট (Details vs Pricing Column) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* বামপাশের কলাম: টেক্সট ও স্পেসিফিকেশন */}
                <div className="lg:col-span-2 space-y-8">

                    {/* কার কি-স্পেসিফিকেশন গ্রিড */}
                    <div className="grid grid-cols-3 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
                        <div className="flex flex-col items-center justify-center border-r border-gray-200">
                            <MdOutlineAirlineSeatReclineExtra className="text-cyan-500 text-2xl mb-1" />
                            <span className="text-xs text-gray-400 font-medium">Capacity</span>
                            <span className="text-sm font-bold text-gray-800">{seatCapacity} Seater</span>
                        </div>
                        <div className="flex flex-col items-center justify-center border-r border-gray-200">
                            <IoCarSportOutline className="text-cyan-500 text-2xl mb-1" />
                            <span className="text-xs text-gray-400 font-medium">Vehicle Type</span>
                            <span className="text-sm font-bold text-gray-800 uppercase">{carType}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <LuMapPin className="text-cyan-500 text-2xl mb-1" />
                            <span className="text-xs text-gray-400 font-medium">Pickup Location</span>
                            <span className="text-sm font-bold text-gray-800 line-clamp-1 px-1">{pickupLocation}</span>
                        </div>
                    </div>

                    {/* ডেসক্রিপশন সেকশন */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <LuInfo className="text-cyan-500" /> Description Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                            {description}
                        </p>
                    </div>

                    {/* ফিচার বা হাইলাইটস সেকশন */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Car Features & Amenities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {carFeatures.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <LuCheck className="text-xs stroke-[3]" />
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ডানপাশের কলাম: রেন্টাল প্রাইসিং ও বুকিং কার্ড (Sticky) */}
                <div className="lg:sticky lg:top-6 bg-white border border-cyan-100 rounded-3xl p-6 shadow-xl shadow-cyan-50/50 space-y-6">
                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                        <span className="text-gray-500 font-medium text-sm">Daily Rental Rate</span>
                        <div className="text-right">
                            <span className="text-3xl font-extrabold text-cyan-600">${dailyPrice}</span>
                            <span className="text-xs text-gray-400 font-normal"> / Day</span>
                        </div>
                    </div>

                    {/* ইনস্ট্যান্ট ইনফো মেসেজ */}
                    <div className="flex items-start gap-2.5 bg-cyan-50/50 p-3 rounded-xl text-xs text-cyan-900 font-medium leading-relaxed">
                        <FaRegCalendarAlt className="text-cyan-600 text-sm mt-0.5" />
                        <span>Pay directly at pickup time or book instantly to secure availability. No hidden charges.</span>
                    </div>

                    {/* রেন্ট বাটন */}
                    <Button
                        disabled={availability.toLowerCase() !== 'available'}
                        className={`w-full font-bold py-4 px-4 rounded-xl shadow-md transition-all text-center text-sm cursor-pointer ${availability.toLowerCase() === 'available'
                            ? 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-cyan-100'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                            }`}
                    >
                        {availability.toLowerCase() === 'available' ? 'Confirm Booking' : 'Currently Booked'}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default CarDetailsPage;