import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuChevronLeft, LuCheck } from 'react-icons/lu';
import { FaStar, FaRegCalendar } from 'react-icons/fa';
import { EditModal } from '@/components/EditModal';
import { DeleteCard } from '@/components/DeleteCard';
import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const token = await auth.api.getToken({
        headers: await headers()
    });

    // console.log('Auth Token:', token); // Debugging line to check the token value

    // Fetch data from backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token?.token || ''}` // Include the token in the Authorization header
            },
        }
    );

    if (!res.ok) {
        return <div className="p-8 text-center text-red-500 font-medium">Failed to load destination details.</div>;
    }

    const destination = await res.json();

    // Destructuring backend fields with screenshot fallbacks
    const {
        destinationName = 'Bali Paradise',
        country = 'Indonesia',
        imageUrl = 'https://cdn.pixabay.com/photo/2020/03/24/20/53/norway-4965490_1280.jpg',
        duration = '7 Days / 6 Nights',
        price = 1299,
        description = 'Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.',
        departureDate = '2026-05-15'
    } = destination;

    // Static highlights matching screenshot layout
    const highlights = [
        "Luxury beachfront accommodation",
        "Traditional Balinese spa treatment",
        "Sunrise trek to Mount Batur",
        "Visit Uluwatu Temple at sunset",
        "Private beach dinner experience"
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 font-sans antialiased text-gray-800">
            {/* Top Navigation & Action Buttons Bar */}
            <div className="flex items-center justify-between mb-4">
                <Link href="/destinations" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition">
                    <LuChevronLeft className="text-lg" /> Back to Destinations
                </Link>

                <div className="flex items-center gap-3 text-sm font-semibold" suppressHydrationWarning>

                    <EditModal destination={destination} />
                    <DeleteCard destination={destination} />
                </div>
            </div>

            {/* Banner Image Container */}
            <div className="relative w-full h-[380px] rounded-xl overflow-hidden mb-8 shadow-sm">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Main Content Splitting: Details vs Booking Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start suppressHydrationWarning">

                {/* Left Columns: Text Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Location Badge */}
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 tracking-wider uppercase">
                        <LuMapPin className="text-sm text-gray-500" /> {country}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{destinationName}</h1>

                    {/* Rating & Duration Info Sub-bar */}
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-green-600 text-xs" />
                            <span className="font-bold text-gray-900">4.9</span>
                            <span className="text-gray-400 text-xs">(234 reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <FaRegCalendar className="text-base" />
                            <span>{duration}</span>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="pt-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Overview</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                    </div>

                    {/* Highlights Section */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Highlights</h3>
                        <p className="text-gray-600 leading-relaxed text-sm mb-4">{description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <LuCheck className="text-xs stroke-[3]" />
                                    </span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Booking Box */}
                <BookingCard destination={destination} />

            </div>
        </div>
    );
};

export default DestinationDetailsPage;