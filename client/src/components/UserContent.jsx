// client/src/context/UserContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // JWT token for authenticated requests

  useEffect(() => {
    // Fetch user data and token from backend or localStorage
    const fetchUser = async () => {
      try {
        // Example: Fetch user info from backend using stored token
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const response = await fetch('http://127.0.0.1:8000/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            setUser(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        setToken(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
