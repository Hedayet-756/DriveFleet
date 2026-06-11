import React from 'react';
import Link from 'next/link';
import { LuSend, LuTwitter, LuLinkedin, LuInstagram, LuPhone, LuMail, LuMapPin } from 'react-icons/lu';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 px-6 md:px-16 py-16 relative overflow-hidden border-t border-slate-900">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1ca0bc]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-12 border-b border-slate-900 pb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Drive<span className="text-[#1ca0bc]">Fleet</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-sm md:text-base text-slate-400 font-medium">
                        Your elite gateway to extraordinary supercar rentals and premium travel experiences around the world. Drive the dream today.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    <div className="space-y-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase text-[#1ca0bc]">NEWSLETTER</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                            Subscribe for exclusive supercar drops, flash rental deals, and VIP driving inspiration.
                        </p>

                        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus-within:border-[#1ca0bc] transition-all group">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="bg-transparent outline-none flex-1 text-xs text-white placeholder-slate-500 font-medium"
                            />
                            <button className="text-slate-400 group-focus-within:text-[#1ca0bc] transition-colors cursor-pointer">
                                <LuSend className="text-base" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase">QUICK LINKS</h3>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <Link href="/" className="hover:text-[#1ca0bc] transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/All-Car" className="hover:text-[#1ca0bc] transition-colors">Explore Fleet</Link>
                            </li>
                            <li>
                                <Link href="/my-bookings" className="hover:text-[#1ca0bc] transition-colors">My Bookings</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase">SUPPORT</h3>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <Link href="#" className="hover:text-[#1ca0bc] transition-colors">Help Center</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#1ca0bc] transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#1ca0bc] transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white text-xs font-bold tracking-widest uppercase">CONTACT US</h3>
                        <ul className="space-y-2.5 text-xs font-medium text-slate-400">
                            <li className="flex items-center gap-2">
                                <LuPhone className="text-[#1ca0bc] text-sm" />
                                <span className="font-semibold">+88 01876 300013</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <LuMail className="text-[#1ca0bc] text-sm" />
                                <span className="font-semibold">support@drivefleet.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <LuMapPin className="text-[#1ca0bc] text-sm flex-shrink-0" />
                                <span>Main Garage Terminal, Hub-01</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-medium">
                        © {new Date().getFullYear()} DriveFleet. All rights reserved.
                    </p>

                    <div className="flex gap-4 text-slate-400">
                        <a href="#" className="hover:text-[#1ca0bc] p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-[#1ca0bc]/30 transition-all">
                            <LuTwitter className="text-sm" />
                        </a>
                        <a href="#" className="hover:text-[#1ca0bc] p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-[#1ca0bc]/30 transition-all">
                            <LuLinkedin className="text-sm" />
                        </a>
                        <a href="#" className="hover:text-[#1ca0bc] p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-[#1ca0bc]/30 transition-all">
                            <LuInstagram className="text-sm" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;