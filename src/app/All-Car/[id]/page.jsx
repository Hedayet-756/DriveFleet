import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuChevronLeft, LuCheck, LuInfo } from 'react-icons/lu';
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';
import { EditModal } from '@/components/EditModal';
import { DeleteCard } from '@/components/DeleteCard';
import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    // console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addcar/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Failed to load car details.
            </div>
        );
    }

    const carData = await res.json();

    const {
        carName = 'Toyota Camry 2024',
        carType = 'Sedan',
        imageUrl = 'https://cdn.pixabay.com/photo/2020/03/24/20/53/norway-4965490_1280.jpg',
        seatCapacity = 5,
        pickupLocation = 'Dhaka, Bangladesh',
        availability = 'Available',
        description = 'Experience premier luxury, ultimate comfort, and top-tier fuel efficiency. Perfect for corporate travels, weddings, and family weekend getaways.'
    } = carData || {};

    const carFeatures = [
        "Fully Air Conditioned (AC)",
        "Premium Sound System & Bluetooth",
        "GPS Navigation Enabled",
        "Well Maintained & Sanitized",
        "Comprehensive Car Insurance Cover"
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans antialiased text-gray-800">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Link href="/All-Car" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-cyan-600 transition">
                    <LuChevronLeft className="text-lg" /> Back to All Cars
                </Link>

                <div className="flex items-center gap-3 text-sm font-semibold">
                    <EditModal carData={carData} />
                    <DeleteCard carData={carData} />
                </div>
            </div>

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

            <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-8 shadow-md border border-gray-100 bg-gray-50">
                <Image
                    src={imageUrl}
                    alt={carName}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-2 space-y-8">

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

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <LuInfo className="text-cyan-500" /> Description Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                            {description}
                        </p>
                    </div>

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

                <BookingCard carData={carData} />

            </div>
        </div>
    );
};

export default CarDetailsPage;