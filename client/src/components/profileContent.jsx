import React, { useState } from 'react';

const ProfileContent = ({ user, images }) => {
    // console.log("hey")
    // console.log(images)
    const [activeTab, setActiveTab] = useState('recentImages'); // 'recentImages' or 'friends'
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
                <input
                    type="text"
                    placeholder="Search to add friends..."
                    className="p-2 border border-gray-300 rounded w-full mb-6"
                />
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

            {/* Tab Content dummy data for now*/}
            <div className="grid grid-cols-3 gap-4">
                {activeTab === 'recentImages' && (
                    images && images.length > 0 ? (
                        images.map((image, idx) => (
                            <div key={image.id || idx} className="h-32 bg-gray-200 rounded overflow-hidden">
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
                                {image.title && (
                                    <div className="p-2 bg-black bg-opacity-50 text-white text-sm absolute bottom-0 w-full">
                                        {image.title}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No images uploaded yet.</p>
                    )
                )}
                {activeTab === 'friends' && (
                    (user.friends && user.friends.length > 0) ? (
                        user.friends.map((friend, idx) => (
                            <div key={idx} className="h-32 bg-gray-200 rounded flex justify-center items-center">
                                Friend {friend}
                            </div>
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
