import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadPage.css';

function UploadPage({ setPackages }) {
  const [file, setFile] = useState(null);
  const [debloat, setDebloat] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('debloat', debloat);

    try {
      const response = await axios.post('http://localhost:5001/packages', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('File uploaded successfully!');
      const packagesResponse = await axios.get('http://localhost:5001/packages');
      setPackages(packagesResponse.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'An error occurred during upload.');
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload or Update a Package</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} required />
        <label>
          <input
            type="checkbox"
            checked={debloat}
            onChange={() => setDebloat(!debloat)}
          />
          Debloat package (minification, tree shaking)
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
