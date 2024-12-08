import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PackageDetailPage.css';

function PackageDetailPage() {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/packages/${packageId}`);
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  if (!packageData) {
    return <div>Loading package details...</div>;
  }

  return (
    <div className="package-details">
      <h2>{packageData.name}</h2>
      <p><strong>Version:</strong> {packageData.version}</p>
      <p><strong>Rating:</strong> {packageData.rating}</p>
      <p><strong>ID:</strong> {packageData.id}</p>
    </div>
  );
}

export default PackageDetailPage;
