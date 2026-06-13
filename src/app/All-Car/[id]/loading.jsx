import React from 'react';

const CarDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 max-w-7xl mx-auto space-y-8 animate-pulse">

      {/* 🔗 ব্রেডক্রাম্ব স্কেলেটন (Top Breadcrumb) */}
      <div className="h-4 bg-slate-200 rounded-md w-48 mb-4"></div>

      {/* 🧱 মেন কন্টেন্ট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 🏎️ বাম পাশের কলাম: ইমেজ এবং গ্যালারি স্কেলেটন (২ ভাগ জায়গা নেবে) */}
        <div className="lg:col-span-2 space-y-6">
          {/* মেইন বড় ইমেজ */}
          <div className="w-full h-[300px] md:h-[460px] bg-slate-200 rounded-3xl shadow-inner"></div>

          {/* থাম্বনেইল ইমেজ গ্যালারি (যদি থাকে) */}
          <div className="flex gap-4">
            <div className="w-24 h-16 bg-slate-200 rounded-xl"></div>
            <div className="w-24 h-16 bg-slate-200 rounded-xl"></div>
            <div className="w-24 h-16 bg-slate-200 rounded-xl"></div>
          </div>

          {/* গাড়ির ডেসক্রিপশন বক্স স্কেলেটন */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
            </div>
          </div>

          {/* গাড়ির ফিচার বা স্পেসিফিকেশন গ্রিড */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center gap-2">
                <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                <div className="h-3 bg-slate-200 rounded-md w-12"></div>
                <div className="h-4 bg-slate-200 rounded-md w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 💰 ডান পাশের কলাম: বুকিং কার্ড স্কেলেটন (১ ভাগ জায়গা নেবে) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">

            {/* প্রাইস সেকশন */}
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div className="h-4 bg-slate-200 rounded-md w-20"></div>
              <div className="h-8 bg-slate-200 rounded-md w-28"></div>
            </div>

            {/* ইনপুট ফিল্ডস (ডেট, টাইম, ড্রাইভার অপশন) */}
            <div className="space-y-4">
              {[1, 2, 3].map((input) => (
                <div key={input} className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded-md w-24"></div>
                  <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
                </div>
              ))}
            </div>

            {/* কনফার্ম বুকিং বাটন */}
            <div className="h-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-full mt-4"></div>

            {/* ছোট চেকলিস্ট মেসেজ */}
            <div className="space-y-2 pt-2 border-t border-slate-50">
              <div className="h-3 bg-slate-200 rounded-md w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded-md w-2/3"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CarDetailsLoading;