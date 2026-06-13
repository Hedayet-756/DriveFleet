'use client';
import { Separator, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
    const images = [
        "/assets/Banner-1.jpg",
        "/assets/Banner-2.jpg",
        "/assets/Banner-3.jpg",
        '/assets/Banner-5.jpeg',
        "/assets/Banner-4.jpg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(timer);
    }, [images.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        },
    };

    const buttonHover = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(6, 182, 212, 0.7)",
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="text-white flex justify-between flex-col items-center gap-5 h-150 relative w-full overflow-hidden">

            {images.map((img, index) => (
                <div
                    key={index}
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url('${img}')`,
                        opacity: index === currentImageIndex ? 1 : 0,
                        zIndex: index === currentImageIndex ? 1 : 0,
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none z-10" />

            <motion.div
                className="p-2 md:p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1 mt-24 z-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 className="text-xl md:text-7xl font-bold text-cyan-400" variants={itemVariants}>
                    Make your <br /> Dreams Come True
                </motion.h1>

                <motion.p className="text-sm md:text-2xl text-white max-w-3xl drop-shadow-md" variants={itemVariants}>
                    Rent the perfect ride, explore breathtaking destinations, and create
                    unforgettable memories with our premium fleet.
                </motion.p>

                <Link href="/All-Car" className="flex gap-5">
                    <motion.div variants={buttonHover} whileHover="hover">
                        <Button size="lg" className="bg-cyan-500 text-white font-semibold rounded-none cursor-pointer px-6 py-1.5 md:py-3">
                            Explore Now
                        </Button>
                    </motion.div>
                </Link>
            </motion.div>
            <div className="bg-white/10 backdrop-blur-md flex justify-between gap-5 w-full items-center z-20 border-t border-white/10">
                <div className="px-3 py-2">
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="text-xs text-gray-200">Address, City or Zip</p>
                </div>
                <Separator variant="tertiary" orientation="vertical" />
                <div className="py-2">
                    <h3 className="text-sm font-medium">Date/Duration</h3>
                    <p className="text-xs text-gray-200">Anytime/24/7</p>
                </div>
                <Separator variant="tertiary" orientation="vertical" />
                <div className="py-2">
                    <h3 className="text-sm font-medium">Budget</h3>
                    <p className="text-xs text-gray-200">$50-$500</p>
                </div>
                <Separator variant="tertiary" orientation="vertical" />
                <div className="py-2">
                    <h3 className="text-sm font-medium">People</h3>
                    <p className="text-xs text-gray-200">3-10</p>
                </div>
                <div className="bg-cyan-500 py-5 px-8 cursor-pointer hover:bg-cyan-600 transition-colors self-stretch flex items-center">
                    <h3 className="font-semibold">Search</h3>
                </div>
            </div>
        </div>
    );
};

export default Banner;