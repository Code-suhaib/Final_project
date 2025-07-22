const express = require('express');
const router = express.Router();

let busLocations = {}; // { busNumber: { lat, lng, timestamp } }

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

router.get('/location/:busNumber', (req, res) => {
  const { busNumber } = req.params;

  if (!busLocations[busNumber]) {
    return res.status(404).json({ message: 'No location found for this bus' });
  }

  return res.json(busLocations[busNumber]);
});

module.exports = router;
