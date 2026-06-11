import CarsCard from '@/components/CarsCard';
import React from 'react';

const AllCarsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addcar`);
    const cars = await res.json();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">All Cars</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    cars.map((car, index) => (
                        <CarsCard
                            key={car._id}
                            car={car}
                            index={index}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default AllCarsPage;