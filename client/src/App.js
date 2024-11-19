// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Gallery from './components/gallery.jsx';
import Navbar from './components/navbar.jsx';
import Profile from './components/profile.jsx';
import Generator from './components/generator.jsx';
import UploadImage from './components/UploadImage.jsx'; // Import the UploadImage component
import AddFriendTest from './components/test/AddFriendTest.jsx';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Generator" element={<Generator />} />
          <Route path="/upload" element={<UploadImage />} /> {/* New Route */}
          <Route path="/Generator"element = {<Generator/>} />
          <Route path="/test/add-friend" element={<AddFriendTest />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
