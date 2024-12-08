import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css'; // Import the CSS file

function HomePage() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch packages from the backend
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/packages');
        setPackages(response.data); // Set the packages in state
      } catch (err) {
        setError('Failed to fetch packages. Please try again later.');
        console.error(err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to the Package Registry</h1>
        <p>Discover and manage your favorite packages seamlessly!</p>
      </div>

      <h1>Package List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}

      {/* Package List */}
      <div className="package-list">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h2>{pkg.name}</h2>
            <p>Version: {pkg.version}</p>
            <p>Rating: {pkg.rating || 'Not Rated'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}

export default HomePage;
