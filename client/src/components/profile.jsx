import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './profile.css';
import './home.css';
import NavButton from './navbutton.jsx';
import ProfileContent from './profileContent';

const Profile = () => {
    const { username } = useParams(); // Get the username from the URL
    const [navBarOpen, setNavBarOpen] = useState(false);
    const [externalUser, setExternalUser] = useState(null);
    const user = useSelector((state) => state.user.user); // Access logged-in user

    useEffect(() => {
        if (username) {
            console.log("username: " + username);
            //fetch(`http://127.0.0.1:5000/profile/${username}`)                
            setExternalUser({ id: 1, name: username, friends: [1, 3, 7] });
        }
    }, [username]);

    // Show the profile for the specified username if it exists
    if (username && externalUser) {
        return (
            <div className="profile-div" data-nav={navBarOpen.toString()}>
                <ProfileContent user={externalUser} />
                <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
            </div>
        );
    }

    // Show the logged-in user's profile if no username is specified
    if (!username && (!user || user.id === null)) {
        return (
            <div className="profile-div" data-nav={navBarOpen.toString()}>
                <main
                    className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center custom-main1">
                    <h1 className="font-roboto text-white m-0 font-medium uppercase text-4xl sm:text-5xl lg:text-6xl xl:text-4xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto text-shadow text-center">
                        Please Login
                    </h1>
                </main>
                <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
            </div>
        );
    }

    // Default: Show the logged-in user's profile
    return (
        <div className="profile-div bg-white w-full" data-nav={navBarOpen.toString()}>
            <ProfileContent user={user} />
            <NavButton classname="nav-section" setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
        </div>
    );
};

export default Profile;
