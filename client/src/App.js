import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home.jsx';
import About from './components/about.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import { SnackbarProvider } from 'notistack';
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}
export default App;
