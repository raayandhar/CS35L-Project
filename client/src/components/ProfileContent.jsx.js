import React, { useEffect, useState } from 'react';

const ProfileFriend = ({ friendUsername }) => {
    const [friendImages, setFriendImages] = useState([]);

    useEffect(() => {
        const fetchFriendImages = async () => {
            const imagesPerPage = 10;
            try {
                const response = await fetch(`http://127.0.0.1:5000/gallery?uploader=${friendUsername}&limit=${imagesPerPage}&page=1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    console.log('Fetched Friend Images:', data.images);
                    setFriendImages(data.images);
                } else {
                    console.error('Failed to fetch images:', data.message);
                }
            } catch (error) {
                console.error('Error fetching friend images:', error);
            }
        };

        if (friendUsername) {
            fetchFriendImages();
        }
    }, [friendUsername]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mx-auto w-screen h-screen">
            <h1 className="text-2xl font-bold mb-4">Gallery of {friendUsername}</h1>
            <div className="grid grid-cols-3 gap-4">
                {friendImages.length > 0 ? (
                    friendImages.map((image, idx) => (
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
                            {image.title && (
                                <div className="p-2 bg-black bg-opacity-50 text-white text-sm absolute bottom-0 w-full">
                                    {image.title}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No images uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfileFriend;
