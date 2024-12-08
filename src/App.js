import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage'; // Import UploadPage
import PackageDetailPage from './pages/PackageDetailPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} /> {/* Route for Upload Page */}
          <Route path="/package/:packageId" element={<PackageDetailPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
