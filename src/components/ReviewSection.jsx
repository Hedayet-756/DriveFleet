import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewSection = () => {
    const reviewsData = [
        {
            id: 1,
            userName: "Hedayet Ullah",
            userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            rating: 5,
            comment: "Absolutely incredible experience! The fleet condition was immaculate and the pickup process was seamless. Highly recommended for premium car seekers.",
            carModel: "Tesla Model S Plaid"
        },
        {
            id: 2,
            userName: "Sarah Jenkins",
            userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rating: 5,
            comment: "Renting the Mustang GT for our weekend getaway was the best decision ever! The exhaust sound was pure heaven and the customer service was top-notch.",
            carModel: "Ford Mustang GT"
        },
        {
            id: 3,
            userName: "Arif Rahman",
            userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            rating: 4,
            comment: "Very professional service. The Audi R8 was delivered exactly on time at the airport terminal. Will definitely rent again from DriveFleet on my next trip.",
            carModel: "Audi R8 Coupe"
        }
    ];

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-16">
            <div className="text-center space-y-2 mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    What Our <span className="text-[#1ca0bc]">Renters Say</span>
                </h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
                    Discover firsthand experiences from our premium drivers around the world.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {reviewsData.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;