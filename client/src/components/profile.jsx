import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); 
    if (!user) {
        return (
            <div className="justify-center text-center mt-20">
                <h1>Please Login</h1>
            </div>
        );
    }
    return (
        <div className="justify-center text-center mt-20">
            {/* Example of how redux store can be used */}
            <h1>Profile for {user.username}</h1>
        </div>
    );
}
export default Profile;