'use client';
// import { Avatar, Button } from '@heroui/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// const Navbar = () => {
//     return (
//         <div className="w-full bg-white text-cyan-600 shadow-md py-4 mb-6">
//             <nav className="flex items-center justify-between w-10/12 mx-auto">
//                 <ul className='flex gap-3'>
//                     <li><Link href="/">Home</Link></li>
//                     <li><Link href="/All-Car">All Car</Link></li>
//                     <li><Link href="/my-bookings">My Bookings</Link></li>
//                     <li><Link href="/Add-Car">Add Car</Link></li>
//                 </ul>
//                 <div>
//                     <Image src="/assets/DriveFleet.png" alt="Logo" width={120} height={80} />
//                 </div>
//                 <ul className='flex gap-3 items-center'>
//                     <li><Link href="/profile">Profile</Link></li>
//                     { {user ? <>
//                         <Avatar>
//                             <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
//                             <Avatar.Fallback className='sm:text-2xl text-5xl font-extrabold text-pink-950 mt-1'>{user?.name.charAt(0)}</Avatar.Fallback>
//                         </Avatar>
//                         <li><Button onClick={handleLogout} size='sm' variant='danger' className={'rounded-md'}>Logout</Button></li>
//                     </> :
//                         <>
//                             <li><Link href="/login">Login</Link></li>
//                             <li><Link href="/SignUp">Sign up</Link></li>
//                         </>
//                     }
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'All Car', path: '/All-Car' },
        { name: 'My Bookings', path: '/my-bookings' },
        { name: 'Add Car', path: '/Add-Car' },
    ];

    // dropdown এর বাইরে click করলে বন্ধ হবে
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        toast.success('Logged out successfully');
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-100 mb-6">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/assets/DriveFleet.png"
                        alt="DriveFleet Logo"
                        width={130} height={50}
                        className="object-contain"
                    />
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden sm:flex gap-6">
                    {menuItems.map((item, i) => (
                        <li key={i}>
                            <Link href={item.path}
                                className="text-gray-600 font-medium hover:text-cyan-500 
                                           transition-colors text-sm">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {user ? (
                        /* Profile dropdown */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg
                                           hover:bg-gray-100 transition-colors"
                            >
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 
                                                border-cyan-400 flex items-center justify-center 
                                                text-2xl font-extrabold text-cyan-800 flex-shrink-0">
                                    {user?.image
                                        ? <img src={user.image} alt={user.name}
                                            className="w-full h-full rounded-full object-cover" />
                                        : user?.name?.charAt(0).toUpperCase()
                                    }
                                </div>
                                <span className="hidden md:inline text-sm font-medium text-gray-700">
                                    {user?.name?.split(' ')[0]}
                                </span>
                                {/* Chevron */}
                                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200
                                                 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white 
                                                rounded-xl border border-gray-200 shadow-lg 
                                                overflow-hidden z-50">

                                    {/* User info header */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-cyan-100 border-2 
                                                            border-cyan-400 flex items-center justify-center 
                                                            text-sm font-bold text-cyan-800 flex-shrink-0">
                                                {user?.image
                                                    ? <img src={user.image} alt={user.name}
                                                        className="w-full h-full rounded-full object-cover" />
                                                    : user?.name?.charAt(0).toUpperCase()
                                                }
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {user?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Edit profile */}
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm 
                                                   text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 
                                                14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Edit profile
                                    </Link>

                                    <div className="border-t border-gray-100" />

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm 
                                                   text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 
                                                4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 
                                                3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Not logged in */
                        <>
                            <Link href="/login"
                                className="text-gray-600 font-medium hover:text-cyan-500 text-sm">
                                Login
                            </Link>
                            <Link href="/sign-up"
                                className="bg-cyan-500 text-white text-sm font-semibold 
                                           px-4 py-1.5 rounded-xl hover:bg-cyan-600 shadow-sm">
                                Sign up
                            </Link>
                        </>
                    )}

                    {/* Hamburger */}
                    <button className="sm:hidden text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100 px-6 pt-4 pb-6">
                    <ul className="flex flex-col gap-3">
                        {menuItems.map((item, i) => (
                            <li key={i}>
                                <Link href={item.path}
                                    className="text-cyan-600 text-lg font-medium 
                                               hover:text-cyan-400 block py-1"
                                    onClick={() => setIsMenuOpen(false)}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                            <Link href="/profile"
                                className="text-gray-700 text-base py-1"
                                onClick={() => setIsMenuOpen(false)}>
                                Edit profile
                            </Link>
                            <button onClick={handleLogout}
                                className="text-red-600 text-base py-1 text-left">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavbarComponent;
