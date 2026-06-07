'use client';

import Image from 'next/image';
import { LuMapPin as MapIcon } from 'react-icons/lu';
import { MdOutlineAirlineSeatReclineExtra, MdOutlineLocalGasStation } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CarsCard = ({ car, index = 0 }) => {
    const {
        _id,
        imageUrl,
        carName = 'Toyota Camry',
        dailyPrice = 50,
        carType = 'Sedan',
        seatCapacity = 4,
        pickupLocation = 'Dhaka',
        availability = 'Available',
        description = 'Experience premium luxury and rugged power.',
    } = car || {};

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                delay: index * 0.1,
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.08)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="max-w-[360px] w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg group cursor-pointer"
        >

            <div className="relative h-[220px] w-full bg-gray-50 overflow-hidden">
                <motion.div
                    className="absolute inset-0 p-3"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <Image
                        src={imageUrl}
                        alt={carName}
                        fill
                        className="object-cover rounded-md shadow-sm"
                    />
                </motion.div>

                <div className={`absolute bottom-6 right-6 text-xs font-semibold px-3 py-1 rounded-full text-white z-10 ${availability.toLowerCase() === 'available' ? 'bg-black/70 backdrop-blur-sm' : 'bg-red-500/80 backdrop-blur-sm'
                    }`}>
                    {availability === 'Available' ? 'Available Now' : availability}
                </div>
            </div>


            <div className="px-6 pb-6 pt-2 space-y-4">


                <h2 className="text-xl font-bold tracking-tight text-cyan-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                    {carName}
                </h2>

                <div className="grid grid-cols-3 border-y border-gray-100 py-3 text-center text-xs font-semibold text-gray-400 tracking-wider">
                    <div className="flex flex-col items-center gap-1 border-r border-gray-100 justify-center">
                        <span className="text-gray-800 font-bold">{seatCapacity} SEATER</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-r border-gray-100 justify-center">
                        <span className="text-cyan-600 font-extrabold text-[13px]">PRICE: <br /> ${dailyPrice}/DAY</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 justify-center">
                        <span className="text-gray-800 font-bold uppercase">{carType} TYPE</span>
                    </div>
                </div>


                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 min-h-[40px]">
                    {description}
                </p>
                <div className="flex items-center justify-between text-gray-600 text-sm border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1 text-gray-500 font-medium">
                        <MapIcon className="text-cyan-500 text-base" />
                        <span className="text-xs">{pickupLocation}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 text-lg">
                        <MdOutlineAirlineSeatReclineExtra title="Seats" className="hover:text-cyan-500 transition-colors" />
                        <MdOutlineLocalGasStation title="Fuel" className="hover:text-cyan-500 transition-colors" />
                        <IoCarSportOutline title="Drive" className="hover:text-cyan-500 transition-colors" />
                    </div>
                </div>


                <div className="pt-2">
                    <Link href={`/destinations/${_id}`} className="block">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#22d3ee" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-cyan-400 text-cyan-950 font-bold py-3 px-4 rounded-xl shadow-md shadow-cyan-100 cursor-pointer text-center text-sm"
                        >
                            Rent Now
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarsCard;