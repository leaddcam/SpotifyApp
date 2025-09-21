const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');
require('dotenv').config();
//
// svarer på http://localhost:3000/spotify-api
//
router.get('/top-tracks', async (req, res) => {
    const access_token = req.query.access_token;

    if (!access_token) return res.status(400).json({error: 'Missing access token'});

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', {
            headers: { Authorization: `Bearer ${access_token}`}
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top tracks: ', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch top tracks'});
    }
});