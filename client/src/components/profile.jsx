import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './profile.css'
import './home.css'
import NavButton from './navbutton.jsx';

const Profile = () => {
    const dispatch = useDispatch();
    const [navBarOpen, setNavBarOpen] = useState(false);
    const user = useSelector((state) => state.user.user); 
    if (!user) {
        return (
            <div className="profile-div" data-nav={navBarOpen.toString()}>   
            <main
                className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center custom-main1">
                <h1 className="font-roboto text-white m-0 font-medium uppercase text-4xl sm:text-5xl lg:text-6xl xl:text-4xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto text-shadow text-center">
                Please Login
                </h1>
                </main>
                <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen}/>
            </div>
        );
    }
    return (
            <div className="profile-div" data-nav={navBarOpen.toString()}>
                <main className="justify-center text-center mt-20 custom-main2">
                    {/* Example of how redux store can be used */}
                    <h1>Profile for {user.username}</h1>
                </main>
                <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen}/>
            </div>
    );
}
export default Profile;