import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/reducers/userReducer';

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [showCanvas, setShowCanvas] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // change to DB later
        dispatch(setUser({ userID: '1', username : 'Kylecl21'}));
        setShowCanvas(false);
    };

    const handleLogout = () => {
        dispatch(clearUser());
    };

    const toggleCanvas = () => {
        setShowCanvas((prev) => !prev);
    };

    return (
        <>
            <button
                className="bg-white text-stone-600 border-2 border-stone-600 h-full w-auto py-2 px-4 rounded-xl hover:bg-stone-600 hover:text-white transition duration-200 mr-4"
                onClick={user ? handleLogout : toggleCanvas}
            >
                {user ? 'Logout' : 'Login'}
            </button>

            {showCanvas && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Login</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 p-2 mb-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-stone-600 text-white py-2 px-4 rounded-xl hover:bg-stone-700 transition duration-200"
                        >
                            Submit
                        </button>
                        <button
                            onClick={toggleCanvas}
                            className="ml-2 text-stone-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
