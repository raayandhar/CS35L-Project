import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/reducers/userReducer';
import { useSnackbar } from 'notistack';

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [showCanvas, setShowCanvas] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {

            return res.json();
        })
        .then((res) => {
            if (!res.success) {
                enqueueSnackbar(res.message, { variant: 'error', autoHideDuration: 3000 });
            }
            else{
                enqueueSnackbar('Login Successful', { variant: 'success', autoHideDuration: 3000 });
                dispatch(setUser({ userID: 1, username: username }));
                setShowCanvas(false);
            }
        })
        .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
        });
    };

    const handleSignup = () => {
        // Implement signup logic here
        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error', autoHideDuration: 3000 });
            return;
        }
        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.status!==200) {
                enqueueSnackbar(res.message, { variant: 'error', autoHideDuration: 3000 });
            }
            else{

                enqueueSnackbar('Signup Successful', { variant: 'success', autoHideDuration: 3000 });
                dispatch(setUser({ userID: 1, username: username }));
                setShowCanvas(false);
            }
        })
        .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
        });
    };

    const handleLogout = () => {
        dispatch(clearUser());
        enqueueSnackbar('Logged out successfully', { variant: 'success', autoHideDuration: 3000 });
    };

    const toggleCanvas = () => {
        setShowCanvas((prev) => !prev);
        switchToLogin();
    };

    const switchToSignup = () => {
        setIsLogin(false);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    const switchToLogin = () => {
        setIsLogin(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
            <button
                className="bg-white text-stone-600 border-2 border-stone-600 h-full w-auto py-2 px-4 rounded-xl hover:bg-stone-600 hover:text-white transition duration-200 mr-4"
                onClick={
                    user ? handleLogout : toggleCanvas
                }
            >
                {user ? 'Logout' : 'Login'}
            </button>

            {showCanvas && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
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
                            className="border border-gray-300 p-2 mb-2 w-full"
                        />
                        {!isLogin && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />
                        )}
                        <button
                            onClick={isLogin ? handleLogin : handleSignup}
                            className="bg-stone-600 text-white py-2 px-4 rounded-xl hover:bg-stone-700 transition duration-200"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                        <button
                            onClick={toggleCanvas}
                            className="ml-2 text-stone-600"
                        >
                            Cancel
                        </button>
                        <p className="mt-4">
                            {isLogin ? (
                                <span>
                                    Don't have an account?{' '}
                                    <button onClick={switchToSignup} className="text-stone-600 underline">
                                        Sign Up
                                    </button>
                                </span>
                            ) : (
                                <span>
                                    Already have an account?{' '}
                                    <button onClick={switchToLogin} className="text-stone-600 underline">
                                        Login
                                    </button>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;