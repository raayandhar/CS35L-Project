//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home.jsx';
import Gallery from './components/gallery.jsx';
import Navbar from './components/navbar.jsx';
import Profile from './components/profile.jsx';
import Generator from './components/generator.jsx'
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Generator"element = {<Generator/>} />

        </Routes>
      </Router>
    </SnackbarProvider>
  );
}
export default App;
