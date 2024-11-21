// In src/components/test/AddFriendTest.jsx
import React, { useState } from 'react';

const AddFriendTest = () => {
  const [username, setUsername] = useState('');
  const [friendUsername, setFriendUsername] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/add-friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          friend_username: friendUsername
        })
      });
      
      const data = await res.json();
      setResponse({
        success: res.ok,
        message: data.message,
        status: data.status
      });
    } catch (error) {
      setResponse({
        success: false,
        message: 'Failed to make request',
        status: 500
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Test Add Friend Endpoint</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Current Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Friend Username:</label>
            <input
              type="text"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              placeholder="Enter friend's username"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? 'Adding Friend...' : 'Add Friend'}
          </button>
        </form>

        {response && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            borderRadius: '4px',
            backgroundColor: response.success ? '#d4edda' : '#f8d7da',
            color: response.success ? '#155724' : '#721c24'
          }}>
            <p>Status: {response.status}</p>
            <p>{response.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriendTest;