import React from 'react';
import { LuStar, LuQuote, LuBadgeCheck } from 'react-icons/lu';

const ReviewCard = ({ review }) => {
    const {
        userName = "Anonymous Driver",
        userImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        rating = 5,
        comment = "Absolutely incredible experience! The fleet condition was immaculate and the pickup process was seamless. Highly recommended for premium car seekers.",
        carModel = "Tesla Model S Plaid"
    } = review || {};

    return (
        <div className="w-full max-w-md p-6 bg-white border border-slate-100 rounded-[22px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 relative group overflow-hidden">

            {/* 💬 ব্যাকগ্রাউন্ড কোটেশন আইকন */}
            <div className="absolute -top-2 -right-2 text-slate-100/70 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                <LuQuote size={90} className="transform rotate-180" />
            </div>

            <div className="space-y-3.5 relative z-10">
                {/* ⭐ রেটিং স্টারস সেকশন */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                        <LuStar
                            key={index}
                            className={`text-sm ${index < rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                                }`}
                        />
                    ))}
                </div>

                {/* 📝 কাস্টমার রিভিউ কমেন্ট */}
                <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-4 italic">
                    "{comment}"
                </p>
            </div>

            {/* 👤 কাস্টমার প্রোফাইল ইনফো */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 relative z-10">
                <div className="flex items-center gap-3">
                    {/* কাস্টমার ইমেজ */}
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-100 bg-slate-100 flex-shrink-0">
                        <img
                            src={userImage}
                            alt={userName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* নাম ও ভেরিফাইড স্ট্যাটাস */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                            {userName}
                            {/* 🎯 এখানে ভেরিফাইড ব্যাজের জন্য LuBadgeCheck ব্যবহার করা হয়েছে */}
                            <LuBadgeCheck className="text-[#1ca0bc] text-base fill-cyan-50" title="Verified Renter" />
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                            Rented: <span className="text-slate-500 font-semibold">{carModel}</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ReviewCard;