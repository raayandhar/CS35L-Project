import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/reducers/userReducer';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './switchmodes.css'; 
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [showCanvas, setShowCanvas] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && showCanvas) {
                toggleCanvas();
            }
            if (event.key === 'Enter' && showCanvas) {
                if(isLogin){
                    handleLogin();
                }
                else{
                    handleSignup();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showCanvas, isLogin, username, password, confirmPassword]);
    const handleLogin = () => {
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status !== 200) {
                enqueueSnackbar(res.message, { variant: 'error', autoHideDuration: 3000 });
            } else {
                enqueueSnackbar('Login Successful', { variant: 'success', autoHideDuration: 3000 });
                dispatch(setUser({ userID: 1, username }));
                setShowCanvas(false);
            }
        })
        .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
        });
    };

    const handleSignup = () => {
        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error', autoHideDuration: 3000 });
            return;
        }
        if (!username || !password || !confirmPassword) {
            enqueueSnackbar('Please fill in all fields', { variant: 'error', autoHideDuration: 3000 });
            return;
        }
        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status !== 200) {
                enqueueSnackbar(res.message, { variant: 'error', autoHideDuration: 3000 });
            } else {
                enqueueSnackbar('Signup Successful', { variant: 'success', autoHideDuration: 3000 });
                dispatch(setUser({ userID: 1, username }));
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
            <button canvasOn={showCanvas.toString()}
                className="login-button"
                /*onClick={user ? handleLogout : toggleCanvas}*/
                onClick={toggleCanvas}            
            >
                <FontAwesomeIcon className="open" icon={faUser}/>
                <FontAwesomeIcon className="close" icon={faXmark}/>
            </button>
            {showCanvas && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="perspective">
                        <div className={`canvas-container ${isLogin ? '' : 'rotate-y-180'} bg-white`}>
                            <div className="canvas front ">
                                <h2 className="text-lg font-bold mb-4">Login</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border border-gray-300 p-2 mb-2 w-full focus:border-emerald-400 outline-none rounded-md"
                                    />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 p-2 mb-2 w-full focus:border-emerald-400 outline-none rounded-md"
                                />
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={handleLogin}
                                        className="bg-emerald-400 text-white py-2 px-4 rounded-xl hover:bg-emerald-600 transition duration-200"
                                    >
                                    Login
                                    </button>
                                    <button
                                        onClick={toggleCanvas}
                                        className="bg-red-400 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                
                                <p className="mt-4">
                                    Don't have an account?{' '}
                                    <button onClick={switchToSignup} className="text-stone-600 underline">
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                            <div className="canvas back">
                                <h2 className="text-lg font-bold mb-4">Sign Up</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border border-gray-300 p-2 mb-2 w-full focus:border-emerald-400 outline-none rounded-md"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 p-2 mb-2 w-full focus:border-emerald-400 outline-none rounded-md"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border border-gray-300 p-2 mb-4 w-full focus:border-emerald-400 outline-none rounded-md"
                                />
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleSignup}
                                        className="bg-emerald-400 text-white py-2 px-4 rounded-xl hover:bg-emerald-600 transition duration-200"
                                    >
                                    Sign Up
                                    </button>
                                    <button
                                        onClick={toggleCanvas}
                                        className="bg-red-400 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <p className="mt-4">
                                    Already have an account?{' '}
                                    <button onClick={switchToLogin} className="text-stone-600 underline">
                                        Login
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    
};

export default Login;
