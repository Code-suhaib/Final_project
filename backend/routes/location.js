const express = require('express');
const router = express.Router();

let busLocations = {}; // { busNumber: { lat, lng, updatedAt } }

// 🔧 Static bus list (can be later replaced by MongoDB)
const allBuses = ['1', '2', '3', '4', '5'];

/**
 * POST /api/update-location
 * Updates the location of a specific bus.
 */
router.post('/update-location', (req, res) => {
  const { busNumber, latitude, longitude } = req.body;

  if (!busNumber || !latitude || !longitude) {
    return res.status(400).json({ message: 'Missing data' });
  }

  busLocations[busNumber] = {
    lat: latitude,
    lng: longitude,
    updatedAt: new Date(),
  };

  return res.json({ message: 'Location updated successfully' });
});

/**
 * GET /api/location/:busNumber
 * Retrieves the latest location of a specific bus.
 */
router.get('/location/:busNumber', (req, res) => {
  const { busNumber } = req.params;

  if (!busLocations[busNumber]) {
    return res.status(404).json({ message: 'No location found for this bus' });
  }

  return res.json(busLocations[busNumber]);
});

/**
 * GET /api/buses
 * Returns the full list of buses and whether they are currently active.
 */
router.get('/buses', (req, res) => {
  const busList = allBuses.map((busNumber) => ({
    busNumber,
    active: !!busLocations[busNumber], // true if location exists
  }));

  return res.json(busList);
});

module.exports = router;
