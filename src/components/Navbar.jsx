import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="w-full bg-white text-cyan-600 shadow-md py-4 mb-6">
            <nav className="flex items-center justify-between w-10/12 mx-auto">
                <ul className='flex gap-3'>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/destinations">Destinations</Link></li>
                    <li><Link href="/my-bookings">My Bookings</Link></li>
                    <li><Link href="/add-destination">Add Destination</Link></li>
                </ul>
                <div>
                    <Image src="/assets/DriveFleet.png" alt="Logo" width={120} height={80} />
                </div>
                <ul className='flex gap-3 items-center'>
                    <li><Link href="/profile">Profile</Link></li>
                    {/* {user ? <>
                        <Avatar>
                            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                            <Avatar.Fallback className='sm:text-2xl text-5xl font-extrabold text-pink-950 mt-1'>{user?.name.charAt(0)}</Avatar.Fallback>
                        </Avatar>
                        <li><Button onClick={handleLogout} size='sm' variant='danger' className={'rounded-md'}>Logout</Button></li>
                    </> :
                        <>
                            <li><Link href="/login">Login</Link></li>
                            <li><Link href="/SignUp">Sign up</Link></li>
                        </>
                    } */}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;



// import React, { useState } from 'react';
// import {
//   Navbar as HeroNavbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   Button,
//   Avatar
// } from '@heroui/react';
// import Image from 'next/image';
// import Link from 'next/link';

// const Navbar = () => {
//   // মোবাইল মেনু ওপেন/ক্লোজ স্টেট
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // আপনার ইউজার স্টেট (টেস্টিং বা ফিউচার ইউজের জন্য কমেন্ট আউট করে রাখা হলো)
//   // const user = null;

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Destinations", path: "/destinations" },
//     { name: "My Bookings", path: "/my-bookings" },
//     { name: "Add Destination", path: "/add-destination" },
//     { name: "Profile", path: "/profile" },
//   ];

//   return (
//     <HeroNavbar
//       isMenuOpen={isMenuOpen}
//       onMenuOpenChange={setIsMenuOpen}
//       className="w-full bg-white text-cyan-600 shadow-md py-2 mb-6"
//       maxWidth="xl"
//     >
//       {/* ১. মোবাইল ভিউ এর জন্য মেনু টগল বাটন (ডেস্কটপে অটোমেটিক হিডেন থাকবে) */}
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
//       </NavbarContent>

//       {/* ২. লোগো এরিয়া (মোবাইলে লোগোতে ক্লিক করলে মেনু টগল হবে) */}
//       <NavbarContent justify="center" className="sm:justify-start">
//         <NavbarBrand>
//           <div
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="cursor-pointer active:scale-95 transition-transform sm:pointer-events-none"
//             title="Click to toggle menu on mobile"
//           >
//             <Image src="/assets/DriveFleet.png" alt="Logo" width={120} height={80} priority />
//           </div>
//         </NavbarBrand>
//       </NavbarContent>

//       {/* ৩. ডেস্কটপ ভিউ এর জন্য বামপাশের লিংকগুলো (মোবাইলে হিডেন থাকবে) */}
//       <NavbarContent className="hidden sm:flex gap-6" justify="start">
//         {menuItems.slice(0, 4).map((item, index) => (
//           <NavbarItem key={index}>
//             <Link href={item.path} className="hover:text-cyan-500 font-medium transition-colors">
//               {item.name}
//             </Link>
//           </NavbarItem>
//         ))}
//       </NavbarContent>

//       {/* ৪. ডানপাশের প্রোফাইল / লগইন এরিয়া (ডেস্কটপ ভিউ) */}
//       <NavbarContent justify="end" className="hidden sm:flex gap-4">
//         <NavbarItem>
//           <Link href="/profile" className="hover:text-cyan-500 font-medium transition-colors">
//             Profile
//           </Link>
//         </NavbarItem>

//         {/* ফিউচার লগইন কোড লজিক এখানে রাখতে পারেন: */}
//         {/* {user ? (
//           <>
//             <Avatar src={user?.image} name={user?.name?.charAt(0)} size="sm" />
//             <Button size="sm" color="danger" variant="flat">Logout</Button>
//           </>
//         ) : (
//           <>
//             <NavbarItem><Link href="/login" className="hover:text-cyan-500">Login</Link></NavbarItem>
//             <NavbarItem><Button as={Link} href="/SignUp" size="sm" color="primary">Sign up</Button></NavbarItem>
//           </>
//         )} */}
//       </NavbarContent>

//       {/* ৫. 📱 মোবাইল ড্রয়ার মেনু (লোগো বা হ্যামবার্গারে ক্লিক করলে বামপাশ/উপর থেকে স্লাইড হয়ে আসবে) */}
//       <NavbarMenu className="bg-white/95 backdrop-blur-md pt-6 pl-8">
//         {menuItems.map((item, index) => (
//           <NavbarMenuItem key={index}>
//             <Link
//               href={item.path}
//               className="w-full text-cyan-600 block py-2 text-lg font-medium hover:text-cyan-400 active:text-cyan-700"
//               onClick={() => setIsMenuOpen(false)} // লিংকে ক্লিক করলে মেনু অটোমেটিক বন্ধ হয়ে যাবে
//             >
//               {item.name}
//             </Link>
//           </NavbarMenuItem>
//         ))}

//         {/* মোবাইলের জন্য লগইন/সাইনআপ অপশন (কমেন্ট করা লজিক) */}
//         {/* <div className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-4">
//           <Link href="/login" className="text-lg py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
//           <Button as={Link} href="/SignUp" color="primary" className="w-full mt-2" onClick={() => setIsMenuOpen(false)}>Sign Up</Button>
//         </div> */}
//       </NavbarMenu>
//     </HeroNavbar>
//   );
// };

// export default Navbar;