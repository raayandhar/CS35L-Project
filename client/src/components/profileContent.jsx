import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProfileContent = ({ user, images, friends }) => {
    // console.log("hey")
    // console.log(images)
    const [activeTab, setActiveTab] = useState('recentImages'); // 'recentImages' or 'friends'
    const [friendUsername, setFriendUsername] = useState(''); // State for the search input
    const { username } = useParams(); // Get username from URL params
    const navigate = useNavigate(); // Hook for programmatic navigation
    const { enqueueSnackbar } = useSnackbar(); // Access snackbar for notifications

    const getRandomPastelColor = (username) => {
        const colors = {
            red: '#FFB3B3',
            orange: '#FFD9B3',
            yellow: '#FFFFB3',
            green: '#B3FFB3',
            blue: '#B3D9FF',
            indigo: '#B3B3FF',
            purple: '#D9B3FF',
        };
        
        // Use the username to consistently pick a color
        const colorKeys = Object.keys(colors);
        const index = username
            .toLowerCase()
            .charCodeAt(0) % colorKeys.length; // Map the first letter to a color index
        return colors[colorKeys[index]];
    };
    

    

    // Function to search and add a friend
    const handleSearchFriend = async () => {
        if (!friendUsername) {
            enqueueSnackbar('Please enter a username to search.', { variant: 'error', autoHideDuration: 3000 });
            return;
        }

        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

        try {
            const response = await fetch(`${backendUrl}/add-friend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user?.name,
                    friend_username: friendUsername,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                enqueueSnackbar('Friend added successfully!', { variant: 'success', autoHideDuration: 3000 });
                // Update the friends list (local state or through a parent component)
                if (friends) {
                    friends.push(friendUsername);
                }
            } else {
                enqueueSnackbar(data.message || 'Failed to add friend.', { variant: 'error', autoHideDuration: 3000 });
            }
        } catch (error) {
            console.error('Error searching friend:', error.message || error);
            enqueueSnackbar('An error occurred. Please try again.', { variant: 'error', autoHideDuration: 3000 });
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mx-auto w-screen h-screen">
            {/* Profile Header */}
            <div className="flex flex-col items-start">
                <div
                    className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-black text-xl font-bold`}
                    style={{
                        backgroundColor: getRandomPastelColor(user.name), // Dynamically set pastel color
                    }}
                >
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                    

                {/* Search for Friend */}
                {activeTab === 'friends' && (
                    <div className="flex items-center w-full mb-6">
                        <input
                            type="text"
                            placeholder="Search to add friends..."
                            value={friendUsername}
                            onChange={(e) => setFriendUsername(e.target.value)}
                            className="p-2 border border-gray-300 rounded flex-1"
                        />
                        <button
                            onClick={handleSearchFriend}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Friend
                        </button>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
                <button
                    className={`px-4 py-2 font-semibold ${activeTab === 'recentImages' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('recentImages')}
                >
                    Recent Images
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${activeTab === 'friends' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('friends')}
                >
                    Friends
                </button>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-3 gap-4">
                {activeTab === 'recentImages' && (
                    images && images.length > 0 ? (
                        images.map((image, idx) => (
                            <div key={image.id || idx} className="h-32 bg-gray-200 rounded overflow-hidden relative">
                                {image.image ? (
                                    <img
                                        src={`data:image/jpeg;base64,${image.image}`}
                                        alt={image.title || `Image ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex justify-center items-center">
                                        Image {idx + 1}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No images uploaded yet.</p>
                    )
                )}
                {activeTab === 'friends' && (
                    (friends && friends.length > 0) ? (
                        friends.map((friend, idx) => (
                            <Link
                                to={`/profile/${friend}`} // Link to friend's profile
                                key={idx}
                                className="h-32 bg-gray-200 rounded flex justify-center items-center text-black font-bold hover:bg-gray-300"
                            >
                                {friend}
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No friends listed.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ProfileContent;
