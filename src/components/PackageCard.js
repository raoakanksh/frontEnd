import React from 'react';
//import '../styles/PackageCard.css'  // instead of './PackageCard.css'

function PackageCard({ pkg }) {
    return (
        <div className="package-card">
            <h3>{pkg.name}</h3>
            <p>Version: {pkg.version}</p>
            <p>Rating: {pkg.rating}</p>
            <button>View Details</button>
        </div>
    );
}

export default PackageCard;
