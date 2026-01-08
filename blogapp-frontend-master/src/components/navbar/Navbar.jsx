// import React from 'react'
// import { Link } from 'react-router-dom';
// import ikarusLogo from '../../assets/ikarus-delta.png';
// export default function Blogs() {
//   return (
//     <div className= "p-4 bg-gray-100 flex justify-between items-center">

//       <div className="ml-4">
//         <img src={ikarusLogo} alt="Ikarus logo" width="150" />
//       </div>

//       <div className="ml-4">
//         <button className="mr-5  text-blue px-4 py-2 rounded">Blog</button>
//         <button className="mr-10  text-[#CF462A] px-4 py-2 rounded">About</button>
//         <button className="mr-5 bg-[#CF462A] text-white px-8 py-2 rounded">Signup</button>
//      <button className="border border-red-400 bg-white text-red px-8 py-2 rounded ">Login</button></div>

//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ikarusLogo from '../../assets/ikarus-delta.png';
import { useAuth } from '../../context/Authcontext';
import ProfileDropDown from './ProfileDropDown';
import SearchOverlay from './SearchOverlay';
import { Search } from 'lucide-react';

export default function Navbar() {
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const apiHost = import.meta.env.VITE_API_HOST;

    const imageUrl = user?.prof_image_url ? `${apiHost}${user.prof_image_url}` : `https://www.gravatar.com/avatar/`;

    return (
        <div className="p-4 bg-gray-100 flex justify-between items-center relative z-20">
            <div className="ml-4">
                <Link to="/">
                    <img src={ikarusLogo} alt="Ikarus logo" width="150" />
                </Link>
            </div>

            <div className="flex items-center">
                <Link to="/blog" className="mr-5 text-blue px-4 py-2 rounded">Blog</Link>
                <Link to="/about" className="mr-10 text-[#CF462A] px-4 py-2 rounded">About</Link>

                {user ? (
                    <>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="mr-5 text-gray-600 hover:text-gray-900"
                        >
                            <Search size={24} />
                        </button>
                        <Link to="/editor">
                            <button className="mr-5 bg-[#CF462A] text-white px-4 py-2 rounded hover:bg-[#CF462A]/80 cursor-pointer flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Add Blog
                            </button>
                        </Link>
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                                <img src={imageUrl} alt="User profile" className="w-full h-full object-cover" />
                            </button>
                            {dropdownOpen && <ProfileDropDown />}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/signup"><button className="mr-5 bg-[#CF462A] text-white px-8 py-2 rounded hover:bg-[#CF462A]/80 cursor-pointer">Signup</button></Link>
                        <Link to="/login" ><button className="border border-red-400 bg-white text-red px-8 py-2 rounded hover:bg-red-50 cursor-pointer">Login</button></Link>
                    </>
                )}
            </div>
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start pt-20" onClick={() => setIsSearchOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
                        <SearchOverlay closeSearch={() => setIsSearchOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}