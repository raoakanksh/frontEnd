const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Add multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the 'uploads' folder

const app = express();
app.use(cors());
app.use(bodyParser.json());

let packages = [
  { id: "1", name: "React", version: "18.2.0", rating: 5 },
  { id: "2", name: "React Router", version: "6.27.0", rating: 4.5 }
];

// Root route for the API
app.get('/', (req, res) => {
  res.send('Welcome to the Package Registry API!');
});

// Get all packages with pagination
app.get('/packages', (req, res) => {
  const { offset = 0, limit = 10 } = req.query;
  const start = parseInt(offset);
  const end = start + parseInt(limit);

  const paginatedPackages = packages.slice(start, end);
  res.setHeader('offset', end.toString());
  res.status(200).json(paginatedPackages);
});

// Get a specific package by ID
app.get('/package/:id', (req, res) => {
  const packageId = req.params.id;
  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return res.status(404).json({ error: 'Package not found' });
  }

  res.status(200).json(pkg);
});

// Add a new package (with file upload)
app.post('/packages', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required.' });
    }

    const { debloat } = req.body;
    const newPackage = {
      id: Date.now().toString(),
      name: req.file.originalname, // Use the uploaded file's name
      version: '1.0.0', // Default version
      rating: 5, // Default rating
      debloat: debloat === 'true', // Convert debloat to boolean
    };

    // Check for duplicate packages
    const existingPackage = packages.find(
      (pkg) => pkg.name === newPackage.name && pkg.version === newPackage.version
    );

    if (existingPackage) {
      return res.status(409).json({ error: 'Package already exists' });
    }

    packages.push(newPackage);
    console.log('New package added:', newPackage); // Debugging: Log the new package
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error in POST /packages:', error); // Debugging: Log the error
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});


// Update an existing package
app.post('/package/:id', (req, res) => {
  const packageId = req.params.id;
  const packageIndex = packages.findIndex((pkg) => pkg.id === packageId);

  if (packageIndex === -1) {
    return res.status(404).json({ error: 'Package not found' });
  }

  const { version, name } = req.body;

  if (!version || !name) {
    return res.status(400).json({ error: 'Missing required fields: name or version' });
  }

  packages[packageIndex] = {
    ...packages[packageIndex],
    version,
    name,
  };

  res.status(200).json(packages[packageIndex]);
});

// Delete a package
app.delete('/package/:id', (req, res) => {
  const packageId = req.params.id;
  const packageIndex = packages.findIndex((pkg) => pkg.id === packageId);

  if (packageIndex === -1) {
    return res.status(404).json({ error: 'Package not found' });
  }

  packages.splice(packageIndex, 1);
  res.status(204).send();
});

// Reset all packages
app.delete('/reset', (req, res) => {
  packages = [];
  res.status(200).send({ message: 'Registry reset to default state' });
});

// Get package by regular expression
app.post('/package/byRegEx', (req, res) => {
  const { RegEx } = req.body;

  if (!RegEx) {
    return res.status(400).json({ error: 'Missing required field: RegEx' });
  }

  try {
    const regex = new RegExp(RegEx);
    const matchingPackages = packages.filter(
      (pkg) => regex.test(pkg.name)
    );

    if (matchingPackages.length === 0) {
      return res.status(404).json({ error: 'No package found under this regex' });
    }

    res.status(200).json(matchingPackages);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid regex provided' });
  }
});

// Get package cost
app.get('/package/:id/cost', (req, res) => {
  const packageId = req.params.id;
  const dependency = req.query.dependency === 'true';

  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return res.status(404).json({ error: 'Package does not exist' });
  }

  // Mocking cost calculation
  const cost = {
    standaloneCost: 50,
    totalCost: dependency ? 95 : 50,
  };

  res.status(200).json({ [packageId]: cost });
});

// Get package rating
app.get('/package/:id/rate', (req, res) => {
  const packageId = req.params.id;

  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return res.status(404).json({ error: 'Package does not exist' });
  }

  // Mocking rating
  const rating = {
    RampUp: 0.9,
    Correctness: 0.95,
    BusFactor: 0.85,
    ResponsiveMaintainer: 0.8,
    LicenseScore: 0.9,
    GoodPinningPractice: 1.0,
    PullRequest: 0.9,
    NetScore: 0.88,
  };

  res.status(200).json(rating);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
