import React from 'react';
import { useAuth } from '../../context/Authcontext';

const ProfileDropDown = () => {
    const { logout } = useAuth();

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
            <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileDropDown;
